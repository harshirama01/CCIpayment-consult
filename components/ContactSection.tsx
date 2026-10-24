"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/content";
import { Icon } from "./Icon";
import { Info, WaButton } from "./ui";
import { GO_FORM_EVENT } from "./QuoteButton";

type Key = "n" | "w" | "t" | "cu" | "am" | "co" | "ct" | "nt";
type Values = Record<Key, string>;

const EMPTY: Values = { n: "", w: "", t: "", cu: "", am: "", co: "", ct: "No call needed", nt: "" };
const EXAMPLE: Values = {
  n: "Ada Okafor", w: "+234 801 234 5678", t: "Supplier or invoice payment",
  cu: "USD", am: "5,000", co: "China", ct: "Afternoon", nt: "Invoice due 30 Nov",
};
const LABELS: [Key, string][] = [
  ["n", "Name"], ["w", "WhatsApp"], ["t", "Payment type"], ["cu", "Currency"],
  ["am", "Amount"], ["co", "Destination country"], ["ct", "Call time"], ["nt", "Note"],
];
const REQUIRED: Partial<Record<Key, string>> = {
  n: "Enter your full name.", w: "Enter your WhatsApp number.", t: "Select a payment type.",
  cu: "Enter or select a currency.", am: "Enter the amount.", co: "Enter the destination country.",
};

function Field({ id, label, required = true, className, error, children }: {
  id: Key; label: string; required?: boolean; className: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}{required ? " *" : ""}</label>
      {children}
      <p className="er" id={`e-${id}`}>{error ?? ""}</p>
    </div>
  );
}

