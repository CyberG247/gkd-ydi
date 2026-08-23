import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PATHWAYS } from "@/components/site/content";

const TITLE = "Get Involved — Volunteer, Partner or Support GKD-YDI";
const DESCRIPTION =
  "Volunteer, partner, support or advocate with GKD-YDI to advance youth empowerment, leadership and WASH access across Northeast Nigeria.";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: GetInvolvedPage,
});

function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        crumbLabel="Get Involved"
        title="Four ways to move this work forward."
        description="Whether you bring time, expertise, funding or a platform, there is a practical way to contribute. Tell us how you would like to help and we will follow up directly."
        currentPath="/get-involved"
      />

      <section>
        <div className="container-page max-w-5xl py-16 md:py-24">
          <ol className="border-t border-border">
            {PATHWAYS.map((pathway, index) => (
              <li key={pathway.title} className="border-b border-border">
                <Link
                  to="/contact"
                  className="group -mx-3 grid gap-2 px-3 py-8 transition-colors duration-200 hover:bg-mist sm:-mx-4 sm:grid-cols-[2rem_1fr_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-muted-foreground/70 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-xl font-bold text-navy">{pathway.title}</span>
                    <span className="mt-1 block text-xs font-semibold tracking-[0.12em] text-growth uppercase">
                      {pathway.action}
                    </span>
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {pathway.description}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-5 shrink-0 text-navy/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-navy sm:block"
                  />
                </Link>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link to="/contact">Contact the team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/donate">Make a donation</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Next Step"
            title="Start with a conversation."
            description="Send us a short message describing your interest — volunteering, partnership, support or advocacy — and our team will respond with the relevant details."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link to="/contact">Contact the team</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/our-focus">See our focus areas</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
