import type { ReactNode } from "react";
import Link from "next/link";
import { CONFIG, type IconKey } from "@/lib/content";
import { Icon } from "./Icon";
import QuoteButton from "./QuoteButton";

export const Badge = ({ k }: { k: IconKey }) => (
  <div className="badge"><Icon k={k} /></div>
);

/** Three-tone heading: grey / lime / white-ish tail, as in the original brand style. */
export const Tone = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <>
    <span className="g">{a}</span> <span className="l">{b}</span> {c}
  </>
);

export const WaButton = ({ label = "Chat on WhatsApp" }: { label?: string }) => (
  <a className="btn" href={CONFIG.wa} target="_blank" rel="noopener noreferrer">{label}</a>
);

export const ContactLink = ({ label }: { label: string }) => (
  <Link className="btn" href="/contact">{label}</Link>
);

export function Cta({ heading, text, children }: { heading: ReactNode; text?: string; children: ReactNode }) {
  return (
    <div className="c">
      <div className="cta rv">
        <h2>{heading}</h2>
        {text ? <p>{text}</p> : null}
        <div className="row">{children}</div>
      </div>
    </div>
  );
}

export const QuoteAndChat = () => (
  <>
    <QuoteButton />
    <WaButton />
  </>
);

export function Panel({ label, k }: { label: string; k: number }) {
  return (
    <div className="pn rv" aria-hidden="true">
      <small>Illustrative</small>
      <svg viewBox="0 0 400 260">
        <rect x="40" y="40" width="220" height="130" rx="16" fill="#16205E" stroke="#fff" strokeOpacity=".15" />
        <rect x="60" y="62" width="50" height="14" rx="4" fill="#BBFF00" />
        <path d="M60 110h150M60 134h100" stroke="#8C918C" strokeWidth="3" strokeLinecap="round" />
        <rect x="170" y="110" width="190" height="110" rx="16" fill="#080D26" stroke="#BBFF00" strokeOpacity=".5" transform={`rotate(${k % 2 ? 5 : -5} 265 165)`} />
        <circle cx="300" cy="80" r="34" fill="none" stroke="#BBFF00" strokeWidth="2" />
        <circle cx="300" cy="80" r="46" fill="none" stroke="#BBFF00" strokeOpacity=".3" />
        <path d="M286 80l10 10 18-20" stroke="#BBFF00" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <b>{label}</b>
    </div>
  );
}

export function Tri({ items }: { items: [string, string][] }) {
  return (
    <div className="grid g3 box rv">
      {items.map((x, i) => (
        <div key={x[0]} className={`card${i === 1 ? " hl" : ""}`}>
          <span className="n">0{i + 1}.</span>
          <h3>{x[0]}</h3>
          <p>{x[1]}</p>
        </div>
      ))}
    </div>
  );
}

export function Cards({ items, cls, hi }: { items: [string, string, IconKey][]; cls: string; hi?: number }) {
  return (
    <div className={`grid ${cls}`}>
      {items.map((x, i) => (
        <div key={x[0]} className={`card rv${i === hi ? " hl" : ""}`}>
          <Badge k={x[2]} />
          <h3>{x[0]}</h3>
          <p>{x[1]}</p>
        </div>
      ))}
    </div>
  );
}

/** Contact details block used in the footer and the contact page. */
export function Info({ website = true }: { website?: boolean }) {
  return (
    <>
      <div><a href={CONFIG.wa} target="_blank" rel="noopener noreferrer">WhatsApp: {CONFIG.phone}</a></div>
      {website ? <div>Website: www.ccipaymentconsult.com.ng</div> : null}
      <div className="m"><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></div>
      {CONFIG.hours.map((h) => <div key={h}>{h}</div>)}
    </>
  );
}
