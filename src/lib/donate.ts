export type Currency = "NGN" | "USD" | "GBP" | "EUR";

export const CURRENCIES: { code: Currency; label: string; symbol: string; presets: number[] }[] = [
  { code: "NGN", label: "Nigerian Naira", symbol: "₦", presets: [5000, 15000, 50000, 150000] },
  { code: "USD", label: "US Dollar", symbol: "$", presets: [25, 50, 100, 250] },
  { code: "GBP", label: "Pound Sterling", symbol: "£", presets: [20, 40, 80, 200] },
  { code: "EUR", label: "Euro", symbol: "€", presets: [25, 50, 100, 250] },
];

export const OFFICIAL_ACCOUNT = {
  accountName: "Gidan Karan Dawa Youth Development Initiatives",
  bank: "GKD-YDI Official Account",
  accountNumber: "0000000000",
  note: "Placeholder details — replace with the verified account information supplied by the organisation.",
} as const;

export type DonationFrequency = "one-time" | "monthly";

export type PaymentMethod = "card" | "transfer" | "ussd" | "mobile-money";

export const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  hint: string;
}[] = [
  { id: "card", label: "Debit / Credit Card", hint: "Visa, Mastercard, Verve" },
  { id: "transfer", label: "Bank Transfer", hint: "Straight to the official account" },
  { id: "ussd", label: "USSD", hint: "Give from any phone in seconds" },
  { id: "mobile-money", label: "Mobile Money", hint: "Opay, PalmPay, MoMo & more" },
];

export const PROCESSING_LABEL: Record<PaymentMethod, string> = {
  card: "Authorising your card securely",
  transfer: "Reserving your transfer reference",
  ussd: "Confirming your USSD approval",
  "mobile-money": "Awaiting wallet confirmation",
};

const IMPACT_TIERS: Record<Currency, { min: number; text: string }[]> = {
  NGN: [
    { min: 100000, text: "can help rehabilitate a community water point." },
    { min: 25000, text: "can seed a starter kit for a young entrepreneur." },
    { min: 5000, text: "can supply learning materials for one student for a term." },
    { min: 0, text: "still brings opportunity closer for a young person." },
  ],
  USD: [
    { min: 250, text: "can help rehabilitate a community water point." },
    { min: 50, text: "can fund a skills-training session for young people." },
    { min: 10, text: "can provide school supplies for one student." },
    { min: 0, text: "still brings opportunity closer for a young person." },
  ],
  GBP: [
    { min: 200, text: "can help rehabilitate a community water point." },
    { min: 40, text: "can fund a skills-training session for young people." },
    { min: 8, text: "can provide school supplies for one student." },
    { min: 0, text: "still brings opportunity closer for a young person." },
  ],
  EUR: [
    { min: 250, text: "can help rehabilitate a community water point." },
    { min: 50, text: "can fund a skills-training session for young people." },
    { min: 10, text: "can provide school supplies for one student." },
    { min: 0, text: "still brings opportunity closer for a young person." },
  ],
};

export function impactPreview(amount: number, currency: Currency) {
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const tier = IMPACT_TIERS[currency]?.find((t) => amount >= t.min) ?? IMPACT_TIERS.NGN.at(-1)!;
  return `${formatAmount(amount, currency)} ${tier.text}`;
}

export const DESIGNATIONS = [
  "Where it is needed most",
  "Education & scholarships",
  "Skills & entrepreneurship",
  "Water, sanitation & hygiene",
  "Youth leadership programmes",
] as const;

export function formatAmount(amount: number, currency: Currency) {
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
  return `${symbol}${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function makeReference() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GKD-${new Date().getFullYear()}-${rand}`;
}
