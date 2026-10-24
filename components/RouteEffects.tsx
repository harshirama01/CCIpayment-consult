"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Per-page behaviour that used to live in the hash router:
 *  - staggered scroll-reveal for every `.rv` element
 *  - moving keyboard focus to the page's <h1> after client-side navigation
 */
export default function RouteEffects() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("#main .rv")];
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((e, i) => { e.style.transitionDelay = `${(i % 4) * 80}ms`; io.observe(e); });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.location.hash) return; // e.g. /contact#quote handles its own focus
    document.querySelector<HTMLElement>("#main h1")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
