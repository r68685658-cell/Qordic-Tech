import json
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import main


def test_text_chunking_respects_limits_and_overlap():
    text = "word " * 600
    chunks = main.split_text(text)

    assert len(chunks) > 1
    assert all(len(chunk) <= main.CHUNK_SIZE for chunk in chunks)
    assert chunks[0][-40:] in chunks[1]


def test_cosine_similarity_handles_vectors_and_mismatched_dimensions():
    assert main.cosine_similarity([1.0, 0.0], [1.0, 0.0]) == pytest.approx(1.0)
    assert main.cosine_similarity([1.0, 0.0], [0.0, 1.0]) == pytest.approx(0.0)
    assert main.cosine_similarity([1.0], [1.0, 0.0]) == 0


def test_public_chat_retrieval_excludes_future_erp_knowledge(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "public-knowledge.sqlite3")

    async def fake_embed_texts(_texts):
        return [[1.0, 0.0]]

    monkeypatch.setattr(main, "embed_texts", fake_embed_texts)
    main.init_db()
    stamp = main.now_iso()
    with main.get_db() as db:
        for item_id, title, category, content in (
            ("public", "Website services", "Services", "We build responsive websites."),
            ("future-erp", "ERP Systems", "ERP Systems", "Future ERP planning notes."),
            ("erp-mention", "Company services", "Services", "ERP is a future service."),
        ):
            db.execute(
                """INSERT INTO knowledge
                   (id,title,category,content,source,kind,status,created_at,updated_at)
                   VALUES (?,?,?,?,?,'text','indexed',?,?)""",
                (item_id, title, category, content, "test", stamp, stamp),
            )
            db.execute(
                "INSERT INTO chunks(id,knowledge_id,ordinal,content,embedding) VALUES(?,?,?,?,?)",
                (f"chunk-{item_id}", item_id, 0, content, "[1.0,0.0]"),
            )

    import asyncio

    results = asyncio.run(main.retrieve_context("What services?", limit=10))

    assert [item["title"] for item in results] == ["Website services"]


def test_system_prompt_always_includes_verified_company_services():
    prompt = main.system_prompt([])

    assert "QORDIC Technologies is a technology-focused company" in prompt
    for service in (
        "Software Development",
        "Website Development",
        "Graphic Designing",
        "Search Engine Optimization (SEO)",
        "Video Editing",
        "Real Estate Solutions",
    ):
        assert service in prompt
    assert "even when no retrieved reference excerpts are available" in prompt
    assert "Suggest WhatsApp" in prompt
    assert "/start-project" in prompt
    assert "do not add unlisted deliverables, technologies, platforms, processes, tactics, features" in prompt
    assert "do not claim specific programming stacks, e-commerce, CMS, maintenance/support" in prompt
    assert "[No additional indexed company knowledge is currently available.]" in prompt


def test_admin_token_is_signed_and_expires(monkeypatch):
    monkeypatch.setattr(main, "JWT_SECRET", "test-secret-value-that-is-long-enough-123")
    valid = main.encode_token({"sub": "admin", "exp": 4_000_000_000})
    expired = main.encode_token({"sub": "admin", "exp": 1})
    tampered = f"{valid[:-1]}x"

    assert main.verify_token(valid)
    assert not main.verify_token(expired)
    assert not main.verify_token(tampered)
    assert not main.verify_token("not-a-token")


def test_seed_knowledge_initializes_persistent_store(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "ai.sqlite3")

    main.init_db()
    with main.get_db() as db:
        rows = db.execute("SELECT title,category,status FROM knowledge").fetchall()
        chunk_count = db.execute("SELECT COUNT(*) FROM chunks").fetchone()[0]

    assert len(rows) >= 10
    assert chunk_count == 0
    assert {row["status"] for row in rows} == {"pending"}
    assert all(row["title"] and row["category"] for row in rows)


def test_admin_token_roundtrip_uses_json_payload(monkeypatch):
    monkeypatch.setattr(main, "JWT_SECRET", "another-test-secret-that-is-long-enough")
    token = main.encode_token({"sub": "admin", "exp": 4_000_000_000})
    payload = token.split(".", 1)[0]
    decoded = json.loads(
        __import__("base64").urlsafe_b64decode(payload + "=" * (-len(payload) % 4))
    )

    assert decoded["sub"] == "admin"


@pytest.mark.parametrize(
    "url",
    [
        "http://example.com",
        "https://localhost",
        "https://127.0.0.1",
        "https://user:password@example.com",
    ],
)
def test_website_ingestion_rejects_non_public_or_insecure_urls(url):
    with pytest.raises(main.HTTPException):
        main.validate_public_url(url)


