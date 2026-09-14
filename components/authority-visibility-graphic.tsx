"use client";

import Image from "next/image";
import { Pause, Play, Sparkles } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const platforms = [
  {
    label: "Gemini",
    src: "/engine-icons/googlegemini.svg",
    position: "gemini",
    delay: "-1.1s",
  },
  {
    label: "Google",
    src: "/engine-icons/google.svg",
    position: "google",
    delay: "-2.8s",
  },
  {
    label: "Perplexity",
    src: "/engine-icons/perplexity.svg",
    position: "perplexity",
    delay: "-4.4s",
  },
  {
    label: "ChatGPT",
    src: "/engine-icons/openai.svg",
    position: "chatgpt",
    delay: "-3.5s",
  },
] as const;

const connectorPaths = [
  "M160 76 C190 116 226 136 282 172",
  "M380 65 C380 104 380 126 380 164",
  "M600 80 C570 118 528 140 478 172",
  "M548 465 C520 430 486 402 448 370",
] as const;

export function AuthorityVisibilityGraphic() {
  const graphicRef = useRef<HTMLElement>(null);
  const inView = useInView(graphicRef, { amount: 0.12, margin: "80px 0px 80px 0px" });
  const hasEntered = useInView(graphicRef, { once: true, amount: 0.24 });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const motionRunning = inView && !paused && !reduceMotion;

  function updateDepth(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduceMotion || paused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--authority-tilt-x", `${(-y * 3.2).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--authority-tilt-y", `${(x * 3.2).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--authority-shift-x", `${(x * 6).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--authority-shift-y", `${(y * 6).toFixed(2)}px`);
  }

  function resetDepth(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--authority-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--authority-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--authority-shift-x", "0px");
    event.currentTarget.style.setProperty("--authority-shift-y", "0px");
  }

  return (
    <figure
      ref={graphicRef}
      className={`authority-ai-visual${motionRunning ? " is-motion-running" : ""}`}
      onPointerMove={updateDepth}
      onPointerLeave={resetDepth}
      aria-labelledby="authority-ai-visual-caption"
    >
      <figcaption id="authority-ai-visual-caption" className="sr-only">
        An illustrative GAiO Engine AI visibility workspace receiving answer signals from Gemini,
        Google, Perplexity, and ChatGPT. The sample score is demonstrative, not customer data.
      </figcaption>

      <motion.svg
        className="authority-ai-connectors"
        viewBox="0 0 760 520"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={hasEntered || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.18 }}
      >
        {connectorPaths.map((path, index) => (
          <g key={path}>
            <path className="authority-ai-connector" d={path} />
            <path
              className="authority-ai-connector-pulse"
              d={path}
              style={{ "--connector-delay": `${index * -1.15}s` } as CSSProperties}
            />
          </g>
        ))}
      </motion.svg>

      {platforms.map((platform, index) => (
        <motion.div
          className={`authority-ai-platform authority-ai-platform-${platform.position}`}
          key={platform.label}
          role="img"
          aria-label={`${platform.label} answer engine`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.78, y: 12 }}
          animate={
            hasEntered || reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.78, y: 12 }
          }
          transition={{
            duration: 0.62,
            delay: reduceMotion ? 0 : 0.08 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span
            className="authority-ai-platform-float"
            style={{ "--float-delay": platform.delay } as CSSProperties}
          >
            <Image src={platform.src} alt="" width={48} height={48} aria-hidden="true" />
          </span>
        </motion.div>
      ))}

      <motion.div
        className="authority-ai-card-stage"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.965, y: 20 }}
        animate={
          hasEntered || reduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.965, y: 20 }
        }
        transition={{ duration: 0.78, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="authority-ai-card-depth">
          <div className="authority-ai-card-header">
            <div>
              <span className="authority-ai-kicker">Illustrative workspace</span>
              <h3>AI Visibility <span className="authority-ai-brand"><Sparkles size={12} /> GAiO Engine</span></h3>
            </div>
            <span className="authority-ai-status"><i /> Signal ready</span>
          </div>
          <p className="authority-ai-description">
            Find answer opportunities by inspecting how clearly your brand, evidence, and expertise
            appear across AI-generated discovery.
          </p>

          <div className="authority-ai-tabs" aria-label="Illustrative visibility views">
            <span>Brand visibility</span>
            <span className="is-selected">Sentiment</span>
            <span>Citations</span>
            <span>Prompts</span>
          </div>

          <div className="authority-ai-panel">
            <div className="authority-ai-panel-heading">
              <div><span className="authority-ai-kicker">Brand signal</span><strong>Answer confidence</strong></div>
              <span className="authority-ai-sample">Illustrative</span>
            </div>
            <div className="authority-ai-score-row">
              <div className="authority-ai-score-ring" aria-hidden="true"><span /></div>
              <div className="authority-ai-score"><strong>72%</strong><span>clear signal</span></div>
              <div className="authority-ai-score-copy">
                <strong>Evidence is findable.</strong>
                <span>Strengthen corroboration and connect the next source.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.aside
        className="authority-ai-insight"
        aria-label="Illustrative visibility opportunity"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9, x: 14 }}
        animate={
          hasEntered || reduceMotion
            ? { opacity: 1, scale: 1, x: 0 }
            : { opacity: 0, scale: 0.9, x: 14 }
        }
        transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Opportunity</span>
        <strong>One answer lacks a primary-source citation.</strong>
        <small>Connect the claim to a dated proof page.</small>
      </motion.aside>

      <button
        className="authority-ai-motion-control"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        disabled={Boolean(reduceMotion)}
      >
        {reduceMotion ? <Pause size={14} /> : paused ? <Play size={14} /> : <Pause size={14} />}
        {reduceMotion ? "Motion reduced" : paused ? "Resume animation" : "Pause animation"}
      </button>
    </figure>
  );
}
