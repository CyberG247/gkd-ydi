import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FocusAreaCard } from "@/components/site/Cards";
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
        title="Four ways to move this work forward."
        description="Whether you bring time, expertise, funding or a platform, there is a practical way to contribute. Tell us how you would like to help and we will follow up directly."
        currentPath="/get-involved"
      />

      <section>
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {PATHWAYS.map((pathway, index) => (
              <Reveal key={pathway.title} delay={index * 60}>
                <FocusAreaCard
                  title={pathway.title}
                  description={pathway.description}
                  icon={pathway.icon}
                  accent={index % 2 === 0 ? "yellow" : "growth"}
                />
              </Reveal>
            ))}
          </div>
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
