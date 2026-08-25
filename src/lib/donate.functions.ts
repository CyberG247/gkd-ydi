import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { donationPledgeSchema } from "./donate-schema";
import {
  generatePledgeReference,
  isDonationRateLimited,
  recordDonationPledge,
} from "./donate.server";

export const submitDonationPledge = createServerFn({ method: "POST" })
  .validator((data: unknown) => donationPledgeSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const key =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "anonymous";

    if (isDonationRateLimited(key)) {
      throw new Error("Too many pledge submissions from your address. Please wait a moment.");
    }

    const reference = generatePledgeReference();
    const record = await recordDonationPledge(data, reference);

    return {
      ok: true as const,
      record,
    };
  });
