import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/site/CTASection";
import { FocusAreaCard } from "@/components/site/Cards";
import { ImpactStats } from "@/components/site/ImpactStats";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { APPROACH, FOCUS_AREAS, MISSION } from "@/components/site/content";
import { ORG } from "@/components/site/site-nav";
import heroYouth from "@/assets/hero-youth.jpg";

const TITLE = "GKD-YDI — Empowering Youth, Building Futures in Northeast Nigeria";
const DESCRIPTION =
  "Gidan Karan Dawa Youth Development Initiatives equips young people in Northeast Nigeria with education, skills, leadership training and improved access to clean water and sanitation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="radiant-field relative overflow-hidden bg-navy text-white">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow text-yellow">{ORG.motto}</p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.5rem]">
              Youth-led development for a resilient Northeast Nigeria.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {ORG.short} works alongside communities in {ORG.state} to expand education, skills
              and leadership opportunities for young people — and to improve access to clean water,
              sanitation and hygiene.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link to="/get-involved">
                  Get Involved <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link to="/our-focus">Explore Our Focus</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroYouth}
              alt="Young people taking part in a community development programme in Northeast Nigeria"
              className="aspect-[4/3] w-full border border-white/15 object-cover"
              loading="eager"
            />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page py-14">
            <ImpactStats />
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Our Mission"
            title="Equipping a generation to lead its own transformation."
            description={MISSION}
          />
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="What We Do"
            title="Six areas where our work concentrates."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, index) => (
              <Reveal key={area.title} delay={index * 60}>
                <FocusAreaCard {...area} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="Our Approach" title="How we work with communities." />
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
