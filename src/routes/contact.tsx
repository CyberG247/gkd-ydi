import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { ORG } from "@/components/site/site-nav";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitEnquiry } from "@/lib/contact.functions";

const TITLE = "Contact GKD-YDI — Get in Touch";
const DESCRIPTION =
  "Contact Gidan Karan Dawa Youth Development Initiatives in Damaturu, Yobe State about volunteering, partnerships, support or programme information.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email address", type: "email", required: true },
  { name: "phone", label: "Phone number", type: "tel", required: true },
  { name: "organization", label: "Organisation (optional)", type: "text", required: false },
  { name: "subject", label: "Subject", type: "text", required: true },
] as const;

function ContactPage() {
  const send = useServerFn(submitEnquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: ContactInput) => send({ data }),
    onSuccess: () => {
      toast.success("Message sent. Our team will be in touch shortly.");
      setErrors({});
    },
    onError: (error: Error) => {
      toast.error(error.message || "We couldn't send your message. Please try again.");
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setErrors({});
    mutation.mutate(parsed.data, { onSuccess: () => form.reset() });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with our team."
        description="Send us a message about volunteering, partnerships, support or programme information and we will respond directly."
        currentPath="/contact"
      />

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.7fr]">
          <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-navy">Send an enquiry</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "subject" ? "sm:col-span-2" : undefined}
                >
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    className="mt-2"
                  />
                  {errors[field.name] ? (
                    <p id={`${field.name}-error`} className="mt-2 text-sm text-destructive">
                      {errors[field.name]}
                    </p>
                  ) : null}
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  aria-invalid={Boolean(errors["message"])}
                  aria-describedby={errors["message"] ? "message-error" : undefined}
                  className="mt-2"
                />
                {errors["message"] ? (
                  <p id="message-error" className="mt-2 text-sm text-destructive">
                    {errors["message"]}
                  </p>
                ) : null}
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              variant="accent"
              className="mt-7"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending…" : "Send message"}
            </Button>
          </form>

          <aside className="space-y-8">
            <div className="border-t-2 border-yellow pt-5">
              <h2 className="text-base font-bold text-navy">Organisation</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ORG.name}</p>
            </div>
            <dl className="space-y-6 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-ocean" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-navy">Location</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {ORG.city}, {ORG.state}, Nigeria
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-ocean" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-navy">Response time</dt>
                  <dd className="mt-1 text-muted-foreground">Usually within 3 working days</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-ocean" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-navy">Enquiries</dt>
                  <dd className="mt-1 text-muted-foreground">
                    Use the form and we will reply by email.
                  </dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
