import type { Metadata } from "next";
import { Cards, Cta, Panel, Tone } from "@/components/ui";
import QuoteButton from "@/components/QuoteButton";
import { STATES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | CCI Payments",
  description: "CCI Payments helps individuals and businesses make and receive international payments without the confusion.",
};

export default function About() {
  return (
    <>
      <div className="hero c nar">
        <div className="eb">ABOUT US</div>
        <h1 tabIndex={-1}><Tone a="International payments" b="without all" c="the stress." /></h1>
        <p>At CCI Payments, we help individuals and businesses make and receive international payments without all the confusion and unnecessary back and forth.</p>
      </div>

      <div className="sec c">
        <div className="two">
          <div>
            <h2 className="rv">Who we <span className="l">are</span></h2>
            <p>We know that paying across borders can be expensive, time-consuming and sometimes difficult to figure out. You want to get a good rate, know what you’re paying for and have someone to turn to when you need help.</p>
            <p>That’s what we’re here for.</p>
            <p>We help you understand your payment options, get a competitive quote and navigate the process from start to finish.</p>
          </div>
          <Panel label={STATES[1]} k={1} />
        </div>
      </div>

      <div className="sec c">
        <h2 className="rv">What you can <span className="l">expect</span> <span className="g">from us</span></h2>
        <div style={{ marginTop: 48 }}>
          <Cards cls="grid five" hi={2} items={[
            ["Saving money", "We provide competitive quotes so you can understand the cost before proceeding.", "rate"],
            ["Less stress", "We help coordinate your invoices, payment requirements and follow-ups.", "coord"],
            ["Timely updates", "Your account manager keeps you informed throughout the process.", "clock"],
            ["Clear records", "We help you keep track of your payment history and relevant documents.", "file"],
            ["Business connections", "Eligible business customers can benefit from partner visibility and opportunities to connect with others in our network.", "net"],
          ]} />
        </div>
      </div>

      <div className="sec c">
        <div className="two">
          <Panel label={STATES[2]} k={0} />
          <div>
            <h2 className="rv">More than payments, <span className="l">for businesses</span></h2>
            <p>We believe that helping a business make and receive payments is only part of the picture.</p>
            <p>That’s why we also create opportunities for business visibility and connections within our network. We want our relationships with customers and partners to create value beyond individual transactions.</p>
          </div>
        </div>
      </div>

      <div className="c">
        <div className="card goal rv">
          <div className="eb">OUR GOAL</div>
          <h2>We want international payments to be <span className="l">one less thing</span> for you to worry about.</h2>
          <p>Whether you’re paying a supplier, managing an international business expense or receiving money from abroad, we’re here to help you navigate the process.</p>
          <p className="so">CCI Payments - Making international payments easier, one transaction at a time.</p>
        </div>
      </div>

      <div className="sec c" />
      <Cta heading={<>Ready for a <span className="l">quote?</span></>}>
        <QuoteButton />
      </Cta>
    </>
  );
}
