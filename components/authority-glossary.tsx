"use client";

import { BadgeCheck, BookOpen, Boxes, ChevronDown, FileText, Link2, Mail, Megaphone, MousePointerClick, Network, PenLine, Quote, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { authorityTerms } from "@/lib/editorial";
import { siteName } from "@/lib/site";

type Term = (typeof authorityTerms)[number];

const groups = [
  { id: "foundation", label: "Foundation", terms: ["Domain authority", "Topic hub", "Topic cluster"] },
  { id: "content-trust", label: "Content and trust", terms: ["Click-attracting headline", "Key takeaways", "Original evidence", "Named author and editor"] },
  { id: "navigation-conversion", label: "Navigation and conversion", terms: ["Internal links", "Related-content system", "Commercial CTA"] },
  { id: "distribution-retention", label: "Distribution and retention", terms: ["Newsletter conversion", "Social distribution"] },
] as const;

const termIcons: Record<string, LucideIcon> = {
  "Domain authority": BadgeCheck,
  "Topic hub": BookOpen,
  "Topic cluster": Boxes,
  "Internal links": Link2,
  "Newsletter conversion": Mail,
  "Click-attracting headline": PenLine,
  "Key takeaways": FileText,
  "Original evidence": Sparkles,
  "Named author and editor": Quote,
  "Commercial CTA": MousePointerClick,
  "Related-content system": Network,
  "Social distribution": Megaphone,
};

function termId(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AuthorityGlossary() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const allExpanded = expanded.size === authorityTerms.length;

  function toggleAll() {
    setExpanded(allExpanded ? new Set() : new Set(authorityTerms.map((item) => item.term)));
  }

  function toggleTerm(term: string, open: boolean) {
    setExpanded((current) => {
      const next = new Set(current);
      if (open) next.add(term);
      else next.delete(term);
      return next;
    });
  }

  let runningIndex = 0;

  return (
    <section className="authority-glossary-section" aria-labelledby="authority-glossary-title">
      <div className="authority-glossary-intro">
        <div>
          <p className="home-kicker">Plain-language glossary</p>
          <h2 id="authority-glossary-title">What every part of the engine means.</h2>
        </div>
        <div>
          <p>These are connected editorial and growth systems—not shortcuts to guaranteed rankings or AI citations.</p>
          <button className="authority-expand-all" type="button" onClick={toggleAll} aria-expanded={allExpanded}>
            {allExpanded ? "Collapse all" : "Expand all"} <ChevronDown size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav className="authority-glossary-nav" aria-label="Glossary categories">
        {groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}
      </nav>

      <div className="authority-glossary-groups">
        {groups.map((group) => (
          <section className="authority-glossary-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
            <div className="authority-glossary-group-label"><span>{String(groups.indexOf(group) + 1).padStart(2, "0")}</span><h3 id={`${group.id}-title`}>{group.label}</h3></div>
            <div className="authority-glossary-grid">
              {group.terms.map((termName) => {
                const item = authorityTerms.find((entry) => entry.term === termName) as Term;
                const Icon = termIcons[item.term] ?? Sparkles;
                const index = ++runningIndex;
                return (
                  <article className="authority-term-card" id={termId(item.term)} key={item.term}>
                    <div className="authority-term-heading">
                      <span className="authority-term-number">{String(index).padStart(2, "0")}</span>
                      <span className="authority-term-icon"><Icon size={17} aria-hidden="true" /></span>
                    </div>
                    <h4><a href={`#${termId(item.term)}`}>{item.term}</a></h4>
                    <p>{item.definition}</p>
                    {item.term === "Domain authority" ? <p className="authority-term-note">Moz Domain Authority is a proprietary comparative metric. General domain reputation is broader; neither guarantees Google rankings.</p> : null}
                    <details open={expanded.has(item.term)} onToggle={(event) => toggleTerm(item.term, event.currentTarget.open)}>
                      <summary>How we apply it <ChevronDown size={15} aria-hidden="true" /></summary>
                      <div><strong>On {siteName}:</strong> {item.implementation}</div>
                    </details>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
