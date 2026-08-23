import type { ContactInput } from "./contact-schema";

/**
 * In-memory rate limiter. Sufficient for a single-region deployment; move to a
 * shared store if the contact form is later backed by a database.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
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

/** Strips control characters so stored/forwarded content stays inert. */
function sanitize(value: string): string {
  let cleaned = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    cleaned += code <= 0x1f || code === 0x7f ? " " : char;
  }
  return cleaned.trim();
}

export async function recordEnquiry(input: ContactInput): Promise<void> {
  const safe = {
    fullName: sanitize(input.fullName),
    email: sanitize(input.email),
    phone: sanitize(input.phone),
    organization: sanitize(input.organization ?? ""),
    subject: sanitize(input.subject),
    messageLength: input.message.length,
    receivedAt: new Date().toISOString(),
  };

  // No database is connected yet: enquiries are logged server-side only.
  // Enabling Cloud storage later means persisting `safe` plus the message body.
  console.info("[GKD-YDI] contact enquiry received", safe);
}
