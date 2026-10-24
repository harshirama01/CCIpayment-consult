import type { Metadata } from "next";
import { ContactLink, Cta, Panel, Tone } from "@/components/ui";
import QuoteButton from "@/components/QuoteButton";
import { CONFIG, SERVICES, STATES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services | CCI Payments",
  description: "Making and receiving international payments, clear quotes, coordination and a dedicated account manager.",
};

const WHO: [string, string][] = [
  ["Importers and exporters", "navigate eligible international supplier and trade payments."],
  ["E-commerce businesses", "manage eligible payments related to overseas suppliers and business expenses."],
  ["SMEs", "get help coordinating recurring international transactions."],
  ["Companies with international clients", "explore supported international payment and collection arrangements."],
  ["Study abroad agencies", "help clients with eligible study abroad payments."],
  ["Individuals", "get guidance on eligible international payment needs."],
];

export default function Services() {
  return (
    <>
      <div className="hero c nar">
        <div className="eb">SERVICES</div>
        <h1 tabIndex={-1}><Tone a="Everything you need" b="to navigate payments" c="across borders." /></h1>
        <p>Whether you’re making an international payment or looking for a way to receive money from overseas, we help you understand your options and guide you through the process.</p>
      </div>

      <div className="c">
        {SERVICES.map((s, i) => (
          <div key={s.title} className={`srow rv${i % 2 ? " rev" : ""}${i === 2 ? " hl2" : ""}`}>
            <div className="two">
              <div className="tx">
                <span className="n">0{i + 1}</span>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
                {s.kind === "q" ? <QuoteButton label={s.cta} variant={i === 2 ? "" : "p"} />
                  : s.kind === "c" ? <ContactLink label={s.cta} />
                  : <a className="btn" href={CONFIG.wa} target="_blank" rel="noopener noreferrer">{s.cta}</a>}
              </div>
              <Panel label={STATES[i % 3]} k={i} />
            </div>
          </div>
        ))}
      </div>

      <div className="sec c">
        <h2 className="rv">Who are these <span className="l">services</span> <span className="g">for?</span></h2>
        <div style={{ marginTop: 48 }} className="grid g3">
          {WHO.map((x) => (
            <div key={x[0]} className="card rv"><h3>{x[0]}</h3><p>{x[1]}</p></div>
          ))}
        </div>
      </div>

      <Cta
        heading={<>Not sure which <span className="l">service</span> you need?</>}
        text="Tell us a little about your payment, and we’ll help you understand the next steps."
      >
        <QuoteButton />
      </Cta>
    </>
  );
}
