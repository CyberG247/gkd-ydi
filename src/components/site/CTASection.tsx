import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-mist">
      <div className="container-page py-16 md:py-20">
        <div className="radiant-field border border-border bg-white px-6 py-12 md:px-14 md:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="rule-accent block" aria-hidden="true" />
              <h2 className="mt-6 text-3xl leading-tight font-extrabold text-navy sm:text-4xl">
                Building opportunity through youth empowerment.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Volunteers, partners and supporters make community-driven work possible. Tell us
                how you would like to contribute and we will follow up directly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild size="lg" variant="accent">
                <Link to="/get-involved">Get Involved</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
