import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/site/CTASection";
import { EmptyState } from "@/components/site/Cards";
import { ImpactStats } from "@/components/site/ImpactStats";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";

const TITLE = "Our Impact Goals by 2030 | GKD-YDI";
const DESCRIPTION =
  "GKD-YDI's measurable commitments: empower 10,000 youth including 5,000 young women, and improve water, sanitation and hygiene access in 50 communities by 2030.";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Clear commitments, honestly reported."
        description="The figures below are our stated targets, not results achieved. As programmes are delivered we will publish verified outcomes alongside them."
        currentPath="/impact"
      />

      <section className="bg-navy">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow text-yellow">Stated targets</p>
          <ImpactStats className="mt-8" />
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Accountability"
            title="Reporting results as they are verified."
            description="GKD-YDI was founded recently, so we publish targets now and outcome data once it has been collected and verified with the communities we work with."
          />
          <div className="mt-12">
            <EmptyState
              icon={BarChart3}
              title="Programme results not yet published"
              description="We will not publish figures we cannot substantiate. Verified programme results and annual reports will appear here as they become available."
            >
              <Button asChild variant="accent">
                <Link to="/contact">Request programme information</Link>
              </Button>
            </EmptyState>
          </div>
        </div>
      </section>

      <CTASection
        title="Help turn these targets into results."
        description="Donations, partnerships and volunteers each play a part in reaching our 2030 commitments."
      />
    </>
  );
}
