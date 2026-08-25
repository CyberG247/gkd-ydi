import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileCheck,
  HeartHandshake,
  Loader2,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { cn } from "@/lib/utils";
import {
  CURRENCIES,
  DESIGNATIONS,
  DONOR_TYPES,
  FREQUENCIES,
  FULFILLMENT_METHODS,
  TIMELINES,
  formatAmount,
  impactPreview,
  type Currency,
} from "@/lib/donate";
import {
  donationPledgeSchema,
  type ContactPreference,
  type DonationFrequency,
  type DonationPledgeInput,
  type DonationTimeline,
  type DonorType,
  type FulfillmentMethod,
} from "@/lib/donate-schema";
import { submitDonationPledge } from "@/lib/donate.functions";
import type { DonationPledgeRecord } from "@/lib/donate.server";
import gkdEmblem from "@/assets/gkd-emblem.png";

const TITLE = "Donate & Pledge Support — GKD-YDI Youth Development";
const DESCRIPTION =
  "Complete the donation information form to pledge support for youth empowerment, education, skills, and WASH programmes in Northeast Nigeria. Our team will acknowledge and coordinate your contribution.";

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

function DonatePage() {
  const submitPledgeFn = useServerFn(submitDonationPledge);

  // Form State
  const [donorType, setDonorType] = useState<DonorType>("individual");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [amount, setAmount] = useState<string>("50");
  const [designation, setDesignation] = useState<string>(DESIGNATIONS[0].title);
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>("bank-transfer");
  const [timeline, setTimeline] = useState<DonationTimeline>("immediate");
  const [preferredContact, setPreferredContact] = useState<ContactPreference>("email");
  const [anonymous, setAnonymous] = useState(false);
  const [requestTaxReceipt, setRequestTaxReceipt] = useState(true);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmation result
  const [confirmedPledge, setConfirmedPledge] = useState<DonationPledgeRecord | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeCurrency = useMemo(
    () => CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[1]!,
    [currency],
  );
  const numericAmount = Number(amount);

  const onCurrencyChange = (code: Currency) => {
    setCurrency(code);
    const next = CURRENCIES.find((c) => c.code === code);
    if (next) setAmount(String(next.presets[1]));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const mutation = useMutation({
    mutationFn: (data: DonationPledgeInput) => submitPledgeFn({ data }),
    onSuccess: (result) => {
      setConfirmedPledge(result.record);
      setErrors({});
      window.scrollTo({ top: 300, behavior: "smooth" });
      toast.success("Donation pledge recorded successfully. Thank you for your support!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to submit your donation pledge. Please try again.");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = {
      donorType,
      fullName: String(formData.get("fullName") || "").trim(),
      organizationName: String(formData.get("organizationName") || "").trim(),
      roleOrTitle: String(formData.get("roleOrTitle") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      stateOrCity: String(formData.get("stateOrCity") || "").trim(),
      preferredContact,
      currency,
      amount: numericAmount,
      frequency,
      designation,
      fulfillmentMethod,
      timeline,
      notes: String(formData.get("notes") || "").trim(),
      anonymous,
      requestTaxReceipt,
      subscribeNewsletter,
    };

    const parsed = donationPledgeSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("Please review the highlighted fields in the form.");
      return;
    }

    setErrors({});
    mutation.mutate(parsed.data);
  };

  const impact = impactPreview(numericAmount, currency);

  return (
    <>
      <PageHero
        eyebrow="Donation & Pledge"
        crumbLabel="Donate"
        title="Pledge your support to empower youth across Northeast Nigeria."
        description="Complete the donation form below with your details, intended contribution amount, and preferred programme designation. You will receive an official pledge reference and our team will follow up directly to coordinate your contribution."
        currentPath="/donate"
      />

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.75fr]">
          <div className="border border-border bg-card p-6 md:p-10">
            {confirmedPledge ? (
              /* Success / Pledge Receipt View */
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-sm bg-growth/12 text-growth"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="size-8" strokeWidth={2} />
                  </span>
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-growth">
                      <Sparkles className="size-3.5" /> Pledge Registered Successfully
                    </span>
                    <h2 className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl">
                      Thank you, {confirmedPledge.donorDisplayName}.
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Your donation pledge has been formally recorded with the official GKD-YDI
                      secretariat. A confirmation summary has been logged for{" "}
                      <strong className="text-navy">{confirmedPledge.email}</strong>.
                    </p>
                  </div>
                </div>

                {/* Reference Code Banner */}
                <div className="flex flex-col items-start justify-between gap-3 border border-yellow/40 bg-yellow/10 p-4 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-navy/70">
                      Official Pledge Reference Code
                    </span>
                    <p className="text-xl font-mono font-bold tracking-wide text-navy">
                      {confirmedPledge.reference}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-card text-navy"
                    onClick={() => copyToClipboard(confirmedPledge.reference, "Reference Code")}
                  >
                    {copiedField === "Reference Code" ? (
                      <>
                        <Check className="size-4 text-growth" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" /> Copy Reference
                      </>
                    )}
                  </Button>
                </div>

                {/* Pledge Summary Details */}
                <div>
                  <h3 className="text-base font-bold text-navy">Pledge Summary</h3>
                  <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
                    {[
                      ["Donor Name", confirmedPledge.donorDisplayName],
                      ["Donor Type", confirmedPledge.donorType.toUpperCase()],
                      [
                        "Pledged Amount",
                        `${formatAmount(confirmedPledge.amount, confirmedPledge.currency as Currency)} ${confirmedPledge.currency}`,
                      ],
                      [
                        "Frequency",
                        confirmedPledge.frequency === "one-time"
                          ? "One-Time Pledge"
                          : confirmedPledge.frequency === "monthly"
                            ? "Monthly Sustaining Pledge"
                            : confirmedPledge.frequency === "quarterly"
                              ? "Quarterly Pledge"
                              : "Annual Major Gift Pledge",
                      ],
                      ["Designation", confirmedPledge.designation],
                      [
                        "Fulfillment Method",
                        FULFILLMENT_METHODS.find((m) => m.id === confirmedPledge.fulfillmentMethod)
                          ?.label ?? confirmedPledge.fulfillmentMethod,
                      ],
                      [
                        "Estimated Timeline",
                        TIMELINES.find((t) => t.id === confirmedPledge.timeline)?.label ??
                          confirmedPledge.timeline,
                      ],
                      ["Contact Email", confirmedPledge.email],
                      ["Contact Phone / WhatsApp", confirmedPledge.phone],
                      ["Country", confirmedPledge.country],
                      [
                        "Official Tax/Donation Receipt",
                        confirmedPledge.requestTaxReceipt ? "Requested" : "Not requested",
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 py-3">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-semibold text-navy">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Next Steps Card */}
                <div className="border border-border bg-mist/60 p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-ocean" />
                    <div>
                      <h4 className="font-bold text-navy">Next Steps & Coordination</h4>
                      <p className="text-xs text-muted-foreground">
                        How your donation pledge will be coordinated:
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">
                        1
                      </span>
                      <p>
                        <strong className="text-navy">Secretariat Review:</strong> Our administrative and
                        finance team will review your pledge details under reference{" "}
                        <span className="font-mono font-semibold text-navy">
                          {confirmedPledge.reference}
                        </span>
                        .
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">
                        2
                      </span>
                      <p>
                        <strong className="text-navy">Direct Communication:</strong> We will reach out via{" "}
                        <strong className="text-navy capitalize">
                          {confirmedPledge.preferredContact}
                        </strong>{" "}
                        ({confirmedPledge.email}) to coordinate the fulfillment of your contribution.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">
                        3
                      </span>
                      <p>
                        <strong className="text-navy">Formal Acknowledgment:</strong> Once fulfilled, an
                        official donation acknowledgment letter and receipt will be issued to you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Submission Buttons */}
                <div className="flex flex-wrap gap-3 pt-2 print:hidden">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => window.print()}
                    className="flex items-center gap-2"
                  >
                    <Printer className="size-4" /> Print / Save Summary
                  </Button>
                  <Button
                    type="button"
                    variant="accent"
                    size="lg"
                    onClick={() => {
                      setConfirmedPledge(null);
                      setErrors({});
                    }}
                  >
                    Submit Another Pledge
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/impact">See Our Impact</Link>
                  </Button>
                </div>
              </div>
            ) : (
              /* Donation Information & Pledge Form */
              <form onSubmit={onSubmit} noValidate className="space-y-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-growth">
                    <HeartHandshake className="size-3.5" /> Donation Information & Pledge
                  </span>
                  <h2 className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl">
                    Make a Donation Pledge
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Please provide your details, the amount you wish to contribute, and your preferred
                    giving arrangements. Our team will acknowledge your pledge and follow up directly.
                  </p>
                </div>

                {/* 1. Donor Profile */}
                <div className="space-y-6 border-t border-border pt-8">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      1
                    </span>
                    <h3 className="text-base font-bold text-navy">Donor Profile</h3>
                  </div>

                  {/* Donor Type */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      I am pledging as
                    </Label>
                    <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {DONOR_TYPES.map((dt) => (
                        <button
                          key={dt.id}
                          type="button"
                          aria-pressed={donorType === dt.id}
                          onClick={() => setDonorType(dt.id)}
                          className={cn(
                            "flex flex-col items-start border p-3 text-left transition-colors",
                            donorType === dt.id
                              ? "border-navy bg-navy text-navy-foreground"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          <span className="flex items-center gap-2 text-sm font-bold">
                            {dt.id === "individual" ? (
                              <User className="size-4 shrink-0" />
                            ) : dt.id === "organization" ? (
                              <Building2 className="size-4 shrink-0" />
                            ) : (
                              <Users className="size-4 shrink-0" />
                            )}
                            {dt.label}
                          </span>
                          <span
                            className={cn(
                              "mt-1 text-[11px]",
                              donorType === dt.id ? "opacity-80" : "text-muted-foreground",
                            )}
                          >
                            {dt.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name fields */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    {(donorType === "organization" || donorType === "foundation") && (
                      <div className="sm:col-span-2">
                        <Label htmlFor="organizationName">
                          {donorType === "organization" ? "Company / Organisation Name" : "Foundation Name"} *
                        </Label>
                        <Input
                          id="organizationName"
                          name="organizationName"
                          type="text"
                          placeholder={
                            donorType === "organization"
                              ? "e.g. Apex Global Solutions Ltd"
                              : "e.g. Hope Horizon Foundation"
                          }
                          aria-invalid={Boolean(errors.organizationName)}
                          aria-describedby={errors.organizationName ? "org-error" : undefined}
                          className="mt-2"
                        />
                        {errors.organizationName && (
                          <p id="org-error" className="mt-1.5 text-xs text-destructive">
                            {errors.organizationName}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="fullName">
                        {donorType === "individual" ? "Full Name" : "Contact Person Name"}
                        {anonymous ? " (Optional)" : " *"}
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="e.g. Ibrahim Abubakar"
                        disabled={anonymous}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        className="mt-2"
                      />
                      {errors.fullName && !anonymous && (
                        <p id="fullName-error" className="mt-1.5 text-xs text-destructive">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="roleOrTitle">
                        {donorType === "individual" ? "Occupation / Title (optional)" : "Designation / Role in Organisation"}
                      </Label>
                      <Input
                        id="roleOrTitle"
                        name="roleOrTitle"
                        type="text"
                        placeholder="e.g. CSR Director, Consultant, etc."
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="flex items-start gap-3 rounded border border-border bg-mist/50 p-3.5">
                    <Checkbox
                      id="anonymous"
                      checked={anonymous}
                      onCheckedChange={(v) => setAnonymous(v === true)}
                    />
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="anonymous"
                        className="text-sm font-semibold text-navy cursor-pointer"
                      >
                        Keep my donation pledge anonymous
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Your name will not be published in annual reports, donor listings, or social
                        channels.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Contact Details */}
                <div className="space-y-6 border-t border-border pt-8">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      2
                    </span>
                    <h3 className="text-base font-bold text-navy">Contact Details</h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="ibrahim@example.com"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="mt-2"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number / WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+234 803 000 0000"
                        required
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className="mt-2"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-destructive">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="country">Country of Residence / Operation *</Label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        defaultValue="Nigeria"
                        placeholder="e.g. Nigeria, United Kingdom, USA"
                        required
                        aria-invalid={Boolean(errors.country)}
                        aria-describedby={errors.country ? "country-error" : undefined}
                        className="mt-2"
                      />
                      {errors.country && (
                        <p id="country-error" className="mt-1.5 text-xs text-destructive">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="stateOrCity">State / City (optional)</Label>
                      <Input
                        id="stateOrCity"
                        name="stateOrCity"
                        type="text"
                        placeholder="e.g. Damaturu, Abuja, London"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Preferred contact channel */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Preferred Communication Channel
                    </Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { id: "email" as ContactPreference, label: "Email", icon: Mail },
                        { id: "phone" as ContactPreference, label: "Phone Call", icon: Phone },
                        { id: "whatsapp" as ContactPreference, label: "WhatsApp", icon: Sparkles },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={preferredContact === item.id}
                          onClick={() => setPreferredContact(item.id)}
                          className={cn(
                            "flex items-center justify-center gap-2 border py-2.5 text-xs font-semibold transition-colors",
                            preferredContact === item.id
                              ? "border-navy bg-navy text-navy-foreground"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          <item.icon className="size-3.5" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Donation Amount & Focus */}
                <div className="space-y-6 border-t border-border pt-8">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      3
                    </span>
                    <h3 className="text-base font-bold text-navy">Donation Amount & Designation</h3>
                  </div>

                  {/* Currency */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Select Currency
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          aria-pressed={currency === c.code}
                          onClick={() => onCurrencyChange(c.code)}
                          className={cn(
                            "border px-3 py-2.5 text-center text-sm font-bold transition-colors",
                            currency === c.code
                              ? "border-navy bg-navy text-navy-foreground"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          {c.symbol} {c.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Donation Frequency
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {FREQUENCIES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={frequency === f.id}
                          onClick={() => setFrequency(f.id)}
                          className={cn(
                            "flex flex-col items-center justify-center border p-2.5 text-center transition-colors",
                            frequency === f.id
                              ? "border-navy bg-navy text-navy-foreground"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          <span className="text-xs font-bold">{f.label}</span>
                          <span
                            className={cn(
                              "text-[10px]",
                              frequency === f.id ? "opacity-75" : "text-muted-foreground",
                            )}
                          >
                            {f.badge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Presets & Custom */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Amount to Pledge ({activeCurrency.code})
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {activeCurrency.presets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          aria-pressed={amount === String(preset)}
                          onClick={() => setAmount(String(preset))}
                          className={cn(
                            "border py-3 text-center text-sm font-bold tabular-nums transition-colors",
                            amount === String(preset)
                              ? "border-yellow bg-yellow/20 text-navy font-extrabold ring-1 ring-yellow"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          {formatAmount(preset, currency)}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3">
                      <Label htmlFor="customAmount" className="text-xs text-muted-foreground">
                        Or enter custom pledge amount ({activeCurrency.code})
                      </Label>
                      <div className="mt-1 flex items-center border border-border bg-background focus-within:border-navy">
                        <span className="px-3.5 text-sm font-bold text-navy" aria-hidden="true">
                          {activeCurrency.symbol}
                        </span>
                        <input
                          id="customAmount"
                          name="amount"
                          type="number"
                          min="1"
                          step="any"
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="e.g. 100"
                          className="h-11 w-full bg-transparent pr-3 text-base font-bold text-navy outline-none tabular-nums"
                        />
                      </div>
                      {errors.amount && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.amount}</p>
                      )}
                    </div>

                    {impact ? (
                      <div className="mt-3 flex items-start gap-2 rounded bg-growth/10 p-3 text-xs leading-relaxed text-growth">
                        <BadgeCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        <span>
                          <strong className="font-semibold">Impact Projection:</strong> {impact}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Designation */}
                  <div>
                    <Label htmlFor="designation" className="text-xs font-bold uppercase tracking-wider text-navy">
                      Designate My Donation To
                    </Label>
                    <select
                      id="designation"
                      name="designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="mt-2 h-12 w-full border border-border bg-background px-3 text-sm font-medium text-navy outline-none focus:border-navy"
                    >
                      {DESIGNATIONS.map((d) => (
                        <option key={d.title} value={d.title}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {DESIGNATIONS.find((d) => d.title === designation)?.description}
                    </p>
                  </div>
                </div>

                {/* 4. Fulfillment Method & Timeline */}
                <div className="space-y-6 border-t border-border pt-8">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      4
                    </span>
                    <h3 className="text-base font-bold text-navy">Fulfillment Method & Timeline</h3>
                  </div>

                  {/* Fulfillment Method */}
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-navy">
                      How will you fulfill your contribution?
                    </Label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {FULFILLMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          aria-pressed={fulfillmentMethod === method.id}
                          onClick={() => setFulfillmentMethod(method.id)}
                          className={cn(
                            "flex flex-col items-start border p-3.5 text-left transition-colors",
                            fulfillmentMethod === method.id
                              ? "border-navy bg-navy text-navy-foreground"
                              : "border-border bg-card text-navy hover:border-navy/40",
                          )}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className="text-sm font-bold">{method.label}</span>
                            <span
                              className={cn(
                                "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                fulfillmentMethod === method.id
                                  ? "bg-white/20 text-white"
                                  : "bg-mist text-navy/70",
                              )}
                            >
                              {method.badge}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "mt-1 text-xs leading-relaxed",
                              fulfillmentMethod === method.id ? "opacity-80" : "text-muted-foreground",
                            )}
                          >
                            {method.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expected Timeline */}
                  <div>
                    <Label htmlFor="timeline" className="text-xs font-bold uppercase tracking-wider text-navy">
                      Expected Timeline of Fulfillment
                    </Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value as DonationTimeline)}
                      className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm font-medium text-navy outline-none focus:border-navy"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Personal Note & Preferences */}
                <div className="space-y-6 border-t border-border pt-8">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      5
                    </span>
                    <h3 className="text-base font-bold text-navy">Special Note & Preferences</h3>
                  </div>

                  <div>
                    <Label htmlFor="notes">
                      Personal Dedication, Special Instructions, or Note to the Team (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="e.g. In memory of a loved one, specific project interests, or physical equipment specifications..."
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="taxReceipt"
                        checked={requestTaxReceipt}
                        onCheckedChange={(v) => setRequestTaxReceipt(v === true)}
                      />
                      <Label htmlFor="taxReceipt" className="text-xs sm:text-sm font-medium leading-relaxed text-navy cursor-pointer">
                        I request an official GKD-YDI Non-Profit Donation Acknowledgment Letter / Receipt.
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="newsletter"
                        checked={subscribeNewsletter}
                        onCheckedChange={(v) => setSubscribeNewsletter(v === true)}
                      />
                      <Label htmlFor="newsletter" className="text-xs sm:text-sm font-medium leading-relaxed text-navy cursor-pointer">
                        Subscribe me to GKD-YDI's quarterly community impact updates and reports.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* 6. Pledge Summary & Submit Action */}
                <div className="border-t border-border pt-8">
                  <div className="rounded border border-navy/20 bg-navy/5 p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Pledge Total</span>
                      <span className="text-2xl font-extrabold text-navy tabular-nums sm:text-3xl">
                        {Number.isFinite(numericAmount) && numericAmount > 0
                          ? formatAmount(numericAmount, currency)
                          : formatAmount(0, currency)}{" "}
                        <span className="text-sm font-bold text-muted-foreground">
                          {currency}
                          {frequency !== "one-time" ? ` / ${frequency}` : ""}
                        </span>
                      </span>
                    </div>
                    <div className="mt-3 border-t border-navy/10 pt-3 text-xs text-navy/80 space-y-1">
                      <p>
                        <span className="font-semibold">Designated To:</span> {designation}
                      </p>
                      <p>
                        <span className="font-semibold">Fulfillment Method:</span>{" "}
                        {FULFILLMENT_METHODS.find((m) => m.id === fulfillmentMethod)?.label}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="accent"
                    className="mt-6 w-full text-base font-bold shadow-md"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                        Recording Donation Pledge…
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="size-5" aria-hidden="true" />
                        Submit Donation Pledge{" "}
                        {Number.isFinite(numericAmount) && numericAmount > 0
                          ? `(${formatAmount(numericAmount, currency)})`
                          : ""}
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                    Direct Non-Profit Support — 100% of your pledge goes directly to verified community
                    programmes across Northeast Nigeria.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column / Sidebar */}
          <aside className="space-y-8 print:hidden">
            {/* Direct Community Impact Card */}
            <div className="border-t-4 border-yellow border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src={gkdEmblem}
                  alt="GKD-YDI Official Emblem"
                  className="size-11 shrink-0 object-contain"
                />
                <div>
                  <h3 className="text-base font-bold text-navy">Direct Community Impact</h3>
                  <p className="text-[11px] font-semibold text-growth">
                    Verified Non-Profit Organisation
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Gidan Karan Dawa Youth Development Initiatives (GKD-YDI) is committed to transparent,
                impact-driven youth and community development in Yobe State and Northeast Nigeria.
              </p>

              <div className="mt-5 space-y-3 text-xs">
                <div className="rounded border border-border bg-mist/40 p-3">
                  <span className="font-semibold text-navy">Education & Skills First</span>
                  <p className="mt-0.5 text-muted-foreground">
                    Direct funding for student learning packs, vocational kits, and digital skills workshops.
                  </p>
                </div>

                <div className="rounded border border-border bg-mist/40 p-3">
                  <span className="font-semibold text-navy">Clean Water & WASH</span>
                  <p className="mt-0.5 text-muted-foreground">
                    Rehabilitating vital community water points and promoting hygiene in vulnerable areas.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Pledge With Confidence */}
            <div className="border border-border bg-card p-6">
              <h3 className="text-base font-bold text-navy">Why Pledge With Confidence</h3>
              <ul className="mt-5 space-y-4 text-xs sm:text-sm">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Direct Programme Delivery",
                    text: "Every contribution directly funds education, vocational tools, and clean water points in Yobe State communities.",
                  },
                  {
                    icon: FileCheck,
                    title: "Transparent Acknowledgment",
                    text: "Every pledge receives an official tracking reference and formal receipt documentation for your records.",
                  },
                  {
                    icon: Banknote,
                    title: "Local & International Support",
                    text: "We support contributions in NGN, USD, GBP, and EUR with full institutional compliance.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <item.icon className="mt-0.5 size-5 shrink-0 text-growth" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-navy">{item.title}</p>
                      <p className="mt-1 text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate & Bespoke Support */}
            <div className="border border-border bg-mist p-6">
              <h3 className="text-base font-bold text-navy">Large Gifts & Institutional Support</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Corporations, grant-making foundations, and diaspora associations seeking tailored
                partnerships or MoUs can speak directly with our executive leadership.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact Executive Team</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Additional Ways to Support */}
      <section className="bg-mist print:hidden">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Other Ways to Help"
            title="Support comes in many meaningful forms."
            description="Volunteering your skills, partnering on community projects, and spreading the word are equally transformative to our mission."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link to="/get-involved">Explore All Ways to Get Involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/our-focus">Explore Our Focus Areas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
