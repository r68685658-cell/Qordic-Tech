# Qordic AI service

The React app calls this separate FastAPI service. It keeps provider credentials on the server, stores conversations and approved knowledge in SQLite, and uses provider-generated embeddings with cosine-similarity retrieval before asking an OpenAI-compatible chat-completions API for a streamed answer.

## Local setup (Windows PowerShell)

From the project root:

```powershell
py -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
```

Edit `backend\.env` and set:

- `QORDIC_ADMIN_PASSWORD`: a unique, long password for `/admin/ai`.
- `QORDIC_JWT_SECRET`: generate with `py -c "import secrets; print(secrets.token_urlsafe(48))"`.
- `QORDIC_AI_API_KEY`: a server-side key for the selected OpenAI-compatible provider. Leave blank to keep the assistant accurately offline.
- `QORDIC_AI_BASE_URL`, `QORDIC_AI_CHAT_MODEL`, `QORDIC_AI_EMBEDDING_MODEL`: provider endpoint and model identifiers.
- `QORDIC_ALLOWED_ORIGINS`: exact frontend origins, comma-separated.

Never put provider or admin secrets in a `VITE_` variable. The root `.env.example` contains only the optional public API URL.

Start the API from the project root:

```powershell
backend\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port 8000
```

In another terminal, start Vite with `npm run dev`. Vite proxies `/api` and `/health` to `http://127.0.0.1:8000`; if the API uses another address, set `QORDIC_API_PROXY_TARGET` in the root `.env.local`. For a deployed frontend and API on different origins, set `VITE_API_BASE_URL` to the backend HTTPS origin and allow the deployed frontend origin in `QORDIC_ALLOWED_ORIGINS`. Visit `/admin/ai` to sign in and manage the knowledge base.

## Knowledge and provider workflow

- On the first API start, the company information in `seed_knowledge.json` is copied into SQLite. When a provider key is configured, pending entries are embedded and indexed at startup.
- Admins can add/edit/delete knowledge, FAQs, and HTTPS website sources; upload PDF, DOCX, TXT, and Markdown files (10 MB maximum); and reindex entries. Editing the embedding provider/model invalidates and rebuilds the vector index.
- Only admin-entered or admin-approved material is retrieved. Visitor conversations are not indexed as company knowledge.
- The default admin provider supports OpenAI-compatible `/models`, `/embeddings`, and streaming `/chat/completions` endpoints. Configure the base URL and model identifiers in the dashboard; configure the key only in the backend environment.
- Responses that could not be completed are surfaced as errors, not represented as AI answers. The widget shows online only after the backend can reach the configured provider.

## Project inquiry storage

The project scope estimator submits validated enquiries to `POST /api/inquiries`. Submissions are rate-limited and stored in the same SQLite database with the consent timestamp; the endpoint does not claim that an email has been sent. Admin authentication must be securely configured before the endpoint accepts personal information. A configured administrator can review records at `GET /api/admin/inquiries` and delete a record with `DELETE /api/admin/inquiries/{inquiry_id}`. These review and deletion endpoints require the signed admin bearer token. Protect the database file and restrict administrator credentials to authorized staff.

## Storage, privacy, and production

SQLite stores approved knowledge, vector embeddings, rate-limit counters, conversations, response feedback, and project inquiries in `backend/data/qordic-ai.sqlite3`. Conversation records are automatically purged after `QORDIC_RETENTION_DAYS` (90 days by default); inquiry records are retained until an administrator deletes them. Do not invite visitors to submit sensitive personal, financial, or confidential information.

This SQLite deployment is suitable for a single API instance and a modest knowledge base. Keep the database on persistent encrypted storage and back it up securely. For multiple API replicas or larger workloads, migrate the repository layer to managed PostgreSQL with `pgvector` and a shared rate-limit store before scaling out. Put the API behind HTTPS, configure the exact production origin in `QORDIC_ALLOWED_ORIGINS`, keep secrets in the hosting provider's secret manager, and restrict access to `/admin/ai` at the deployment edge as an additional layer. Backend admin endpoints always independently validate the signed, expiring admin token.

The admin password is configured as an environment secret; there is no hardcoded default account. The admin token is held in browser session storage for up to eight hours. Review your jurisdiction's privacy and retention requirements before deployment.

## Tests

```powershell
backend\.venv\Scripts\python.exe -m pytest backend\tests -q
npm run build
```
