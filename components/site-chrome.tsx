"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/content";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { siteEmails, siteName, siteSocials } from "@/lib/site";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${siteName} home`}>
      <span>{siteName}</span>
      <small>AI Search Visibility &amp; GEO</small>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand />
        <button ref={toggleRef} className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav ref={navRef} id="main-navigation" className="nav-links" aria-label="Main navigation">
          <details className="nav-services">
            <summary>Services <ChevronDown size={14} aria-hidden="true" /></summary>
            <div className="nav-services-menu">
              <span>Search visibility systems</span>
              <Link href="/services/geo-strategy" onClick={() => setOpen(false)}>GEO strategy <small>Priorities and market questions</small></Link>
              <Link href="/services/technical-ai-crawlability" onClick={() => setOpen(false)}>Technical AI search <small>Access, rendering, and retrieval</small></Link>
              <Link href="/services/answer-ready-content" onClick={() => setOpen(false)}>Answer-ready content <small>Expert pages built around evidence</small></Link>
              <Link href="/services/citation-authority" onClick={() => setOpen(false)}>Citation authority <small>Independent proof and distribution</small></Link>
              <Link className="nav-services-all" href="/services" onClick={() => setOpen(false)}>Explore all services <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </details>
          {navItems.filter((item) => item.href !== "/services").map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="mobile-nav-action mobile-nav-primary" href="/book" data-event="strategy_call_clicked" data-location="mobile_header" onClick={() => setOpen(false)}>Book a strategy call <ArrowRight size={16} aria-hidden="true" /></Link>
        </nav>
        <div className="header-actions">
          <Link className="button header-cta" href="/book" data-event="strategy_call_clicked" data-location="desktop_header">Book a strategy call <CalendarDays size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-newsletter"><NewsletterSignup source="footer" compact /></div>
      <div className="wrap footer-grid">
        <div className="footer-brand-column">
          <Brand />
          <p className="footer-blurb">AI Search Visibility and GEO for businesses that want to become easier to find, understand, trust, cite, and recommend.</p>
          <div className="footer-contact-list">
            <a className="footer-email" href={`mailto:${siteEmails.connect}`}><span>Connect</span>{siteEmails.connect}</a>
            <a className="footer-email" href={`mailto:${siteEmails.support}`}><span>Support</span>{siteEmails.support}</a>
          </div>
          <div className="footer-socials" aria-label="GAIO Engine social profiles">
            {Object.entries(siteSocials).map(([network, href]) => (
              <a key={network} href={href} target="_blank" rel="noreferrer" aria-label={`GAIO Engine on ${network}`}>
                {network === "x" ? "X" : network.charAt(0).toUpperCase() + network.slice(1)} <ExternalLink size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <nav className="footer-links" aria-label="Services and tools">
          <span className="meta">Services and tools</span>
          <Link href="/services">Services</Link>
          <Link href="/authority-engine">Authority Engine</Link>
          <Link href="/visibility-lab">Visibility Lab</Link>
          <Link href="/assessment">Readiness assessment</Link>
        </nav>
        <nav className="footer-links" aria-label="Learn">
          <span className="meta">Learn</span>
          <Link href="/topics">Topics</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resources">Resource library</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <nav className="footer-links" aria-label="Company and evidence">
          <span className="meta">Company and evidence</span>
          <Link href="/about">About</Link>
          <Link href="/proof">Proof</Link>
          <Link href="/authors">Authors &amp; editors</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/evidence-standards">Evidence standards</Link>
          <Link href="/ai-visibility-measurement">Measurement policy</Link>
          <Link href="/corrections-policy">Corrections</Link>
        </nav>
      </div>
      <div className="footer-baseline wrap">
        <span>© {new Date().getFullYear()} GAiO Engine — AI Search Visibility &amp; GEO Agency</span>
        <span className="footer-utility"><a href="/sitemap.xml">Sitemap</a><a href="/llms.txt">llms.txt</a></span>
      </div>
    </footer>
  );
}
