import { createFileRoute } from "@tanstack/react-router";

import { CTASection } from "@/components/site/CTASection";
import { FocusAreaCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FOCUS_AREAS } from "@/components/site/content";
import skills from "@/assets/skills-training.jpg";
import water from "@/assets/community-water.jpg";

const TITLE = "Our Focus Areas — Youth, Skills, Leadership and WASH | GKD-YDI";
const DESCRIPTION =
  "GKD-YDI focuses on youth empowerment, skills and education, leadership development, women and girls empowerment, water sanitation and hygiene, and community development.";

export const Route = createFileRoute("/our-focus")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FocusPage,
});

function FocusPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Focus"
        title="Where our work concentrates."
        description="Our programmes are organised around six connected areas, each designed to widen opportunity for young people and strengthen the communities they live in."
        currentPath="/our-focus"
      />

      <section>
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={index * 60}>
                <FocusAreaCard {...area} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={skills}
              alt="Young people learning practical vocational skills"
              className="w-full border border-border object-cover"
              loading="lazy"
            />
          </Reveal>
          <SectionHeader
            eyebrow="Skills & Livelihoods"
            title="Practical skills that lead to sustainable livelihoods."
            description="Education and skills development sit at the centre of our work, so that young people can translate training into real economic opportunity within their own communities."
          />
        </div>
      </section>

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Water, Sanitation & Hygiene"
            title="Improving access to clean water in 50 communities."
            description="Clean water, safe sanitation and good hygiene are foundations for health, school attendance and productivity. Our WASH ambition targets 50 communities."
          />
          <Reveal>
            <img
              src={water}
              alt="Community members collecting clean water"
              className="w-full border border-border object-cover lg:order-first"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
