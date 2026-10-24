import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "Request a Quote | CCI Payments",
  description: "Request a payment quote. Your details open in WhatsApp for you to review and send.",
};

export default function Contact() {
  return (
    <>
      <div className="hero c nar">
        <div className="eb">CONTACT</div>
        <h1 tabIndex={-1}>Let’s talk about <span className="l">your payment.</span></h1>
        <p>Need to make an international payment or receive money from overseas? Tell us what you need, and we’ll get back to you with the relevant information.</p>
      </div>

      <ContactSection />

      <div className="sec c">
        <h2 className="rv" style={{ textAlign: "center" }}>Frequently asked <span className="l">questions</span></h2>
        <Faq />
      </div>
    </>
  );
}
