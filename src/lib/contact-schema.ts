import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a reachable phone number")
    .max(32)
    .regex(/^[\d\s+()-]+$/, "Please use digits and phone characters only"),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Please add a subject").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters so we can respond properly")
    .max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
