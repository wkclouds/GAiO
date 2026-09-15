import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { AskGaio } from "@/components/ask-gaio";
import { Globe } from "@/components/ui/globe";
import { siteEmails } from "@/lib/site";

export function LayoutFrame({ children }: { children: ReactNode }) {
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><AskGaio /></div>;
}

export function PageHero({ eyebrow, title, copy, action = true }: { eyebrow: string; title: string; copy: string; action?: boolean }) {
  return (
    <section className="page-hero">
      <div className="wrap section-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display headline">{title}</h1>
        <p className="lede">{copy}</p>
        {action && (
          <Link className="button button-signal" href="/assessment" data-event="audit_started" data-location="page_hero">
            Start your GEO assessment <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-panel">
          <div className="cta-globe" aria-hidden="true">
            <Globe className="cta-globe-visual" />
          </div>
          <div className="cta-copy">
            <p className="eyebrow">Your first visibility decision</p>
            <h2 className="display section-title">Find out what AI understands about your business.</h2>
            <p className="lede">Start with a focused audit of your website, market questions, competitors, entities, and proof. We will turn the findings into a practical GEO starting point.</p>
            <div className="hero-actions">
              <Link className="button button-signal" href="/assessment" data-event="audit_started" data-location="final_cta">Run your free AI visibility audit <ArrowRight size={16} /></Link>
              <Link className="button button-ghost" href="/book" data-event="strategy_call_clicked" data-location="final_cta">Book a strategy call</Link>
            </div>
            <p className="cta-disclaimer">No placement guarantees. Every finding is reported as a dated observation with clear limitations.</p>
            <p className="cta-contact">
              Or email{" "}
              <a href={`mailto:${siteEmails.connect}`} aria-label={`Connect at ${siteEmails.connect}`}>{siteEmails.connect}</a>
              {" "}or{" "}
              <a href={`mailto:${siteEmails.support}`} aria-label={`Support at ${siteEmails.support}`}>{siteEmails.support}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
