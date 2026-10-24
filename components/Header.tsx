"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG, ROUTES } from "@/lib/content";
import QuoteButton from "./QuoteButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) burger.current?.focus();
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close(true);
      if (e.key !== "Tab" || !menu.current) return;
      const f = [...menu.current.querySelectorAll<HTMLElement>("a,button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header>
        <div className="c">
          <Link className="wm" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lg" src="/cci-logo.png" alt="" width={52} height={44} />
            CCI PAYMENTS
          </Link>
          <span className="tag">
            <span className="naira-mark" aria-hidden="true">₦</span> Cross-border Commerce &amp; International Payments
          </span>
          <nav aria-label="Main" id="nav">
            {ROUTES.map((r) => (
              <Link key={r.href} href={r.href} aria-current={pathname === r.href ? "page" : undefined}>{r.label}</Link>
            ))}
          </nav>
          <QuoteButton arrow={false} />
          <button
            ref={burger}
            className="burger"
            id="bg"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            <svg className="i" width="24" height="24" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </header>
      <div id="menu" ref={menu} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) close(false); }}>
        <button ref={closeBtn} id="mx" aria-label="Close menu" onClick={() => close(true)}>&times;</button>
        <div id="ml" style={{ display: "contents" }}>
          {ROUTES.map((r) => <Link key={r.href} href={r.href}>{r.label}</Link>)}
          <QuoteButton onNavigate={() => close(false)} />
          <a className="btn" href={CONFIG.wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        </div>
      </div>
    </>
  );
}
