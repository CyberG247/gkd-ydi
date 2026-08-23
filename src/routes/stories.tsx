import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/site/CTASection";
import { EmptyState } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";

const TITLE = "Stories & Updates from GKD-YDI";
const DESCRIPTION =
  "News, field updates and youth stories from Gidan Karan Dawa Youth Development Initiatives across Northeast Nigeria.";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Field updates and youth voices."
        description="This is where we will share programme updates and the experiences of the young people and communities we work with — in their own words."
        currentPath="/stories"
      />

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Coming Soon"
            title="Our first stories are being prepared."
            description="We publish stories only with the consent of the people involved, so this space will fill as programmes are delivered."
          />
          <div className="mt-12">
            <EmptyState
              icon={BookOpen}
              title="No stories published yet"
              description="Reach out if you would like to be notified when new updates and field reports are published."
            >
              <Button asChild variant="accent">
                <Link to="/contact">Keep me updated</Link>
              </Button>
            </EmptyState>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
