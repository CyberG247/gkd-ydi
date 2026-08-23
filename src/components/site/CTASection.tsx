import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryTo?: "/" | "/donate" | "/contact" | "/get-involved" | "/our-focus" | "/impact";
  secondaryLabel?: string;
  secondaryTo?: "/" | "/donate" | "/contact" | "/get-involved" | "/our-focus" | "/impact";
};

export function CTASection({
  title,
  description,
  primaryLabel = "Donate",
  primaryTo = "/donate",
  secondaryLabel = "Get in Touch",
  secondaryTo = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-mist print:hidden">
      <div className="container-page py-16 md:py-20">
        <div className="radiant-field border border-border bg-white px-6 py-12 md:px-14 md:py-16 print:border-0">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="rule-accent block" aria-hidden="true" />
              <h2 className="text-display-lg mt-6 font-extrabold text-navy">{title}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild size="lg" variant="accent">
                <Link to={primaryTo}>{primaryLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={secondaryTo}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
