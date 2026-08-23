import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { contactSchema } from "./contact-schema";
import { isRateLimited, recordEnquiry } from "./contact.server";

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const key =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "anonymous";

    if (isRateLimited(key)) {
      throw new Error("Too many messages sent. Please try again in a minute.");
    }

    await recordEnquiry(data);
    return { ok: true as const };
  });
