import type { DonationPledgeInput } from "./donate-schema";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isDonationRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function sanitize(value: string): string {
  let cleaned = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    cleaned += code <= 0x1f || code === 0x7f ? " " : char;
  }
  return cleaned.trim();
}

export function generatePledgeReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `GKD-PLG-${year}-${rand}`;
}

export interface DonationPledgeRecord {
  reference: string;
  donorType: string;
  donorDisplayName: string;
  email: string;
  phone: string;
  country: string;
  stateOrCity?: string;
  preferredContact: string;
  currency: string;
  amount: number;
  frequency: string;
  designation: string;
  fulfillmentMethod: string;
  timeline: string;
  anonymous: boolean;
  requestTaxReceipt: boolean;
  subscribeNewsletter: boolean;
  receivedAt: string;
}

export async function recordDonationPledge(
  input: DonationPledgeInput,
  reference: string,
): Promise<DonationPledgeRecord> {
  const isAnon = Boolean(input.anonymous);
  const displayName = isAnon
    ? "Anonymous Supporter"
    : input.donorType === "organization" || input.donorType === "foundation"
      ? sanitize(`${input.organizationName ?? ""} (Attn: ${input.fullName ?? ""})`)
      : sanitize(input.fullName ?? "Supporter");

  const record: DonationPledgeRecord = {
    reference,
    donorType: input.donorType,
    donorDisplayName: displayName,
    email: sanitize(input.email),
    phone: sanitize(input.phone),
    country: sanitize(input.country),
    stateOrCity: input.stateOrCity ? sanitize(input.stateOrCity) : undefined,
    preferredContact: input.preferredContact,
    currency: input.currency,
    amount: input.amount,
    frequency: input.frequency,
    designation: sanitize(input.designation),
    fulfillmentMethod: input.fulfillmentMethod,
    timeline: input.timeline,
    anonymous: isAnon,
    requestTaxReceipt: Boolean(input.requestTaxReceipt),
    subscribeNewsletter: Boolean(input.subscribeNewsletter),
    receivedAt: new Date().toISOString(),
  };

  // Log pledge registration on server
  console.info("[GKD-YDI] Donation pledge registered successfully:", {
    reference: record.reference,
    donor: record.donorDisplayName,
    amount: `${record.currency} ${record.amount}`,
    frequency: record.frequency,
    designation: record.designation,
    method: record.fulfillmentMethod,
    country: record.country,
  });

  return record;
}
