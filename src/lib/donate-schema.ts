import { z } from "zod";

export const donorTypes = ["individual", "organization", "foundation"] as const;
export type DonorType = (typeof donorTypes)[number];

export const frequencies = ["one-time", "monthly", "quarterly", "annual"] as const;
export type DonationFrequency = (typeof frequencies)[number];

export const fulfillmentMethods = [
  "bank-transfer",
  "wire-transfer",
  "cheque",
  "in-kind",
  "discuss-with-team",
] as const;
export type FulfillmentMethod = (typeof fulfillmentMethods)[number];

export const timelines = [
  "immediate",
  "this-week",
  "this-month",
  "specific-date",
  "ongoing",
] as const;
export type DonationTimeline = (typeof timelines)[number];

export const contactPreferences = ["email", "phone", "whatsapp"] as const;
export type ContactPreference = (typeof contactPreferences)[number];

export const donationPledgeSchema = z
  .object({
    donorType: z.enum(donorTypes).default("individual"),
    fullName: z.string().trim().max(120).optional().or(z.literal("")),
    organizationName: z.string().trim().max(160).optional().or(z.literal("")),
    roleOrTitle: z.string().trim().max(100).optional().or(z.literal("")),
    email: z.string().trim().email("Please enter a valid email address").max(160),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone or WhatsApp number")
      .max(32)
      .regex(/^[\d\s+()-]+$/, "Please use digits and phone characters only"),
    country: z.string().trim().min(2, "Please provide your country").max(100),
    stateOrCity: z.string().trim().max(100).optional().or(z.literal("")),
    preferredContact: z.enum(contactPreferences).default("email"),
    currency: z.enum(["NGN", "USD", "GBP", "EUR"]).default("USD"),
    amount: z.coerce.number().positive("Please enter a donation amount greater than zero"),
    frequency: z.enum(frequencies).default("one-time"),
    designation: z.string().trim().min(2, "Please choose a designation for your donation"),
    fulfillmentMethod: z.enum(fulfillmentMethods).default("bank-transfer"),
    timeline: z.enum(timelines).default("immediate"),
    notes: z.string().trim().max(2000).optional().or(z.literal("")),
    anonymous: z.boolean().default(false),
    requestTaxReceipt: z.boolean().default(true),
    subscribeNewsletter: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.anonymous && (!data.fullName || data.fullName.trim().length < 2)) {
        return false;
      }
      return true;
    },
    {
      message: "Please enter your full name or select the anonymous donation option",
      path: ["fullName"],
    },
  )
  .refine(
    (data) => {
      if (
        (data.donorType === "organization" || data.donorType === "foundation") &&
        (!data.organizationName || data.organizationName.trim().length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please provide the name of your organisation or foundation",
      path: ["organizationName"],
    },
  );

export type DonationPledgeInput = z.infer<typeof donationPledgeSchema>;
