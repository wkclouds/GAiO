"use client";

import { Check, Flag, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { authorityPhases } from "@/lib/editorial";

const phaseIcons = [Flag, Rocket, TrendingUp, Sparkles] as const;
const deliverables = [
  "Four focused topic hubs",
  "Accountable editorial templates",
  "Connected evidence and internal links",
  "A repeatable distribution and review rhythm",
] as const;

function RoadmapPhase({ index, active, onActive }: { index: number; active: boolean; onActive: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.55, margin: "-12% 0px -28% 0px" });
  const phase = authorityPhases[index];
  const Icon = phaseIcons[index] ?? Flag;

  useEffect(() => {
    if (visible) onActive(index);
  }, [index, onActive, visible]);

  return (
    <article ref={ref} className={`authority-roadmap-phase${active ? " is-active" : ""}`}>
      <span className="authority-roadmap-marker" aria-hidden="true"><Icon size={17} /></span>
      <div className="authority-roadmap-panel">
        <div className="authority-roadmap-phase-heading">
          <span>0{index + 1}</span>
          <strong>{phase.range}</strong>
        </div>
        <h3>{phase.title}</h3>
        <p className="authority-roadmap-outcome">{phase.outcome}</p>
        <ol>
          {phase.actions.map((action) => <li key={action}><Check size={15} aria-hidden="true" /><span>{action}</span></li>)}
        </ol>
      </div>
    </article>
  );
}

export function AuthorityRoadmap() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start 75%", "end 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });

  return (
    <section ref={rootRef} className="authority-roadmap" aria-labelledby="authority-roadmap-title">
      <div className="authority-roadmap-intro">
        <div>
          <p className="home-kicker">Step-by-step update plan</p>
          <h2 id="authority-roadmap-title">Ninety days to launch the loop. Years to compound it.</h2>
        </div>
        <p>Complete the sequence in order. This is a practical implementation plan, not a guarantee of business results within ninety days.</p>
      </div>

      <div className="authority-roadmap-layout">
        <div className="authority-roadmap-spine" aria-hidden="true">
          <motion.span style={{ scaleY: reducedMotion ? 1 : progress }} />
        </div>
        {authorityPhases.map((phase, index) => (
          <RoadmapPhase key={phase.range} index={index} active={active === index} onActive={setActive} />
        ))}
      </div>

      <aside className="authority-roadmap-deliverables">
        <span>Deliverables at a glance</span>
        <div>{deliverables.map((item) => <p key={item}><Check size={15} aria-hidden="true" /> {item}</p>)}</div>
      </aside>
    </section>
  );
}
