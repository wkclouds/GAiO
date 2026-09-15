"use client";

import { ArrowRight, Link2, Megaphone, Pause, Play, RefreshCw, SearchCheck, Sparkles } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const loopStages = [
  { title: "Answer", short: "One real question", description: "Answer one real question well.", detail: "Lead with a direct, useful response that earns the reader’s attention before adding supporting depth.", icon: Sparkles },
  { title: "Prove", short: "Evidence and limits", description: "Show the claim, supporting evidence, and its limits.", detail: "Make sources, methods, dates, authorship, and uncertainty visible so people can inspect why a claim deserves trust.", icon: SearchCheck },
  { title: "Connect", short: "Topic and next step", description: "Link it to the right topic and useful next step.", detail: "Place every answer inside a clear topic system and connect the reader to relevant learning or a commercial action.", icon: Link2 },
  { title: "Distribute", short: "Meet the audience", description: "Share the insight where relevant audiences already pay attention.", detail: "Adapt the useful idea for newsletters, social channels, expert participation, and earned third-party attention.", icon: Megaphone },
  { title: "Update", short: "Improve the durable URL", description: "Improve the same durable URL as knowledge changes.", detail: "Preserve valuable URLs, record meaningful updates, and strengthen the answer as evidence and customer needs evolve.", icon: RefreshCw },
] as const;

export function AuthorityLoop() {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.25, margin: "80px 0px" });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!inView || paused || reducedMotion || !pageVisible) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % loopStages.length), 2300);
    return () => window.clearInterval(timer);
  }, [inView, pageVisible, paused, reducedMotion]);

  function chooseStage(index: number) {
    setActive(index);
    setPaused(true);
  }

  const selected = loopStages[active];

  return (
    <section ref={rootRef} className={`authority-loop${inView && pageVisible && !paused && !reducedMotion ? " is-running" : ""}`} aria-labelledby="compounding-loop-title">
      <div className="authority-loop-heading">
        <div>
          <p className="home-kicker">The compounding loop</p>
          <h2 id="compounding-loop-title">Useful answers become stronger when the system stays connected.</h2>
        </div>
        <p>This is an implementation rhythm, not a shortcut to guaranteed rankings or AI citations.</p>
      </div>

      <div className="authority-loop-layout">
        <div className="authority-loop-canvas">
          <svg className="authority-loop-paths" viewBox="0 0 680 540" aria-hidden="true">
            <path className="authority-loop-base" d="M340 80 C494 80 585 170 575 292 C566 407 470 470 340 463 C210 470 114 407 105 292 C95 170 186 80 340 80Z" />
            <path className="authority-loop-pulse" d="M340 80 C494 80 585 170 575 292 C566 407 470 470 340 463 C210 470 114 407 105 292 C95 170 186 80 340 80Z" />
          </svg>
          <div className="authority-loop-core" aria-hidden="true"><Sparkles size={21} /><strong>GAIO Engine</strong><small>Authority compounds</small></div>
          <div className="authority-loop-stages">
            {loopStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <button
                  className={`authority-loop-stage stage-${index + 1}${active === index ? " is-active" : ""}`}
                  type="button"
                  key={stage.title}
                  onClick={() => chooseStage(index)}
                  aria-pressed={active === index}
                  aria-controls="authority-loop-detail"
                >
                  <span className="authority-loop-stage-icon"><Icon size={17} aria-hidden="true" /></span>
                  <span><small>0{index + 1}</small><strong>{stage.title}</strong><em>{stage.short}</em></span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="authority-loop-detail" id="authority-loop-detail">
          <span className="authority-loop-detail-index">0{active + 1} / 05</span>
          <h3>{selected.title}</h3>
          <p className="authority-loop-detail-summary">{selected.description}</p>
          <p>{selected.detail}</p>
          <span className="authority-loop-detail-next">Then continue the loop <ArrowRight size={15} aria-hidden="true" /></span>
        </aside>
      </div>

      <button
        className="authority-loop-control"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        disabled={Boolean(reducedMotion)}
      >
        {reducedMotion ? <Pause size={14} /> : paused ? <Play size={14} /> : <Pause size={14} />}
        {reducedMotion ? "Motion reduced" : paused ? "Play sequence" : "Pause sequence"}
      </button>
    </section>
  );
}
