"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AUDIENCES } from "@/lib/content";
import { QuoteAndChat } from "./ui";
import { Icon } from "./Icon";

const INTERVAL = 5000;
const FADE = 220;

export default function AudienceHero() {
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => {
    if (fading) return;
    const next = (i + AUDIENCES.length) % AUDIENCES.length;
    setFading(true);
    window.setTimeout(() => { setShown(next); setFading(false); }, reduced ? 0 : FADE);
  }, [fading, reduced]);

  // Auto-advance every 5s unless paused (hover, focus, touch) or reduced motion is on.
  useEffect(() => {
    if (paused || reduced || fading) return;
    const t = window.setTimeout(() => go(shown + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [shown, paused, reduced, fading, go]);

  const onDotKey = (e: React.KeyboardEvent, i: number) => {
    const n = AUDIENCES.length;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next === null) return;
    e.preventDefault();
    go(next);
    dots.current[next]?.focus();
  };

  const item = AUDIENCES[shown];

  return (
    <div
      ref={heroRef}
      className="hero c aud-hero"
      id="audience-hero"
      tabIndex={0}
      aria-label="Choose the audience that best describes your payment need"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!heroRef.current?.contains(e.relatedTarget as Node)) setPaused(false); }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="two">
        <div className="aud-copy">
          <div className={`aud-content${fading ? " is-changing" : ""}`} id="aud-content">
            <div className="aud-eyebrow">
              <span className="naira-mark" aria-hidden="true">₦</span> Cross-border Commerce &amp; International Payments
            </div>
            <div className="aud-label" id="aud-label">{item.label}</div>
            <h1 tabIndex={-1}>{item.headline}</h1>
            <p id="aud-support">{item.support}</p>
          </div>
          <div className="row"><QuoteAndChat /></div>
          <div className="aud-controls" role="tablist" aria-label="Choose your audience">
            {AUDIENCES.map((a, i) => (
              <button
                key={a.label}
                ref={(el) => { dots.current[i] = el; }}
                className="aud-dot"
                type="button"
                role="tab"
                aria-label={a.label.replace(/^For /, "")}
                aria-selected={i === shown}
                onClick={() => go(i)}
                onKeyDown={(e) => onDotKey(e, i)}
              />
            ))}
            <span className="aud-status" id="aud-status">{shown + 1} / {AUDIENCES.length}</span>
          </div>
        </div>
        <div className="vis" aria-hidden="true">
          <div className="orb" />
          <div className="orb o2" />
          <div className="fc a">Quote ready<small>Illustrative</small></div>
          <div className="fc b">Invoice received<small>Illustrative</small></div>
          <div className="fc c">Payment in progress<small>Illustrative</small></div>
          <Link className="circ" href="/services" tabIndex={-1}><Icon k="arrow" /></Link>
        </div>
      </div>
    </div>
  );
}
