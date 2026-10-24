import type { Metadata } from "next";
import AudienceHero from "@/components/AudienceHero";
import { Cards, Cta, Panel, QuoteAndChat, Tri } from "@/components/ui";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import { STATES } from "@/lib/content";

export const metadata: Metadata = {
  title: "CCI Payments | International Payments Made Easier",
  description: "Pay suppliers abroad, settle international invoices or receive money from overseas with CCI Payments. Fund eligible payments in Naira.",
};

const steps = [
  ["Tell us what you need", "Complete our short quote form with your payment details."],
  ["Get your quote", "We review your requirements and send you a quote with the applicable rate, charges and next steps."],
  ["We guide you through it", "Once you approve the terms and complete the required steps, we coordinate the payment process and keep you updated."],
];

const audience = [
  "Businesses paying overseas suppliers and service providers.",
  "Importers and exporters.",
  "E-commerce businesses and online sellers.",
  "Companies working with international clients and partners.",
  "Businesses that make international payments regularly.",
  "Study abroad agencies and families making eligible study abroad payments.",
  "Individuals with eligible international payment needs.",
];

export default function Home() {
  return (
    <>
      <AudienceHero />

      <div className="sec c" style={{ paddingTop: 40 }}>
        <h2 className="rv">Why work with <span className="l">us?</span></h2>
        <Tri items={[
          ["Competitive rates", "Get a clear quote before you proceed, so you know what your payment will cost."],
          ["A process that saves you time", "We help coordinate your quotes, invoices and payment follow-ups, with efficient processing."],
          ["Someone to help you", "You get a dedicated account manager to coordinate your payments and keep you updated."],
        ]} />
      </div>

      <div className="sec c">
        <div className="head">
          <h2 className="rv">What we <span className="l">help you</span> <span className="g">with</span></h2>
          <Link className="lk" href="/services">See all services</Link>
        </div>
        <Cards cls="g3" items={[
          ["Making international payments", "Pay eligible suppliers, service providers and other international beneficiaries using Naira to fund your payment.", "pay"],
          ["Competitive rates and clear quotes", "Know the expected cost of your transaction before deciding to proceed.", "rate"],
          ["Payment coordination", "From preparing your invoice to following up on your transaction, we help you keep things moving.", "coord"],
          ["Dedicated account management", "Have a go-to person who can answer your questions, provide updates and follow up on your payments.", "user"],
          ["Receiving international payments", "We help businesses receive payments from international customers and partners through supported payment arrangements.", "globe"],
          ["Organised payment records", "Keep your payment history and supporting documents organised and easier to access.", "file"],
        ]} />
      </div>

      <div className="sec c">
        <h2 className="rv">How it <span className="l">works</span></h2>
        <div className="grid g3 steps" style={{ marginTop: 48 }}>
          {steps.map((x, i) => (
            <div key={x[0]} className={`card rv${i === 1 ? " hl" : ""}`}>
              <span className="n">{i + 1}</span>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec c">
        <div className="two">
          <div>
            <h2 className="rv">Who we <span className="l">work with</span></h2>
            <ul className="ck">
              {audience.map((x) => (
                <li key={x}><Icon k="check" /><span>{x}</span></li>
              ))}
            </ul>
          </div>
          <Panel label={STATES[0]} k={0} />
        </div>
      </div>

      <div className="sec c" style={{ paddingTop: 0 }} />
      <Cta
        heading={<>International payments, <span className="l">one less thing</span> <span className="g">to worry about.</span></>}
        text="Tell us what you need to pay or receive. We’ll help you understand the process and your available options."
      >
        <QuoteAndChat />
      </Cta>
    </>
  );
}
