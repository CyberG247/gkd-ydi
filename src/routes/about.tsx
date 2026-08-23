import { createFileRoute } from "@tanstack/react-router";

import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ValueCard } from "@/components/site/Cards";
import { APPROACH, CORE_VALUES, MISSION, VISION } from "@/components/site/content";
import { ORG } from "@/components/site/site-nav";
import leadership from "@/assets/leadership.jpg";

const TITLE = "About GKD-YDI — Mission, Vision and Values";
const DESCRIPTION =
  "Learn about Gidan Karan Dawa Youth Development Initiatives: our mission, vision, core values and community-driven approach to youth development in Northeast Nigeria.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="A youth development initiative rooted in Northeast Nigeria."
        description={`${ORG.name} (${ORG.short}) was founded on ${ORG.founded} and works from ${ORG.city}, ${ORG.state}, across ${ORG.region}.`}
        currentPath="/about"
      />

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="space-y-12">
            <div>
              <SectionHeader eyebrow="Mission" title="Our mission" description={MISSION} />
            </div>
            <div>
              <SectionHeader eyebrow="Vision" title="Our vision" description={VISION} />
            </div>
          </div>
          <Reveal>
            <img
              src={leadership}
              alt="Young leaders in a community training session"
              className="w-full border border-border object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="Core Values" title="The principles that guide our work." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="Our Approach" title="How we deliver." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((item) => (
              <div key={item.title} className="border-t-2 border-border pt-5">
                <h3 className="text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
