import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  FileText,
  LoaderCircle,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { apiUrl } from "../lib/api.js";

const CATEGORIES = [
  "Company Information", "About Us", "Services", "Real Estate Software", "ERP Systems",
  "Software Development", "Mobile Applications", "AI and Automation", "Websites & Portals",
  "Pricing", "FAQs", "Project Process", "Support", "Contact Information", "Custom Knowledge",
];
const EMPTY_DRAFT = { title: "", category: "Custom Knowledge", content: "", source: "" };

export default function AdminAIPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem("qordic-ai-admin-token") || "");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [overview, setOverview] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [conversationMessages, setConversationMessages] = useState([]);
  const [config, setConfig] = useState(null);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState("");
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const api = async (path, options = {}) => {
    const response = await fetch(apiUrl(path), {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem("qordic-ai-admin-token");
        setToken("");
      }
      throw new Error(payload.detail || `Request failed (${response.status}).`);
    }
    return payload;
  };

  const loadOverview = async () => setOverview(await api("/api/admin/overview"));
  const loadKnowledge = async () => {
    const query = new URLSearchParams();
    if (filter.trim()) query.set("search", filter.trim());
    const category = activeTab === "FAQ Management" ? "FAQs" : categoryFilter;
    if (category) query.set("category", category);
    setKnowledge(await api(`/api/admin/knowledge?${query}`));
  };
  const loadConversations = async () => setConversations(await api("/api/admin/conversations"));
  const loadConfig = async () => setConfig(await api("/api/admin/config"));

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([loadOverview(), loadKnowledge(), loadConversations(), loadConfig()]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) refresh();
  }, [token]);

  useEffect(() => {
    if (token && activeTab === "Knowledge Base") loadKnowledge().catch((e) => setError(e.message));
  }, [token, filter, categoryFilter, activeTab]);

  useEffect(() => {
    if (token && selectedConversation) {
      api(`/api/admin/conversations/${encodeURIComponent(selectedConversation)}`)
        .then(setConversationMessages)
        .catch((e) => setError(e.message));
    }
  }, [token, selectedConversation]);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api("/api/admin/login", {
        method: "POST",
        headers: {},
        body: JSON.stringify({ password }),
      });
      sessionStorage.setItem("qordic-ai-admin-token", result.token);
      setToken(result.token);
      setPassword("");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("qordic-ai-admin-token");
    setToken("");
    setOverview(null);
    setKnowledge([]);
    setConversations([]);
  };

  const saveKnowledge = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      const path = editingId ? `/api/admin/knowledge/${editingId}` : "/api/admin/knowledge";
      await api(path, { method: editingId ? "PUT" : "POST", body: JSON.stringify(draft) });
      setDraft(EMPTY_DRAFT);
      setEditingId("");
      setNotice("Knowledge saved. It will be indexed when the AI provider is configured.");
      await Promise.all([loadKnowledge(), loadOverview()]);
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  const editKnowledge = (item) => {
    setEditingId(item.id);
    setDraft({ title: item.title, category: item.category, content: item.content, source: item.source });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteKnowledge = async (id) => {
    if (!window.confirm("Delete this knowledge item and its indexed chunks?")) return;
    try {
      await api(`/api/admin/knowledge/${id}`, { method: "DELETE" });
      setNotice("Knowledge item deleted.");
      await Promise.all([loadKnowledge(), loadOverview()]);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const reindex = async (id) => {
    try {
      await api(`/api/admin/knowledge/${id}/reindex`, { method: "POST" });
      setNotice("Knowledge item reindexed.");
      await Promise.all([loadKnowledge(), loadOverview()]);
    } catch (indexError) {
      setError(indexError.message);
    }
  };

  const upload = async (event) => {
    event.preventDefault();
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("category", draft.category || "Custom Knowledge");
    try {
      const result = await api("/api/admin/upload", { method: "POST", body: formData });
      setNotice(`Uploaded ${result.title}. Index status: ${result.status}.`);
      setUploadFile(null);
      await Promise.all([loadKnowledge(), loadOverview()]);
    } catch (uploadError) {
      setError(uploadError.message);
    }
  };

  const addUrl = async (event) => {
    event.preventDefault();
    try {
      await api("/api/admin/knowledge/url", {
        method: "POST",
        body: JSON.stringify({ url: urlInput, category: draft.category || "Custom Knowledge" }),
      });
      setUrlInput("");
      setNotice("Website content added to the knowledge base.");
      await Promise.all([loadKnowledge(), loadOverview()]);
    } catch (urlError) {
      setError(urlError.message);
    }
  };

  const saveConfig = async (event) => {
    event.preventDefault();
    try {
      await api("/api/admin/config", { method: "PUT", body: JSON.stringify({
        base_url: config.base_url,
        chat_model: config.chat_model,
        embedding_model: config.embedding_model,
      }) });
      setNotice("AI provider configuration saved. API keys are managed only through server environment variables.");
      await Promise.all([loadConfig(), loadOverview()]);
    } catch (configError) {
      setError(configError.message);
    }
  };

  const convertQuestionToFaq = (question) => {
    setActiveTab("Knowledge Base");
    setDraft({ title: question, category: "FAQs", content: "", source: "Visitor question" });
    setEditingId("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = useMemo(() => [
    { name: "Overview", icon: Activity },
    { name: "Knowledge Base", icon: BookOpen },
    { name: "FAQ Management", icon: MessageSquareText },
    { name: "Conversations", icon: FileText },
    { name: "AI Configuration", icon: Settings },
  ], []);

  if (!token) {
    return (
      <main className="qordic-admin-page">
        <form className="qordic-admin-login" onSubmit={login}>
          <div className="qordic-admin-logo"><Bot size={28} /></div>
          <p className="qordic-admin-eyebrow">Protected workspace</p>
          <h1>QORDIC AI Management</h1>
          <p>Sign in with the admin password configured on the AI backend.</p>
          {error && <div className="qordic-admin-alert" role="alert">{error}</div>}
          <label>
            Admin password
            <input autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" disabled={loading}>{loading ? <LoaderCircle className="qordic-ai-spinner" size={18} /> : "Sign in securely"}</button>
          <a href="/">Return to Qordic Technologies</a>
        </form>
      </main>
    );
  }

  return (
    <main className="qordic-admin-page">
      <div className="qordic-admin-shell">
        <header className="qordic-admin-topbar">
          <a className="qordic-admin-brand" href="/"><span><Bot size={22} /></span> QORDIC <b>AI</b></a>
          <div><span className={overview?.ai_available ? "qordic-admin-service online" : "qordic-admin-service"}><i />{overview?.ai_available ? "AI service online" : "AI service offline"}</span><button type="button" className="qordic-admin-logout" onClick={logout}><LogOut size={16} /> Sign out</button></div>
        </header>
        <div className="qordic-admin-layout">
          <nav className="qordic-admin-nav" aria-label="AI management sections">
            {tabs.map(({ name, icon: Icon }) => <button key={name} type="button" className={activeTab === name ? "active" : ""} onClick={() => setActiveTab(name)}><Icon size={17} />{name}{name === "FAQ Management" && <ChevronDown size={14} />}</button>)}
          </nav>
          <section className="qordic-admin-content">
            <div className="qordic-admin-heading"><div><p className="qordic-admin-eyebrow">Qordic Technologies · AI management</p><h1>{activeTab}</h1></div><button type="button" className="qordic-admin-refresh" onClick={refresh} disabled={loading}><RefreshCw size={16} /> Refresh</button></div>
            {error && <div className="qordic-admin-alert" role="alert">{error}<button type="button" aria-label="Dismiss error" onClick={() => setError("")}><X size={15} /></button></div>}
            {notice && <div className="qordic-admin-notice" role="status">{notice}<button type="button" aria-label="Dismiss notice" onClick={() => setNotice("")}><X size={15} /></button></div>}

            {activeTab === "Overview" && (
              <>
                <div className="qordic-admin-stats">
                  {[["Documents", overview?.documents ?? "—"], ["Indexed", overview?.indexed ?? "—"], ["Failed", overview?.failed ?? "—"], ["Conversations", overview?.conversations ?? "—"], ["Messages", overview?.messages ?? "—"], ["Low confidence", overview?.low_confidence_responses ?? "—"]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}
                </div>
                <section className="qordic-admin-card"><h2>Knowledge gaps</h2><p>Questions without a recorded assistant reply. Review these to improve approved company information.</p>
                  {overview?.unanswered?.length ? <ul className="qordic-admin-gap-list">{overview.unanswered.map((item) => <li key={`${item.conversation_id}-${item.created_at}`}><span>{item.question}</span><button type="button" onClick={() => convertQuestionToFaq(item.question)}>Add as FAQ</button></li>)}</ul> : <p className="qordic-admin-empty">No unanswered questions recorded.</p>}
                </section>
                <section className="qordic-admin-card"><h2>Frequently asked questions</h2><p>Repeated visitor questions, useful for identifying common information needs.</p>{overview?.frequent_questions?.length ? <ul className="qordic-admin-gap-list">{overview.frequent_questions.map((item) => <li key={item.question}><span>{item.question} <small>({item.count} times)</small></span><button type="button" onClick={() => convertQuestionToFaq(item.question)}>Add as FAQ</button></li>)}</ul> : <p className="qordic-admin-empty">No repeated questions recorded yet.</p>}</section>
                <section className="qordic-admin-card"><h2>Privacy & retention</h2><p>Visitor conversations are retained for {overview?.retention_days || 90} days. Use conversation management to review messages; the backend removes expired conversations according to this retention period.</p><button type="button" className="qordic-admin-secondary" onClick={async () => { const result = await api(`/api/admin/conversations?days=${overview?.retention_days || 90}`, { method: "DELETE" }).catch((e) => { setError(e.message); }); if (result) { setNotice(`Deleted ${result.deleted} expired conversations.`); await Promise.all([loadOverview(), loadConversations()]); } }}>Delete expired conversations</button></section>
              </>
            )}

            {(activeTab === "Knowledge Base" || activeTab === "FAQ Management") && (
              <>
                <form className="qordic-admin-card qordic-admin-editor" onSubmit={saveKnowledge}>
                  <h2>{editingId ? "Edit approved company knowledge" : activeTab === "FAQ Management" ? "Add a question and answer" : "Add company knowledge"}</h2>
                  <label>Title or FAQ question<input required maxLength={200} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></label>
                  <label>Category<select value={activeTab === "FAQ Management" ? "FAQs" : draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} disabled={activeTab === "FAQ Management"}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
                  <label>{activeTab === "FAQ Management" ? "Answer" : "Information"}<textarea required minLength={1} rows={5} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} placeholder="Enter confirmed, approved information. Do not add assumptions or unverified claims." /></label>
                  <label>Source or reference<input maxLength={1000} value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value })} placeholder="e.g. /services or internal reference" /></label>
                  <div className="qordic-admin-actions"><button type="submit"><CheckCircle2 size={16} />{editingId ? "Save changes" : "Add to knowledge"}</button>{editingId && <button type="button" className="qordic-admin-secondary" onClick={() => { setDraft(EMPTY_DRAFT); setEditingId(""); }}>Cancel edit</button>}</div>
                </form>
                <div className="qordic-admin-imports">
                  <form className="qordic-admin-card" onSubmit={upload}><h2><Upload size={18} /> Upload a document</h2><p>PDF, DOCX, TXT, or Markdown · up to 10 MB per file</p><input type="file" accept=".pdf,.docx,.txt,.md" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} required /><button type="submit" disabled={!uploadFile}>Upload and index</button></form>
                  <form className="qordic-admin-card" onSubmit={addUrl}><h2>Add a public webpage</h2><p>HTTPS pages only. Private network URLs and redirects are blocked.</p><input type="url" required placeholder="https://example.com/company-info" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} /><button type="submit">Fetch and index</button></form>
                </div>
                <section className="qordic-admin-card">
                  <div className="qordic-admin-list-toolbar"><h2>{activeTab === "FAQ Management" ? "Approved FAQs" : "Knowledge items"} <span>({activeTab === "FAQ Management" ? knowledge.filter((item) => item.category === "FAQs").length : knowledge.length})</span></h2><div><label className="qordic-admin-search"><Search size={16} /><input placeholder="Search knowledge" value={filter} onChange={(e) => setFilter(e.target.value)} /></label><select value={activeTab === "FAQ Management" ? "FAQs" : categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} disabled={activeTab === "FAQ Management"}><option value="">All categories</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></div></div>
                  <div className="qordic-admin-knowledge-list">{knowledge.filter((item) => activeTab !== "FAQ Management" || item.category === "FAQs").map((item) => <article key={item.id}><div><div className="qordic-admin-item-heading"><strong>{item.title}</strong><span className={`qordic-admin-index ${item.status}`}>{item.status}</span></div><small>{item.category}{item.source ? ` · ${item.source}` : ""}{item.error ? ` · ${item.error}` : ""}</small><p>{item.content}</p></div><div className="qordic-admin-item-actions"><button type="button" onClick={() => editKnowledge(item)}>Edit</button><button type="button" onClick={() => reindex(item.id)} title="Reindex"><RefreshCw size={15} /></button><button type="button" className="danger" onClick={() => deleteKnowledge(item.id)} title="Delete"><Trash2 size={15} /></button></div></article>)}</div>
                </section>
              </>
            )}

            {activeTab === "Conversations" && (
              <div className="qordic-admin-conversations">
                <section className="qordic-admin-card"><h2>Visitor conversations</h2><p>Conversation text may contain visitor-provided personal information. Handle only for support and knowledge-improvement purposes.</p>{conversations.length ? conversations.map((item) => <button key={item.id} type="button" className={`qordic-admin-conversation${selectedConversation === item.id ? " selected" : ""}`} onClick={() => setSelectedConversation(item.id)}><strong>{item.first_question || "Conversation"}</strong><small>{item.message_count} messages · {new Date(item.updated_at).toLocaleString()}</small></button>) : <p className="qordic-admin-empty">No conversations yet.</p>}</section>
                <section className="qordic-admin-card"><h2>Conversation detail</h2>{conversationMessages.length ? conversationMessages.map((message, index) => <article className={`qordic-admin-transcript ${message.role}`} key={`${message.created_at}-${index}`}><small>{message.role} · {new Date(message.created_at).toLocaleString()}</small><p>{message.content}</p>{message.confidence !== null && <small>Retrieval confidence: {Number(message.confidence).toFixed(2)}</small>}{message.role === "assistant" && <div className="qordic-admin-feedback"><span>Response review:</span><button type="button" className={message.feedback === "helpful" ? "selected" : ""} onClick={async () => { try { await api(`/api/admin/messages/${message.id}/feedback`, { method: "PUT", body: JSON.stringify({ feedback: "helpful" }) }); setConversationMessages((current) => current.map((entry) => entry.id === message.id ? { ...entry, feedback: "helpful" } : entry)); } catch (feedbackError) { setError(feedbackError.message); } }}>Helpful</button><button type="button" className={message.feedback === "needs_review" ? "selected" : ""} onClick={async () => { try { await api(`/api/admin/messages/${message.id}/feedback`, { method: "PUT", body: JSON.stringify({ feedback: "needs_review" }) }); setConversationMessages((current) => current.map((entry) => entry.id === message.id ? { ...entry, feedback: "needs_review" } : entry)); } catch (feedbackError) { setError(feedbackError.message); } }}>Needs review</button></div>}</article>) : <p className="qordic-admin-empty">Select a conversation to view its messages.</p>}</section>
              </div>
            )}

            {activeTab === "AI Configuration" && config && (
              <form className="qordic-admin-card qordic-admin-editor" onSubmit={saveConfig}>
                <h2>Provider settings</h2>
                <p>Uses an OpenAI-compatible API. Provider API keys are server environment variables and are never sent to or stored by the browser.</p>
                <label>API base URL<input type="url" required value={config.base_url} onChange={(e) => setConfig({ ...config, base_url: e.target.value })} /></label>
                <label>Chat model<input required value={config.chat_model} onChange={(e) => setConfig({ ...config, chat_model: e.target.value })} /></label>
                <label>Embedding model<input required value={config.embedding_model} onChange={(e) => setConfig({ ...config, embedding_model: e.target.value })} /></label>
                <p>Provider API key: <strong>{config.api_key_configured ? "Configured on the server" : "Not configured"}</strong>. To change it, update <code>QORDIC_AI_API_KEY</code> in the backend environment and restart the API.</p>
                <p>Retrieval method: persistent SQLite-backed vector embeddings with cosine similarity. Chat model availability: <strong>{config.ai_available ? "Online" : "Offline"}</strong>.</p>
                <button type="submit">Save provider settings</button>
              </form>
            )}
          </section>
        </div>
        <footer className="qordic-admin-footer">Admin endpoints enforce backend authentication. No visitor message is added to company knowledge without admin approval.</footer>
      </div>
    </main>
  );
}