export default function ContactSection() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const summary = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const formEl = useRef<HTMLFormElement>(null);

  const set = (k: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));
  const val = (k: Key) => v[k].trim();

  const goForm = useCallback(() => {
    formEl.current?.scrollIntoView();
    nameInput.current?.focus({ preventScroll: true });
  }, []);

  // "Request a Quote" from any page lands here with #quote; on this page it fires an event instead.
  useEffect(() => {
    if (window.location.hash === "#quote") goForm();
    window.addEventListener(GO_FORM_EVENT, goForm);
    return () => window.removeEventListener(GO_FORM_EVENT, goForm);
  }, [goForm]);

  const hasErrors = Object.keys(errors).length > 0;
  useEffect(() => { if (hasErrors) summary.current?.focus(); }, [errors, hasErrors]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const E: Partial<Record<Key, string>> = {};
    (Object.keys(REQUIRED) as Key[]).forEach((k) => { if (!val(k)) E[k] = REQUIRED[k]; });
    if (!E.w && val("w").replace(/\D/g, "").length < 7) E.w = "Enter a number with at least 7 digits.";
    if (!E.am && !/\d/.test(val("am"))) E.am = "Amount must contain a number.";
    setErrors(E);
    if (Object.keys(E).length) return;
    const L = [
      "New quote request", `Name: ${val("n")}`, `WhatsApp: ${val("w")}`, `Payment type: ${val("t")}`,
      `Currency: ${val("cu")}`, `Amount: ${val("am")}`, `Destination country: ${val("co")}`, `Call time: ${val("ct")}`,
    ];
    if (val("nt")) L.push(`Note: ${val("nt")}`);
    window.open(`${CONFIG.wa}?text=${encodeURIComponent(L.join("\n"))}`, "_blank", "noopener");
  };

  // Live preview of the WhatsApp message; shows an example until the visitor types something.
  const userFields: Key[] = ["n", "w", "t", "cu", "am", "co"];
  const empty = userFields.every((k) => !val(k)) && !val("nt");
  const previewRows = LABELS.filter(([k]) => k !== "nt" || empty || val("nt")).map(([k, label]) => {
    const value = empty ? EXAMPLE[k] : val(k);
    return { k, label, value };
  });

  const inv = (k: Key) => (errors[k] ? true : undefined);
  const errKeys = Object.keys(errors) as Key[];

  return (
    <div className="c">
      <div className="cform">
        <div className="card" id="quote">
          <h2 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Request a payment quote</h2>
          {hasErrors ? (
            <div id="sum" ref={summary} tabIndex={-1}>
              <strong>Please fix the following:</strong>
              <ul style={{ margin: "8px 0 0 20px" }}>
                {errKeys.map((k) => (
                  <li key={k}>
                    <a href={`#${k}`} style={{ color: "inherit" }} onClick={(e) => { e.preventDefault(); document.getElementById(k)?.focus(); }}>
                      {errors[k]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <form id="f" ref={formEl} noValidate onSubmit={onSubmit}>
            <div className="fg">
              <Field id="n" label="Full name" className="f6" error={errors.n}>
                <input ref={nameInput} id="n" name="n" placeholder="e.g. Ada Okafor" autoComplete="name" value={v.n} onChange={set("n")} aria-invalid={inv("n")} aria-describedby="e-n" />
              </Field>
              <Field id="w" label="Your WhatsApp number" className="f6" error={errors.w}>
                <input id="w" name="w" placeholder="e.g. +234 801 234 5678" type="tel" inputMode="tel" value={v.w} onChange={set("w")} aria-invalid={inv("w")} aria-describedby="e-w" />
              </Field>
              <Field id="t" label="Type of payment" className="f12" error={errors.t}>
                <select id="t" value={v.t} onChange={set("t")} aria-invalid={inv("t")} aria-describedby="e-t">
                  <option value="">Select a payment type</option>
                  {CONFIG.paymentTypes.map((x) => <option key={x}>{x}</option>)}
                </select>
              </Field>
              <Field id="cu" label="Currency" className="f4" error={errors.cu}>
                {CONFIG.currencies.length ? (
                  <select id="cu" value={v.cu} onChange={set("cu")} aria-invalid={inv("cu")} aria-describedby="e-cu">
                    <option value="">Select currency</option>
                    {CONFIG.currencies.map((x) => <option key={x}>{x}</option>)}
                  </select>
                ) : (
                  <input id="cu" name="cu" placeholder="e.g. USD" value={v.cu} onChange={set("cu")} aria-invalid={inv("cu")} aria-describedby="e-cu" />
                )}
              </Field>
              <Field id="am" label="Amount" className="f4" error={errors.am}>
                <input id="am" name="am" placeholder="e.g. 5,000" inputMode="decimal" value={v.am} onChange={set("am")} aria-invalid={inv("am")} aria-describedby="e-am" />
              </Field>
              <Field id="co" label="Destination country" className="f4" error={errors.co}>
                <input id="co" name="co" placeholder="e.g. China" value={v.co} onChange={set("co")} aria-invalid={inv("co")} aria-describedby="e-co" />
              </Field>
              <Field id="ct" label="Preferred call time (optional)" className="f6" required={false}>
                <select id="ct" value={v.ct} onChange={set("ct")}>
                  {["No call needed", "Morning", "Afternoon", "Evening"].map((x) => <option key={x}>{x}</option>)}
                </select>
              </Field>
              <Field id="nt" label="Anything else we should know? (optional)" className="f6" required={false}>
                <textarea id="nt" placeholder="e.g. invoice due on 30 Nov" value={v.nt} onChange={set("nt")} />
              </Field>
              <div className="f12">
                <button className="btn p" type="submit" style={{ width: "100%" }}>
                  Send Request on WhatsApp<Icon k="arrow" />
                </button>
                <p className="help">
                  When you click “Send Request on WhatsApp”, WhatsApp opens with your details prepared in a message. Nothing is sent until you review and tap Send in WhatsApp.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="grid">
          <div className="card">
            <div className="eb">WHAT ARRIVES ON YOUR WHATSAPP</div>
            <div className="eb" id="ex" hidden={!empty} style={{ color: "var(--lime)", margin: 0 }}>Example</div>
            <div className="pv" id="pv" aria-live="polite">
              <b style={{ color: "#fff" }}>New quote request</b>{"\n"}
              {previewRows.map((r, i) => (
                <span key={r.k}>
                  {r.label}: {r.value ? r.value : <i>…</i>}
                  {i < previewRows.length - 1 ? "\n" : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Prefer to chat directly?</h3>
            <p>Reach us on WhatsApp and tell us what you need help with.</p>
            <div className="row" style={{ marginTop: 20 }}><WaButton label="Open WhatsApp chat" /></div>
            <div style={{ marginTop: 20 }}><Info website={false} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
