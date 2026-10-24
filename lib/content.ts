// Confirm against supported services, currencies and destinations before launch
export const CONFIG = {
  wa: "https://wa.me/2349029855382",
  phone: "+234 902 985 5382",
  hours: ["Monday to Friday: 8:30am – 5:00pm", "Saturday: 9:00am – 3:00pm"],
  email: "invoice@ccipaymentconsult.com.ng",
  paymentTypes: [
    "Supplier or invoice payment",
    "Other eligible international payment",
    "Study abroad payment",
    "Receiving an international payment",
    "Not sure yet",
  ],
  currencies: [] as string[],
};

export const ICON_PATHS = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5 9-10",
  pay: "M3 7h18v10H3zM3 11h18M7 15h3",
  rate: "M4 19V9M10 19V5M16 19v-8M22 19H2",
  coord: "M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  file: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  net: "M12 4v8M12 12l-6 6M12 12l6 6M12 3.500a.5.5 0 1 0 .01 0M5 19a1 1 0 1 0 .01 0M19 19a1 1 0 1 0 .01 0",
} as const;
export type IconKey = keyof typeof ICON_PATHS;

export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const STATES = ["Quote ready", "Invoice received", "Payment in progress"] as const;

export const FAQ: [string, string][] = [
  ["How do I get a quote?", "Send us your payment type, amount, currency and destination country through our quote form or WhatsApp. We’ll review the details and provide the applicable quote and next steps."],
  ["How quickly will my payment be completed?", "Processing time depends on the payment type, destination, required checks and payment route. We’ll explain the expected timeline for your transaction before you proceed."],
  ["Is the quote a commitment to proceed?", "No. A quote lets you review the expected cost and applicable terms before deciding whether to proceed. Any quote validity period and conditions will be stated when we provide it."],
  ["What do I need to have ready?", "Depending on the transaction, you may need your invoice, beneficiary details, payment reference and supporting documents. We’ll let you know what is required for your particular payment."],
  ["Can I receive international payments through CCI Payments?", "We assist with international collections through supported arrangements. Contact us with your country, currency and payment requirements so we can confirm the available options."],
  ["Will I have someone to contact after requesting a quote?", "Yes. When you work with us, your dedicated account manager helps coordinate the process and provide updates and follow-ups."],
];

export type Svc = { title: string; body: string; cta: string; kind: "q" | "c" | "w" };
export const SERVICES: Svc[] = [
  { title: "Making international payments", body: "Need to pay a supplier abroad, settle a business invoice or make another eligible international payment, such as a study abroad payment? We help you understand the requirements, get a quote and navigate the process using Naira to fund eligible payments.", cta: "Request a Quote", kind: "q" },
  { title: "Competitive rates and clear quotes", body: "Nobody wants to spend more than necessary on an international payment. We provide competitive quotes so you can see the expected cost of your transaction, including applicable charges, before you decide to proceed.", cta: "Get a Quote", kind: "q" },
  { title: "Payment and invoice coordination", body: "Getting an international payment done can involve several steps. We help you coordinate the quotation, invoice preparation, required details and follow-ups so you know what needs to happen next.", cta: "Talk to Us", kind: "c" },
  { title: "Dedicated account manager", body: "You shouldn’t have to keep wondering what’s happening with your payment. When you work with us, you have a dedicated account manager who coordinates your payments, provides updates, sends reminders and follows up when necessary.", cta: "Speak to Us", kind: "c" },
  { title: "Receiving international payments", body: "Working with customers and partners abroad? We help businesses navigate international payment collections through supported arrangements. This can make it easier to manage payments from overseas customers and business partners, depending on the currencies and collection options available.", cta: "Discuss Your Requirements", kind: "c" },
  { title: "Organised payment records", body: "Keeping track of multiple transactions can become difficult, especially when you make payments regularly. We help you keep your payment history and supporting documents organised, making it easier to refer to previous transactions when needed.", cta: "Enquire on WhatsApp", kind: "w" },
];

export const AUDIENCES = [
  { label: "For Businesses", headline: "Pay Overseas Suppliers in Naira.", support: "Make international payments to overseas suppliers, vendors and service providers using Nigerian Naira, with competitive rates and dedicated support from CCI Payments." },
  { label: "For Students & Parents", headline: "Pay International School Fees in Naira.", support: "Students, parents and education consultants can arrange payments for tuition, school deposits and other eligible study-abroad expenses using Nigerian Naira." },
  { label: "For Importers & Exporters", headline: "Pay International Trade Expenses in Naira.", support: "Simplify payments to overseas suppliers and trading partners. CCI Payments helps importers, exporters and trading businesses arrange international payments funded in Nigerian Naira." },
  { label: "For International Businesses", headline: "Make Cross-Border Payments Using Naira.", support: "For e-commerce businesses, online sellers and companies working with international clients that need support arranging cross-border payments funded in Nigerian Naira, with competitive rates and dedicated assistance." },
];
