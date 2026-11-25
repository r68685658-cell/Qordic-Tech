import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  LoaderCircle,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../lib/api.js";

const WHATSAPP_URL = "https://wa.me/923462641229";
const WELCOME = "Hello! Welcome to QORDIC Technologies. I can help you explore our services, discuss your project requirements, and answer questions about our company.\n\nHow can I help?";
const SUGGESTIONS = [
  "What does QORDIC Technologies do?",
  "What services do you offer?",
  "Do you develop custom software?",
  "Can you build mobile applications?",
  "What is your development process?",
  "How can I start a project with you?",
];
const INITIAL_SUGGESTION_COUNT = 4;

function getStatusLabel(status) {
  const labels = {
    connecting: "Connecting…",
    online: "AI Assistant Online",
    offline: "AI backend offline",
    not_configured: "AI provider not configured",
    invalid_credentials: "AI provider credentials rejected",
    model_unavailable: "AI model unavailable",
    rate_limited: "AI temporarily unavailable",
    unreachable: "AI temporarily unavailable",
    unavailable: "AI temporarily unavailable",
  };
  return labels[status] || labels.unavailable;
}

function createConversationId() {
  return globalThis.crypto?.randomUUID?.() || `qordic-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function MessageText({ text }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a key={`${part}-${index}`} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [conversationId, setConversationId] = useState(createConversationId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [retryText, setRetryText] = useState("");
  const reduceMotion = useReducedMotion();
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return undefined;

    const updateViewport = () => {
      const keyboardInset = Math.max(
        0,
        window.innerHeight - (visualViewport.offsetTop + visualViewport.height),
      );
      const keyboardOpen =
        window.matchMedia("(max-width: 760px)").matches && keyboardInset > 120;
      document.documentElement.style.setProperty(
        "--qordic-ai-keyboard-inset",
        `${keyboardInset}px`,
      );
      document.documentElement.style.setProperty(
        "--qordic-ai-visual-height",
        `${visualViewport.height}px`,
      );
      document.documentElement.style.setProperty(
        "--qordic-ai-visual-offset",
        `${visualViewport.offsetTop}px`,
      );
      document.documentElement.dataset.aiKeyboardOpen = String(keyboardOpen);
    };

    updateViewport();
    visualViewport.addEventListener("resize", updateViewport);
    visualViewport.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      visualViewport.removeEventListener("resize", updateViewport);
      visualViewport.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
      delete document.documentElement.dataset.aiKeyboardOpen;
      document.documentElement.style.removeProperty("--qordic-ai-keyboard-inset");
      document.documentElement.style.removeProperty("--qordic-ai-visual-height");
      document.documentElement.style.removeProperty("--qordic-ai-visual-offset");
    };
  }, []);

  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const response = await fetch(apiUrl("/health"));
        if (!response.ok) throw new Error("Status unavailable");
        const health = await response.json();
        const status = health.backend === "online" ? health.ai_provider : "offline";
        if (active) {
          setConnectionStatus(status);
          setOnline(status === "online");
        }
      } catch {
        if (active) {
          setConnectionStatus("offline");
          setOnline(false);
        }
      }
    };
    check();
    const interval = window.setInterval(check, 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "end",
      });
    }
  }, [messages, open, reduceMotion]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  const startNewConversation = () => {
    if (sendingRef.current) return;
    setConversationId(createConversationId());
    setMessages([]);
    setError("");
    setRetryText("");
    setShowSuggestions(true);
    setShowAllSuggestions(false);
    inputRef.current?.focus();
  };

  const closeChat = () => {
    setOpen(false);
  };

  const sendMessage = async (value = input, { retry = false } = {}) => {
    const text = value.trim();
    if (!text || sendingRef.current) return;
    sendingRef.current = true;
    setError("");
    setRetryText("");
    setShowSuggestions(false);
    setInput("");
    if (!retry) {
      setMessages((current) => [...current, { role: "user", content: text }]);
    }
    setSending(true);
    setMessages((current) => [...current, { role: "assistant", content: "", pending: true }]);

    try {
      const response = await fetch(apiUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationId, message: text }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.detail || "The assistant is unavailable. Please try WhatsApp instead.");
      }
      if (!response.body) throw new Error("Streaming is unavailable. Please try again.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";
      let streamError = "";
      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunk, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const event of events) {
          const eventName = event.match(/^event: (.+)$/m)?.[1];
          const data = event.match(/^data: (.+)$/m)?.[1];
          if (eventName === "error" && data) {
            try {
              streamError = JSON.parse(data).message || "The AI service was interrupted.";
            } catch {
              streamError = "The AI service was interrupted.";
            }
          } else if (data && eventName !== "done") {
            try {
              answer += JSON.parse(data).token || "";
              setMessages((current) => current.map((message, index) =>
                index === current.length - 1
                  ? { role: "assistant", content: answer, pending: !answer }
                  : message,
              ));
            } catch {
              // Ignore malformed non-token events; the server emits individual JSON tokens.
            }
          }
        }
      }
      if (streamError) throw new Error(streamError);
      if (!answer.trim()) throw new Error("No response was received. Please retry or contact us on WhatsApp.");
      setRetryText("");
      setMessages((current) => current.map((message, index) =>
        index === current.length - 1 ? { role: "assistant", content: answer.trim() } : message,
      ));
    } catch (sendError) {
      setMessages((current) => current.filter((message) => !message.pending));
      setRetryText(text);
      const isConnectionError = sendError instanceof TypeError;
      setError(isConnectionError
        ? "We couldn't reach the QORDIC AI backend. Please try again shortly or contact our team on WhatsApp."
        : sendError instanceof Error
          ? sendError.message
          : "The assistant could not respond. Please try again.");
      setConnectionStatus(isConnectionError ? "offline" : "unavailable");
      setOnline(false);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div className={`qordic-ai-widget${open ? " is-open" : ""}`}>
      <AnimatePresence>
        {open && (
          <motion.section
            className="qordic-ai-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="qordic-ai-title"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <header className="qordic-ai-header">
              <span className="qordic-ai-avatar" aria-hidden="true">
                <Bot size={23} />
                <span className={`qordic-ai-status ${online ? "is-online" : ""}`} />
              </span>
              <span className="qordic-ai-heading">
                <strong id="qordic-ai-title">QORDIC AI</strong>
                <span>Your Intelligent Technology Assistant</span>
                <span className={`qordic-ai-presence ${online ? "is-online" : ""}`}>
                  <i /> {getStatusLabel(connectionStatus)}
                </span>
              </span>
              <span className="qordic-ai-controls">
                <button type="button" aria-label="New conversation" title="New conversation" onClick={startNewConversation} disabled={sending}>
                  <Plus size={17} />
                </button>
                <button type="button" aria-label="Minimize chat" title="Minimize" onClick={() => setOpen(false)}>
                  <Minus size={17} />
                </button>
                <button type="button" aria-label="Close chat" title="Close" onClick={closeChat}>
                  <X size={17} />
                </button>
              </span>
            </header>

            <div className="qordic-ai-messages" aria-live="polite">
              <div className="qordic-ai-welcome">
                <span className="qordic-ai-message-avatar"><Sparkles size={14} /></span>
                <p>{WELCOME}</p>
              </div>
              {!online && (
                <div className="qordic-ai-offline">
                  {connectionStatus === "not_configured"
                    ? "The AI provider has not been configured on this server. You can still"
                    : "The AI assistant is offline right now. You can still"}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"> reach our team on WhatsApp</a>.
                </div>
              )}
              {showSuggestions && (
                <div className="qordic-ai-suggestions" aria-label="Suggested questions">
                  {SUGGESTIONS.slice(0, showAllSuggestions ? SUGGESTIONS.length : INITIAL_SUGGESTION_COUNT).map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} disabled={sending}>
                      {suggestion}<ArrowUpRight size={13} />
                    </button>
                  ))}
                  {SUGGESTIONS.length > INITIAL_SUGGESTION_COUNT && (
                    <button className="qordic-ai-more" type="button" onClick={() => setShowAllSuggestions((value) => !value)}>
                      {showAllSuggestions ? "Show fewer questions" : "See more questions"}
                    </button>
                  )}
                </div>
              )}
              {messages.map((message, index) => (
                <div className={`qordic-ai-message is-${message.role}`} key={`${index}-${message.role}`}>
                  {message.role === "assistant" && <span className="qordic-ai-message-avatar"><Sparkles size={14} /></span>}
                  <p className="qordic-ai-bubble">
                    {message.pending && !message.content ? (
                      <span className="qordic-ai-typing" aria-label="Qordic AI is typing"><i /><i /><i /></span>
                    ) : <MessageText text={message.content} />}
                  </p>
                </div>
              ))}
              {error && (
                <div className="qordic-ai-error" role="alert">
                  <p>{error}</p>
                  {retryText && <button type="button" onClick={() => sendMessage(retryText, { retry: true })} disabled={sending}>Retry</button>}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length > 0 && (
              <div className="qordic-ai-contact-actions">
                <a className="qordic-ai-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={15} /> Continue with QORDIC on WhatsApp <ArrowUpRight size={14} />
                </a>
                <Link className="qordic-ai-inquiry" to="/start-project">Start a project inquiry</Link>
              </div>
            )}
            <form
              className="qordic-ai-composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                aria-label="Message QORDIC AI"
                placeholder={online ? "Ask about our services…" : "AI assistant is currently unavailable"}
                maxLength={4000}
                rows={1}
                disabled={!online || sending}
              />
              <button type="submit" aria-label="Send message" disabled={!input.trim() || !online || sending}>
                {sending ? <LoaderCircle size={18} className="qordic-ai-spinner" /> : <Send size={17} />}
              </button>
            </form>
            <p className="qordic-ai-disclaimer">
              {online ? "Answers use approved company information. Please don't share sensitive details." : "Contact our team directly if you need help now."}
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        className={`qordic-ai-launcher${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? "Close QORDIC AI assistant" : "Open QORDIC AI assistant"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="qordic-ai-orbit qordic-ai-orbit-one" />
        <span className="qordic-ai-orbit qordic-ai-orbit-two" />
        <span className="qordic-ai-core"><Bot size={26} strokeWidth={1.8} /></span>
        <span className={`qordic-ai-launcher-status ${online ? "is-online" : ""}`} />
        <span className="qordic-ai-launcher-label">Ask QORDIC AI</span>
      </button>
    </div>
  );
}