def test_text_extraction_accepts_plain_text_and_rejects_unknown_file():
    assert main.clean_extract_text("notes.txt", b"Approved company facts") == "Approved company facts"
    with pytest.raises(main.HTTPException):
        main.clean_extract_text("image.png", b"not text")


def test_unknown_company_answers_are_honest_and_match_language():
    assert "don't have confirmed information" in main.unknown_answer("What are your exact prices?")
    assert "Mere paas" in main.unknown_answer("Apki company kya services provide karti hai?")
    assert "میرے پاس" in main.unknown_answer("آپ کی قیمت کیا ہے؟")


def test_groq_chat_uses_server_credentials_and_configured_model(monkeypatch):
    monkeypatch.setattr(main, "GROQ_API_KEY", "test-groq-secret")
    monkeypatch.setattr(main, "GROQ_MODEL", "test-groq-model")
    monkeypatch.setattr(main, "AI_API_KEY", "")

    config = main.chat_provider_config()

    assert config == {
        "base_url": "https://api.groq.com/openai/v1",
        "api_key": "test-groq-secret",
        "chat_model": "test-groq-model",
        "provider": "groq",
    }
    assert main.chat_provider_ready()
    assert not main.embedding_provider_ready()


@pytest.mark.parametrize(
    ("status_code", "message"),
    [
        (401, "rejected its server credentials"),
        (403, "rejected its server credentials"),
        (429, "rate-limited"),
        (500, "could not complete this request"),
    ],
)
def test_provider_errors_are_actionable_without_exposing_credentials(status_code, message):
    response_message = main.provider_error_message(status_code)

    assert message in response_message
    assert "test-groq-secret" not in response_message


def test_chat_streams_groq_response_without_embedding_provider(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "groq-chat.sqlite3")
    monkeypatch.setattr(main, "GROQ_API_KEY", "test-groq-secret")
    monkeypatch.setattr(main, "GROQ_MODEL", "test-groq-model")
    monkeypatch.setattr(main, "AI_API_KEY", "")
    captured = {}

    class FakeStreamResponse:
        status_code = 200
        is_error = False

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_args):
            return None

        async def aiter_lines(self):
            yield 'data: {"choices":[{"delta":{"content":"Groq response received."}}]}'
            yield "data: [DONE]"

    class FakeAsyncClient:
        def __init__(self, **_kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_args):
            return None

        def stream(self, method, url, headers, json):
            captured.update(method=method, url=url, headers=headers, payload=json)
            return FakeStreamResponse()

    monkeypatch.setattr(main.httpx, "AsyncClient", FakeAsyncClient)

    with TestClient(main.app) as client:
        response = client.post(
            "/api/chat",
            json={"conversation_id": "groq-test", "message": "What does QORDIC Technologies do?"},
        )

    assert response.status_code == 200
    assert "Groq response received." in response.text
    assert captured["url"] == "https://api.groq.com/openai/v1/chat/completions"
    assert captured["payload"]["model"] == "test-groq-model"
    assert captured["payload"]["stream"] is True
    assert captured["payload"]["messages"][0]["role"] == "system"
    assert "QORDIC Technologies is a technology-focused company" in captured["payload"]["messages"][0]["content"]
    assert "Search Engine Optimization (SEO)" in captured["payload"]["messages"][0]["content"]
    assert captured["headers"]["Authorization"] == "Bearer test-groq-secret"
    assert "test-groq-secret" not in response.text


@pytest.mark.parametrize(
    ("status_code", "message"),
    [
        (401, "rejected its server credentials"),
        (429, "rate-limited"),
        (502, "could not complete this request"),
    ],
)
def test_chat_stream_reports_groq_provider_failures(
    monkeypatch, tmp_path, status_code, message
):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / f"groq-error-{status_code}.sqlite3")
    monkeypatch.setattr(main, "GROQ_API_KEY", "test-groq-secret")
    monkeypatch.setattr(main, "GROQ_MODEL", "test-groq-model")
    monkeypatch.setattr(main, "AI_API_KEY", "")

    class FakeStreamResponse:
        is_error = True

        def __init__(self):
            self.status_code = status_code

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_args):
            return None

        async def aiter_lines(self):
            if False:
                yield ""

    class FakeAsyncClient:
        def __init__(self, **_kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *_args):
            return None

        def stream(self, *_args, **_kwargs):
            return FakeStreamResponse()

    monkeypatch.setattr(main.httpx, "AsyncClient", FakeAsyncClient)

    with TestClient(main.app) as client:
        response = client.post(
            "/api/chat",
            json={"conversation_id": f"groq-error-{status_code}", "message": "Hello"},
        )

    assert response.status_code == 200
    assert message in response.text
    assert "test-groq-secret" not in response.text


