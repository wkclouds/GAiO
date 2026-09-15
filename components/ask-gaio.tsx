"use client";

import Link from "next/link";
import { ArrowUp, Bot, ExternalLink, MessageCircle, RefreshCw, ShieldCheck, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Source = { label: string; href: string };
type Message = { id: string; role: "assistant" | "user"; text: string; sources?: Source[]; mode?: "ai" | "faq"; failed?: boolean };

const opening: Message = {
  id: "welcome",
  role: "assistant",
  text: "Hi, I’m GAIO’s AI assistant. I can explain our services, help you explore GEO, or point you toward a useful next step.",
  mode: "faq",
};

const suggestions = [
  "What is GEO?",
  "Which service suits my business?",
  "How does the Authority Engine work?",
  "How do I request an assessment?",
] as const;

export function AskGaio() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [messages, setMessages] = useState<Message[]>([opening]);
  const [draft, setDraft] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const messageId = useRef(1);

  useEffect(() => {
    const target = document.querySelector(".footer-newsletter");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [busy, messages]);

  async function ask(question: string) {
    const cleaned = question.trim().slice(0, 600);
    if (!cleaned || busy) return;
    setLastQuestion(cleaned);
    setDraft("");
    setBusy(true);
    const userMessage: Message = { id: `gaio-${messageId.current++}-user`, role: "user", text: cleaned };
    const conversation = [...messages, userMessage];
    setMessages(conversation);

    try {
      const response = await fetch("/api/ask-gaio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.slice(-6).map(({ role, text }) => ({ role, content: text })),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { answer?: string; sources?: Source[]; mode?: "ai" | "faq"; error?: string };
      if (!response.ok || !result.answer) throw new Error(result.error || "No response");
      setMessages((current) => [...current, {
        id: `gaio-${messageId.current++}-assistant`,
        role: "assistant",
        text: result.answer!,
        sources: result.sources,
        mode: result.mode ?? "faq",
      }]);
    } catch {
      setMessages((current) => [...current, {
        id: `gaio-${messageId.current++}-error`,
        role: "assistant",
        text: "I couldn’t reach the answer service. You can retry, explore our services, or request an assessment.",
        sources: [{ label: "Explore services", href: "/services" }, { label: "Request an assessment", href: "/assessment" }],
        mode: "faq",
        failed: true,
      }]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  return (
    <div className={`ask-gaio${open ? " is-open" : ""}${nearFooter ? " is-near-footer" : ""}`}>
      {open ? (
        <section className="ask-gaio-panel" role="dialog" aria-modal="false" aria-labelledby="ask-gaio-title">
          <header className="ask-gaio-header">
            <span className="ask-gaio-mark" aria-hidden="true"><Bot size={19} /></span>
            <span><strong id="ask-gaio-title">Ask GAIO</strong><small>Services assistant · AI when configured</small></span>
            <button ref={closeRef} type="button" aria-label="Close Ask GAIO" onClick={() => setOpen(false)}><X size={18} /></button>
          </header>

          <div className="ask-gaio-messages" aria-live="polite" aria-busy={busy}>
            {messages.map((message) => (
              <article className={`ask-gaio-message is-${message.role}`} key={message.id}>
                {message.role === "assistant" ? <span className="ask-gaio-mode">{message.mode === "ai" ? "AI answer" : "FAQ mode"}</span> : null}
                <p>{message.text}</p>
                {message.sources?.length ? (
                  <div className="ask-gaio-sources" aria-label="Relevant source pages">
                    {message.sources.map((source) => <Link href={source.href} key={`${message.id}-${source.href}`}>{source.label} <ExternalLink size={11} aria-hidden="true" /></Link>)}
                  </div>
                ) : null}
                {message.failed ? <button className="ask-gaio-retry" type="button" onClick={() => void ask(lastQuestion)}><RefreshCw size={13} /> Retry</button> : null}
              </article>
            ))}
            {messages.length === 1 ? (
              <div className="ask-gaio-suggestions" aria-label="Suggested questions">
                {suggestions.map((question) => <button type="button" key={question} onClick={() => void ask(question)}>{question}</button>)}
              </div>
            ) : null}
            {busy ? <div className="ask-gaio-typing" aria-label="GAIO is preparing an answer"><i /><i /><i /></div> : null}
            <div ref={endRef} />
          </div>

          <form className="ask-gaio-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="ask-gaio-input">Ask about GEO or GAIO services</label>
            <input ref={inputRef} id="ask-gaio-input" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={600} placeholder="Ask about GEO or our services…" disabled={busy} />
            <button type="submit" disabled={busy || !draft.trim()} aria-label="Send question"><ArrowUp size={17} /></button>
          </form>
          <p className="ask-gaio-privacy"><ShieldCheck size={12} aria-hidden="true" /> Don’t share confidential information. Messages are sent to our answer service; contact details are not collected here.</p>
        </section>
      ) : null}
      <button className="ask-gaio-launcher" type="button" aria-expanded={open} aria-controls="ask-gaio-title" onClick={() => setOpen((value) => !value)}>
        <MessageCircle size={17} aria-hidden="true" /> Ask GAIO
      </button>
    </div>
  );
}
