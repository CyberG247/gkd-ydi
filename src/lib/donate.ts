export type Currency = "NGN" | "USD" | "GBP" | "EUR";

export interface CurrencyConfig {
  code: Currency;
  label: string;
  symbol: string;
  presets: number[];
  step: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: "NGN", label: "Nigerian Naira (₦)", symbol: "₦", presets: [10000, 25000, 50000, 150000], step: 1000 },
  { code: "USD", label: "US Dollar ($)", symbol: "$", presets: [25, 50, 100, 250], step: 5 },
  { code: "GBP", label: "Pound Sterling (£)", symbol: "£", presets: [20, 40, 80, 200], step: 5 },
  { code: "EUR", label: "Euro (€)", symbol: "€", presets: [25, 50, 100, 250], step: 5 },
];

export const DONOR_TYPES = [
  { id: "individual", label: "Individual Supporter", desc: "Giving in your personal capacity" },
  { id: "organization", label: "Corporate / Business", desc: "Corporate partnership or sponsorship" },
  { id: "foundation", label: "Foundation / NGO", desc: "Grant or philanthropic foundation pledge" },
] as const;

export const FREQUENCIES = [
  { id: "one-time", label: "One-Time Pledge", badge: "Single Gift" },
  { id: "monthly", label: "Monthly Pledge", badge: "Sustaining" },
  { id: "quarterly", label: "Quarterly Pledge", badge: "Periodic" },
  { id: "annual", label: "Annual Pledge", badge: "Major Gift" },
] as const;

export const FULFILLMENT_METHODS = [
  {
    id: "bank-transfer",
    label: "Direct Bank Transfer",
    hint: "Coordinate direct transfer with our secretariat upon pledge submission",
    badge: "Bank Transfer",
  },
  {
    id: "wire-transfer",
    label: "International Wire / SWIFT",
    hint: "Coordinate international wire transfer for cross-border support",
    badge: "International",
  },
  {
    id: "cheque",
    label: "Bank Cheque / Draft",
    hint: "Deliver or mail a crossed cheque made payable to GKD-YDI",
    badge: "Institutional",
  },
  {
    id: "in-kind",
    label: "In-Kind Donation / Materials",
    hint: "Provide equipment, books, computers, learning kits or supplies",
    badge: "Goods / Supplies",
  },
  {
    id: "discuss-with-team",
    label: "Discuss with our Leadership Team",
    hint: "Schedule a conversation regarding structured or multi-year partnership",
    badge: "Strategic",
  },
] as const;

export const TIMELINES = [
  { id: "immediate", label: "Immediate (within 48 hours)" },
  { id: "this-week", label: "Within this week" },
  { id: "this-month", label: "Within this month" },
  { id: "specific-date", label: "Specific upcoming date" },
  { id: "ongoing", label: "Ongoing recurring schedule" },
] as const;

export const DESIGNATIONS = [
  {
    title: "Where it is needed most (General Fund)",
    description: "Allocated dynamically to highest-priority needs across our youth programmes.",
  },
  {
    title: "Education & Scholarships",
    description: "Funds student learning materials, school uniforms, mentorship, and literacy sessions.",
  },
  {
    title: "Skills & Entrepreneurship",
    description: "Seeds starter toolkits, vocational workshops, and digital skills bootcamps for youth.",
  },
  {
    title: "Water, Sanitation & Hygiene (WASH)",
    description: "Rehabilitates community hand pumps, boreholes, and provides clean water & hygiene kits.",
  },
  {
    title: "Youth Leadership & Civic Engagement",
    description: "Empowers youth peacebuilders, leadership summits, and community advocacy clubs.",
  },
  {
    title: "Emergency & Vulnerable Support",
    description: "Immediate relief and assistance packages for orphans, widows, and vulnerable youth.",
  },
] as const;

const IMPACT_TIERS: Record<Currency, { min: number; text: string }[]> = {
  NGN: [
    { min: 150000, text: "can fully support clean water rehabilitation for a community point." },
    { min: 50000, text: "can provide complete vocation starter kits for 2 young apprentices." },
    { min: 25000, text: "can seed learning packs and textbooks for 5 basic school pupils." },
    { min: 10000, text: "can fund classroom learning supplies for students for an entire term." },
    { min: 0, text: "brings critical resources and opportunity directly to youth in Northeast Nigeria." },
  ],
  USD: [
    { min: 250, text: "can fully support clean water rehabilitation for a community point." },
    { min: 100, text: "can provide complete vocation starter kits for 2 young apprentices." },
    { min: 50, text: "can fund a skills training workshop cohort for underserved youth." },
    { min: 25, text: "can provide essential school supplies and learning materials for students." },
    { min: 0, text: "brings critical resources and opportunity directly to youth in Northeast Nigeria." },
  ],
  GBP: [
    { min: 200, text: "can fully support clean water rehabilitation for a community point." },
    { min: 80, text: "can provide complete vocation starter kits for 2 young apprentices." },
    { min: 40, text: "can fund a skills training workshop cohort for underserved youth." },
    { min: 20, text: "can provide essential school supplies and learning materials for students." },
    { min: 0, text: "brings critical resources and opportunity directly to youth in Northeast Nigeria." },
  ],
  EUR: [
    { min: 250, text: "can fully support clean water rehabilitation for a community point." },
    { min: 100, text: "can provide complete vocation starter kits for 2 young apprentices." },
    { min: 50, text: "can fund a skills training workshop cohort for underserved youth." },
    { min: 25, text: "can provide essential school supplies and learning materials for students." },
    { min: 0, text: "brings critical resources and opportunity directly to youth in Northeast Nigeria." },
  ],
};

export function impactPreview(amount: number, currency: Currency) {
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const tier = IMPACT_TIERS[currency]?.find((t) => amount >= t.min) ?? IMPACT_TIERS.NGN.at(-1)!;
  return `${formatAmount(amount, currency)} ${tier.text}`;
}

export function formatAmount(amount: number, currency: Currency) {
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
  return `${symbol}${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function makeReference() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GKD-PLG-${new Date().getFullYear()}-${rand}`;
}
