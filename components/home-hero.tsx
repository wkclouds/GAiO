"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  FileText,
  Pause,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

function entrance(delay: number, reduceMotion: boolean | null) {
  if (reduceMotion) return { opacity: 1, y: 0 };
  return {
    opacity: [0, 1],
    y: [18, 0],
    transition: { duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="home-hero">
      <div className="wrap home-hero-grid">
        <div className="home-hero-copy">
          <motion.p className="home-kicker" initial={false} animate={entrance(0.02, reduceMotion)}>
            Generative Engine Optimization studio
          </motion.p>
          <motion.h1 className="home-hero-title" initial={false} animate={entrance(0.08, reduceMotion)}>
            Become the source AI turns to.
          </motion.h1>
          <motion.p className="home-hero-lede" initial={false} animate={entrance(0.16, reduceMotion)}>
            We help your business improve visibility across Google and AI search through technical SEO, expert content, and credible authority.
          </motion.p>
          <motion.div className="home-hero-actions" initial={false} animate={entrance(0.24, reduceMotion)}>
            <Link className="button home-button-primary" href="/assessment" data-event="audit_started" data-location="homepage_hero">
              Request a GEO assessment <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button home-button-secondary" href="/authority-engine">
              Explore the Authority Engine
            </Link>
          </motion.div>
          <motion.div className="home-hero-proofline" initial={false} animate={entrance(0.32, reduceMotion)}>
            <span><BadgeCheck size={15} aria-hidden="true" /> Technical clarity</span>
            <span><BadgeCheck size={15} aria-hidden="true" /> Evidence-led content</span>
            <span><BadgeCheck size={15} aria-hidden="true" /> Accountable experts</span>
          </motion.div>
        </div>

        <motion.div className="home-hero-demo-wrap" initial={false} animate={entrance(0.18, reduceMotion)}>
          <HeroEvidenceDemo />
        </motion.div>
      </div>
    </section>
  );
}

function HeroEvidenceDemo() {
  const visualRef = useRef<HTMLElement>(null);
  const inView = useInView(visualRef, { amount: 0.15, margin: "80px 0px" });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const motionActive = inView && pageVisible && !paused && !reduceMotion;

  function updateDepth(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduceMotion || paused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--hero-back-x", `${(x * 6).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-back-y", `${(y * 6).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-front-x", `${(x * 11).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-front-y", `${(y * 11).toFixed(2)}px`);
  }

  function resetDepth(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-back-x", "0px");
    event.currentTarget.style.setProperty("--hero-back-y", "0px");
    event.currentTarget.style.setProperty("--hero-front-x", "0px");
    event.currentTarget.style.setProperty("--hero-front-y", "0px");
  }

  return (
    <figure
      ref={visualRef}
      className={`home-hero-visual${motionActive ? " is-active" : ""}`}
      onPointerMove={updateDepth}
      onPointerLeave={resetDepth}
      aria-labelledby="home-hero-scene-caption"
    >
      <figcaption id="home-hero-scene-caption" className="sr-only">
        An illustrative workflow where a customer question highlights relevant source pages, sends evidence through GAIO Engine, and produces a sourced answer. It is not a live AI query or ranking result.
      </figcaption>

      <div className="home-demo-grid" aria-hidden="true" />
      <div className="home-demo-orbit home-demo-layer-back" aria-hidden="true" />

      <div className="home-demo-topline">
        <span className="home-demo-live"><i aria-hidden="true" /> Illustrative demo</span>
        <span>Question → evidence → cited answer</span>
      </div>

      <div className="home-demo-question home-demo-layer-front">
        <span className="home-demo-icon"><Search size={17} aria-hidden="true" /></span>
        <span><small>Customer question</small><strong>Which GEO partner can build credible AI visibility?</strong></span>
      </div>

      <div className="home-demo-source-stack home-demo-layer-back" aria-hidden="true">
        <div className="home-demo-source home-demo-source-one"><FileText size={16} /><span><strong>Service page</strong><small>Clear capabilities</small></span></div>
        <div className="home-demo-source home-demo-source-two"><FileCheck2 size={16} /><span><strong>Expert guide</strong><small>Named evidence</small></span></div>
        <div className="home-demo-source home-demo-source-three"><BadgeCheck size={16} /><span><strong>External proof</strong><small>Independent signal</small></span></div>
      </div>

      <svg className="home-demo-connectors" viewBox="0 0 720 620" preserveAspectRatio="none" aria-hidden="true">
        <path className="home-demo-path" d="M250 160 C325 180 338 235 360 300" />
        <path className="home-demo-path" d="M210 295 C290 295 315 302 358 307" />
        <path className="home-demo-path" d="M210 365 C290 365 318 330 360 315" />
        <path className="home-demo-path" d="M210 435 C300 435 318 350 362 323" />
        <path className="home-demo-path" d="M390 318 C455 330 472 388 500 424" />
        <path className="home-demo-pulse pulse-question" d="M250 160 C325 180 338 235 360 300" />
        <path className="home-demo-pulse pulse-source-one" d="M210 295 C290 295 315 302 358 307" />
        <path className="home-demo-pulse pulse-source-two" d="M210 365 C290 365 318 330 360 315" />
        <path className="home-demo-pulse pulse-source-three" d="M210 435 C300 435 318 350 362 323" />
        <path className="home-demo-pulse pulse-answer" d="M390 318 C455 330 472 388 500 424" />
      </svg>

      <div className="home-demo-core home-demo-layer-front">
        <span className="home-demo-core-icon"><Sparkles size={17} aria-hidden="true" /></span>
        <strong>GAIO Engine</strong>
        <small>Structures the signal</small>
      </div>

      <div className="home-demo-answer home-demo-layer-front">
        <span className="home-demo-answer-label"><Sparkles size={14} aria-hidden="true" /> Sourced answer</span>
        <p>GAIO Engine connects technical clarity, expert content, and verifiable authority.</p>
        <span className="home-demo-citation"><BadgeCheck size={14} aria-hidden="true" /> Citation · Expert guide</span>
      </div>

      <div className="home-demo-status" aria-hidden="true">
        <span>01 Ask</span><span>02 Retrieve</span><span>03 Verify</span><span>04 Cite</span>
      </div>

      <button
        className="home-scene-control"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        disabled={Boolean(reduceMotion)}
      >
        {reduceMotion ? <Pause size={13} /> : paused ? <Play size={13} /> : <Pause size={13} />}
        {reduceMotion ? "Motion reduced" : paused ? "Resume demo" : "Pause demo"}
      </button>
    </figure>
  );
}
