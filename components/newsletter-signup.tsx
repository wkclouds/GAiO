"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { track } from "@vercel/analytics";

type NewsletterSignupProps = {
  source: string;
  compact?: boolean;
};

export function NewsletterSignup({ source, compact = false }: NewsletterSignupProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const form = new FormData(formElement);
    let response: Response;
    try {
      response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          company: form.get("company"),
          source,
        }),
      });
    } catch {
      setStatus("error");
      setMessage("We could not reach the signup service. Please try again.");
      return;
    }

    const result = (await response.json().catch(() => ({}))) as { error?: string; duplicate?: boolean };

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error || "We could not save your signup. Please try again.");
      return;
    }

    setStatus("success");
    track("newsletter_subscribed", { source });
    setMessage(result.duplicate ? "You’re already subscribed to The Answer Signal." : "You’re on the list. Watch your inbox for the next Answer Signal.");
    formElement.reset();
  }

  return (
    <section className={`newsletter-panel${compact ? " newsletter-panel-compact" : ""}`} aria-labelledby={`newsletter-${source}`}>
      <div className="newsletter-copy">
        <p className="newsletter-brand-line"><strong>The Answer Signal</strong><span>By GAIO Engine</span></p>
        <h2 className="display newsletter-title" id={`newsletter-${source}`}>A clearer view of AI search. One useful email at a time.</h2>
        <p>Get practical research, an evidence-backed insight, and an action you can apply to your search strategy.</p>
      </div>
      <form className="newsletter-form" onSubmit={submit}>
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>Work email</label>
        <input
          id={`newsletter-email-${source}`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          disabled={status === "loading" || status === "success"}
        />
        <label className="newsletter-honeypot" aria-hidden="true">
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <button className="button button-signal" type="submit" disabled={status === "loading" || status === "success"}>
          {status === "success" ? <><Check size={16} /> Subscribed</> : <>Get The Answer Signal <ArrowRight size={16} /></>}
        </button>
        <p className="newsletter-consent">By subscribing, you agree to receive GAiO Engine editorial email. Unsubscribe any time.</p>
        {message ? <p className={`newsletter-status is-${status}`} role="status">{message}</p> : null}
      </form>
    </section>
  );
}