def test_admin_api_requires_auth_and_provider_status_is_offline(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "api.sqlite3")
    monkeypatch.setattr(main, "ADMIN_PASSWORD", "long-test-admin-password")
    monkeypatch.setattr(main, "JWT_SECRET", "test-secret-value-that-is-at-least-thirty-two")
    monkeypatch.setattr(main, "AI_API_KEY", "")
    monkeypatch.setattr(main, "GROQ_API_KEY", "")
    monkeypatch.setattr(main, "_provider_health_checked_at", 0.0)

    with TestClient(main.app) as client:
        assert client.get("/api/admin/overview").status_code == 401
        assert client.get("/health").json() == {
            "status": "ok",
            "backend": "online",
            "ai_provider": "not_configured",
            "ai_available": False,
            "chat_model": main.AI_CHAT_MODEL,
        }
        assert client.get("/api/health").status_code == 200
        assert client.get("/api/chat/status").json() == {
            "online": False,
            "status": "not_configured",
        }
        chat = client.post(
            "/api/chat",
            json={"conversation_id": "test-offline", "message": "Can you build mobile applications?"},
        )
        assert chat.status_code == 503
        assert "provider is not configured" in chat.json()["detail"].lower()
        login = client.post("/api/admin/login", json={"password": "long-test-admin-password"})
        assert login.status_code == 200
        token = login.json()["token"]
        overview = client.get(
            "/api/admin/overview",
            headers={"Authorization": f"Bearer {token}"},
        )

    assert overview.status_code == 200
    assert overview.json()["documents"] >= 10
    assert not overview.json()["ai_available"]


def test_project_inquiry_is_validated_persisted_and_admin_only(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "inquiries.sqlite3")
    monkeypatch.setattr(main, "ADMIN_PASSWORD", "long-test-admin-password")
    monkeypatch.setattr(main, "JWT_SECRET", "test-secret-value-that-is-at-least-thirty-two")
    monkeypatch.setattr(main, "ADMIN_PASSWORD", "long-test-admin-password")
    monkeypatch.setattr(main, "JWT_SECRET", "test-secret-value-that-is-at-least-thirty-two")

    inquiry = {
        "full_name": "  Alex Example  ",
        "email": "alex@example.com",
        "phone": "+1 (555) 010-1234",
        "company": "Example Co",
        "project_type": "Website Development",
        "requirements": ["Responsive design", "API integration"],
        "scale": "Standard",
        "budget": "Not specified",
        "timeline": "Flexible",
        "description": "A responsive customer website.",
        "consent": True,
        "website": "",
    }

    with TestClient(main.app) as client:
        response = client.post("/api/inquiries", json=inquiry)
        assert response.status_code == 201
        assert response.json()["status"] == "received"
        assert client.get("/api/admin/inquiries").status_code == 401
        invalid = client.post("/api/inquiries", json={**inquiry, "email": "not-an-email"})
        assert invalid.status_code == 422
        login = client.post("/api/admin/login", json={"password": "long-test-admin-password"})
        token = login.json()["token"]
        private_inquiries = client.get(
            "/api/admin/inquiries",
            headers={"Authorization": f"Bearer {token}"},
        )
        deletion = client.delete(
            f"/api/admin/inquiries/{response.json()['id']}",
            headers={"Authorization": f"Bearer {token}"},
        )

    saved = private_inquiries.json()["inquiries"]
    assert len(saved) == 1
    assert saved[0]["full_name"] == "Alex Example"
    assert saved[0]["requirements"] == ["Responsive design", "API integration"]
    assert saved[0]["consent_at"]
    assert deletion.json() == {"deleted": True}


def test_project_inquiry_does_not_store_personal_data_without_admin_setup(monkeypatch, tmp_path):
    monkeypatch.setattr(main, "DB_PATH", tmp_path / "inquiries-offline.sqlite3")
    monkeypatch.setattr(main, "ADMIN_PASSWORD", "")
    monkeypatch.setattr(main, "JWT_SECRET", "")
    inquiry = {
        "full_name": "Alex Example",
        "email": "alex@example.com",
        "phone": "+1 555 010 1234",
        "project_type": "Website Development",
        "scale": "Standard",
        "consent": True,
    }

    with TestClient(main.app) as client:
        response = client.post("/api/inquiries", json=inquiry)
        assert response.status_code == 503
        assert "not configured yet" in response.json()["detail"]
        with main.get_db() as db:
            count = db.execute("SELECT COUNT(*) FROM project_inquiries").fetchone()[0]

    assert count == 0
