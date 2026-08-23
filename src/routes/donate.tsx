import { Link, createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";
import {
  CURRENCIES,
  DESIGNATIONS,
  OFFICIAL_ACCOUNT,
  PAYMENT_METHODS,
  PROCESSING_LABEL,
  formatAmount,
  impactPreview,
  makeReference,
  type Currency,
  type DonationFrequency,
  type PaymentMethod,
} from "@/lib/donate";

const TITLE = "Donate to GKD-YDI — Support Youth Empowerment in Nigeria";
const DESCRIPTION =
  "Make a secure donation of any amount to the official GKD-YDI account. Supporters worldwide can give once or monthly to fund education, skills, leadership and WASH programmes.";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DonatePage,
});

type Status = "form" | "processing" | "success";

function DonatePage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [amount, setAmount] = useState<string>("50");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [designation, setDesignation] = useState<string>(DESIGNATIONS[0]);
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<Status>("form");
  const [receipt, setReceipt] = useState<{
    reference: string;
    amount: number;
    currency: Currency;
    frequency: DonationFrequency;
    method: PaymentMethod;
    designation: string;
    name: string;
    email: string;
  } | null>(null);

  const active = useMemo(
    () => CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[1]!,
    [currency],
  );
  const numericAmount = Number(amount);

  const onCurrencyChange = (code: Currency) => {
    setCurrency(code);
    const next = CURRENCIES.find((c) => c.code === code);
    if (next) setAmount(String(next.presets[1]));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a donation amount greater than zero.");
      return;
    }
    if (!anonymous && !values["fullName"]?.trim()) {
      toast.error("Please enter your name, or choose to give anonymously.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values["email"] ?? "")) {
      toast.error("Please enter a valid email address for your receipt.");
      return;
    }

    setStatus("processing");
    window.setTimeout(() => {
      setReceipt({
        reference: makeReference(),
        amount: numericAmount,
        currency,
        frequency,
        method,
        designation,
        name: anonymous ? "Anonymous supporter" : values["fullName"]!.trim(),
        email: values["email"]!.trim(),
      });
      setStatus("success");
      toast.success("Donation confirmed. Thank you for supporting GKD-YDI.");
    }, 1900);
  };

  const impact = impactPreview(numericAmount, currency);

  return (
    <>
      <PageHero
        eyebrow="Donate"
        crumbLabel="Donate"
        title="Give directly to GKD-YDI, from anywhere in the world."
        description="Every contribution funds education, skills training, youth leadership and clean water access in Northeast Nigeria. Choose your currency, give any amount, once or monthly."
        currentPath="/donate"
      />

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.72fr]">
          <div className="border border-border bg-card p-6 md:p-8">
            {status === "success" && receipt ? (
              <div>
                <span
                  className="grid size-14 place-items-center rounded-sm bg-growth/12 text-growth"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="size-7" strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold text-navy">
                  Thank you, {receipt.name}.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your {receipt.frequency === "monthly" ? "monthly" : "one-time"} donation of{" "}
                  <strong className="text-navy">
                    {formatAmount(receipt.amount, receipt.currency)}
                  </strong>{" "}
                  has been recorded against the official GKD-YDI account. A receipt has been issued
                  to {receipt.email}.
                </p>

                <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                  {[
                    ["Reference", receipt.reference],
                    [
                      "Amount",
                      `${formatAmount(receipt.amount, receipt.currency)} ${receipt.currency}`,
                    ],
                    ["Frequency", receipt.frequency === "monthly" ? "Monthly" : "One-time"],
                    [
                      "Payment method",
                      PAYMENT_METHODS.find((pm) => pm.id === receipt.method)!.label,
                    ],
                    ["Designation", receipt.designation],
                    ["Beneficiary", OFFICIAL_ACCOUNT.accountName],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 py-3.5">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right font-semibold text-navy">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
                  <Button
                    size="lg"
                    variant="accent"
                    onClick={() => {
                      setStatus("form");
                      setReceipt(null);
                    }}
                  >
                    Make another donation
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/impact">See our impact goals</Link>
                  </Button>
                </div>

                <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                  This is a demonstration checkout. No funds have been transferred and no card
                  details are collected or stored. Live payment processing will be enabled once the
                  organisation&apos;s payment provider is connected.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-xl font-bold text-navy">Your donation</h2>

                <fieldset className="mt-7">
                  <legend className="text-sm font-semibold text-navy">Currency</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        aria-pressed={currency === c.code}
                        onClick={() => onCurrencyChange(c.code)}
                        className={cn(
                          "border px-3 py-3 text-sm font-semibold transition-colors",
                          currency === c.code
                            ? "border-navy bg-navy text-navy-foreground"
                            : "border-border text-navy/75 hover:border-navy/40",
                        )}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="text-sm font-semibold text-navy">Frequency</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(["one-time", "monthly"] as DonationFrequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={frequency === f}
                        onClick={() => setFrequency(f)}
                        className={cn(
                          "border px-3 py-3 text-sm font-semibold transition-colors",
                          frequency === f
                            ? "border-navy bg-navy text-navy-foreground"
                            : "border-border text-navy/75 hover:border-navy/40",
                        )}
                      >
                        {f === "one-time" ? "One-time gift" : "Monthly giving"}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="text-sm font-semibold text-navy">Payment method</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        aria-pressed={method === pm.id}
                        onClick={() => setMethod(pm.id)}
                        className={cn(
                          "flex items-start gap-3 border px-3 py-3 text-left transition-colors",
                          method === pm.id
                            ? "border-navy bg-navy text-navy-foreground"
                            : "border-border text-navy/75 hover:border-navy/40",
                        )}
                      >
                        {pm.id === "card" ? (
                          <CreditCard className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        ) : pm.id === "transfer" ? (
                          <Landmark className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        ) : pm.id === "ussd" ? (
                          <Smartphone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <Wallet className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        )}
                        <span>
                          <span className="block text-sm font-semibold">{pm.label}</span>
                          <span
                            className={cn(
                              "mt-0.5 block text-xs",
                              method === pm.id ? "opacity-80" : "text-muted-foreground",
                            )}
                          >
                            {pm.hint}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-7">
                  <legend className="text-sm font-semibold text-navy">Amount</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {active.presets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        aria-pressed={amount === String(preset)}
                        onClick={() => setAmount(String(preset))}
                        className={cn(
                          "border px-3 py-3 text-sm font-semibold tabular-nums transition-colors",
                          amount === String(preset)
                            ? "border-yellow bg-yellow/15 text-navy"
                            : "border-border text-navy/75 hover:border-navy/40",
                        )}
                      >
                        {formatAmount(preset, currency)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="amount">Or enter any amount ({active.code})</Label>
                    <div className="mt-2 flex items-center border border-border bg-background focus-within:border-navy">
                      <span
                        className="px-3 text-sm font-semibold text-muted-foreground"
                        aria-hidden="true"
                      >
                        {active.symbol}
                      </span>
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        min="1"
                        step="any"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 w-full bg-transparent pr-3 text-base font-semibold text-navy outline-none tabular-nums"
                      />
                    </div>
                    {impact ? (
                      <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-growth">
                        <BadgeCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                        <span>{impact}</span>
                      </p>
                    ) : null}
                  </div>
                </fieldset>

                <div className="mt-7">
                  <Label htmlFor="designation">Direct my gift to</Label>
                  <select
                    id="designation"
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="mt-2 h-12 w-full border border-border bg-background px-3 text-sm text-navy outline-none focus:border-navy"
                  >
                    {DESIGNATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <h3 className="mt-9 text-sm font-semibold text-navy">Your details</h3>
                <div className="mt-3 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full name{anonymous ? " (optional)" : ""}</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      disabled={anonymous}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="organizationName">Organisation (optional)</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      autoComplete="organization"
                      className="mt-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="country">Country (optional)</Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      autoComplete="country-name"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <Checkbox
                    id="anonymous"
                    checked={anonymous}
                    onCheckedChange={(v) => setAnonymous(v === true)}
                  />
                  <Label htmlFor="anonymous" className="text-sm leading-relaxed font-normal">
                    Give anonymously — my name will not appear in any supporter listing.
                  </Label>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm text-muted-foreground">Total today</span>
                    <span className="text-2xl font-extrabold text-navy tabular-nums">
                      {Number.isFinite(numericAmount) && numericAmount > 0
                        ? formatAmount(numericAmount, currency)
                        : formatAmount(0, currency)}{" "}
                      <span className="text-sm font-semibold text-muted-foreground">
                        {currency}
                        {frequency === "monthly" ? " / month" : ""}
                      </span>
                    </span>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    variant="accent"
                    className="mt-6 w-full"
                    disabled={status === "processing"}
                  >
                    {status === "processing" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />{" "}
                        {PROCESSING_LABEL[method]}…
                      </>
                    ) : (
                      <>
                        <Lock className="size-4" aria-hidden="true" /> Donate{" "}
                        {Number.isFinite(numericAmount) && numericAmount > 0
                          ? formatAmount(numericAmount, currency)
                          : ""}
                      </>
                    )}
                  </Button>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Demonstration checkout — no card details are requested and no money moves. Once
                    the organisation connects its payment provider, this same flow will process live
                    card, transfer and mobile payments.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-10 print:hidden">
            <div className="border-t-2 border-yellow pt-5">
              <h2 className="text-base font-bold text-navy">Official account</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Donations are received directly by the organisation. Bank transfers can be sent to:
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Landmark className="mt-0.5 size-5 shrink-0 text-ocean" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-navy">Account name</dt>
                    <dd className="mt-1 text-muted-foreground">{OFFICIAL_ACCOUNT.accountName}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Banknote className="mt-0.5 size-5 shrink-0 text-ocean" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-navy">Bank / account number</dt>
                    <dd className="mt-1 text-muted-foreground tabular-nums">
                      {OFFICIAL_ACCOUNT.bank} — {OFFICIAL_ACCOUNT.accountNumber}
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {OFFICIAL_ACCOUNT.note}
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-navy">Why give with confidence</h2>
              <ul className="mt-5 space-y-5 text-sm">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Funds go to programmes",
                    text: "Gifts support education, skills, leadership and WASH work in Yobe State communities.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Accountable reporting",
                    text: "Every donation carries a reference number so it can be traced and acknowledged.",
                  },
                  {
                    icon: CreditCard,
                    title: "Give in your currency",
                    text: "Supporters worldwide can give in NGN, USD, GBP or EUR, once or monthly.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <item.icon className="mt-0.5 size-5 shrink-0 text-growth" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-navy">{item.title}</p>
                      <p className="mt-1 text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-mist p-6">
              <h2 className="text-base font-bold text-navy">Prefer to talk first?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Organisations planning larger or multi-year support can speak with our team about
                designation and reporting.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/contact">Contact the team</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-mist print:hidden">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Other ways to help"
            title="Support does not have to be financial."
            description="Volunteering, partnership and advocacy are just as vital to community-driven work. Explore the pathways that fit you."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="outline">
              <Link to="/get-involved">See all ways to get involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/our-focus">Explore our focus areas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
