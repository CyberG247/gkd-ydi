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
