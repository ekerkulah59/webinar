import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

// Dev: Vite proxies /api/chat → FastAPI (port 8000). Prod: set VITE_RAG_API_URL to your API host.
const API_BASE =
  (import.meta.env.VITE_RAG_API_URL as string | undefined)?.replace(/\/$/, "") ?? "/api";
const API_KEY = import.meta.env.VITE_RAG_API_KEY as string | undefined;

interface Source {
  file: string;
  preview: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  loading?: boolean;
  error?: boolean;
}

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "👋 Hi! I'm the EaseIntoAI Assistant.\n\nAsk me anything about using AI in your business — content, prompting, simple automations, or the EaseIntoAI courses. I answer only from our actual course content.\n\nWhat would you like to learn today?",
};

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full bg-current opacity-60"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
    </div>
  );
}

// ── Source card (collapsible) ─────────────────────────────────────────────────

function Sources({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);

  if (sources.length === 0) return null;

  return (
    <div className="mt-1.5 max-w-[85%]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>📚 {sources.length} source{sources.length > 1 ? "s" : ""}</span>
        {open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 flex flex-col gap-1.5">
              {sources.map((src, i) => (
                <div
                  key={i}
                  className="bg-muted/60 border border-border/60 rounded-xl px-3 py-2.5 text-xs"
                >
                  <p className="font-semibold text-foreground mb-1 truncate">{src.file}</p>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{src.preview}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Single message bubble ─────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm",
          msg.error && "bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-sm"
        )}
      >
        {msg.loading ? <TypingDots /> : <p className="whitespace-pre-wrap">{msg.content}</p>}
      </div>

      {!msg.loading && msg.sources && <Sources sources={msg.sources} />}
    </motion.div>
  );
}

// ── Auto-resize textarea ──────────────────────────────────────────────────────

function AutoResizeTextarea({
  value,
  onChange,
  onKeyDown,
  disabled,
  placeholder,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  placeholder: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const ref = inputRef as React.RefObject<HTMLTextAreaElement>;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 96) + "px";
  }, [value, ref]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={cn(
        "flex-1 resize-none text-sm leading-relaxed py-2.5 px-3.5 rounded-xl",
        "bg-muted/50 border border-border placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-shadow overflow-y-auto min-h-[40px] max-h-[96px]"
      )}
    />
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Keep latest messages in view
  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens; clear unread badge
  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const send = useCallback(async () => {
    const question = input.trim();
    if (!question || loading) return;

    const userMsgId = nanoid();
    const loadingMsgId = nanoid();

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", content: question },
      { id: loadingMsgId, role: "assistant", content: "", loading: true },
    ]);
    setInput("");
    setLoading(true);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (API_KEY) headers["X-API-Key"] = API_KEY;

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error((errBody as { detail?: string }).detail ?? `Server error ${res.status}`);
      }

      const data = (await res.json()) as { answer: string; sources: Source[] };

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsgId
            ? { ...m, content: data.answer, sources: data.sources, loading: false }
            : m
        )
      );

      if (!open) setHasUnread(true);
    } catch (err) {
      const detail =
        err instanceof Error
          ? err.message
          : "Could not reach the assistant. Check that the API is running.";

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsgId
            ? { ...m, content: `⚠️ ${detail}`, loading: false, error: true }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── Floating button ───────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {!open && (
            <motion.div
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <button
                onClick={() => setOpen(true)}
                aria-label="Open EaseIntoAI Assistant"
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <Bot className="size-6" />

                {/* Pulsing ring — draws attention */}
                <span className="absolute inset-0 rounded-full bg-primary/25 animate-ping" />

                {/* Unread badge */}
                {hasUnread && (
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "w-[370px] max-w-[calc(100vw-1.5rem)]",
              "h-[580px] max-h-[calc(100dvh-5rem)]",
              "flex flex-col rounded-2xl overflow-hidden",
              "bg-background border border-border shadow-2xl"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                <Bot className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight truncate">
                  EaseIntoAI Assistant
                </p>
                <p className="text-[11px] opacity-75">Powered by your course content</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages — min-h-0 lets flex child shrink so overflow-y-auto scrolls */}
            <div
              ref={messagesScrollRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth"
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="shrink-0 px-3 pb-3 pt-2 border-t border-border bg-background/95">
              <div className="flex items-end gap-2">
                <AutoResizeTextarea
                  value={input}
                  onChange={setInput}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  placeholder="Ask about AI, courses, prompting…"
                  inputRef={inputRef}
                />
                <Button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  size="icon"
                  className="shrink-0 rounded-xl h-10 w-10"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 leading-tight">
                Answers from EaseIntoAI content ·{" "}
                <a
                  href="https://easeintoai.co"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  easeintoai.co
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
