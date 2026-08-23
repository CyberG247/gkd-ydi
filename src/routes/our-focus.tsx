import { createFileRoute } from "@tanstack/react-router";

import { CTASection } from "@/components/site/CTASection";
import { FocusAreaCard } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FOCUS_AREAS } from "@/components/site/content";
import { LazyImage } from "@/components/site/LazyImage";
import skills from "@/assets/skills-training.jpg";
import water from "@/assets/community-water.jpg";
import sdgGoalsImg from "@/assets/sdg-goals-transparent.png";

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
  const [featureArea, ...supportingAreas] = FOCUS_AREAS;

  if (!featureArea) return null;

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
          <Reveal animation="fade-up">
            <article className="grid gap-6 border-t-2 border-yellow pt-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <span
                aria-hidden="true"
                className="text-display-lg font-extrabold text-navy/10 tabular-nums"
              >
                01
              </span>
              <div className="max-w-2xl">
                <h2 className="flex items-center gap-3 text-2xl font-extrabold text-navy">
                  <featureArea.icon
                    className="size-6 shrink-0 text-ocean"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {featureArea.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featureArea.description}
                </p>
              </div>
            </article>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportingAreas.map((area, index) => (
              <Reveal key={area.title} animation="fade-up" delay={(index + 1) * 80}>
                <FocusAreaCard {...area} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal animation="fade-right">
            <div className="overflow-hidden border border-border shadow-md">
              <LazyImage
                src={skills}
                alt="Young people learning practical vocational skills"
                aspectRatio="4/3"
                zoomOnHover
              />
            </div>
          </Reveal>
          <Reveal animation="fade-left" delay={100}>
            <SectionHeader
              eyebrow="Skills & Livelihoods"
              title="Practical skills that lead to sustainable livelihoods."
              description="Education and skills development sit at the centre of our work, so that young people can translate training into real economic opportunity within their own communities."
            />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <Reveal animation="fade-right">
            <SectionHeader
              eyebrow="Water, Sanitation & Hygiene"
              title="Improving access to clean water in 50 communities."
              description="Clean water, safe sanitation and good hygiene are foundations for health, school attendance and productivity. Our WASH ambition targets 50 communities."
            />
          </Reveal>
          <Reveal animation="fade-left" delay={100}>
            <div className="overflow-hidden border border-border shadow-md lg:order-first">
              <LazyImage
                src={water}
                alt="Community members collecting clean water"
                aspectRatio="4/3"
                zoomOnHover
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* UN Sustainable Development Goals Alignment Section */}
      <section className="border-t border-border bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Global Alignment"
            title="Our Vision and Mission are Aligned to the United Nations Sustainable Development Goals"
            description="Our focus areas are intentionally designed to contribute directly toward the United Nations 2030 Sustainable Development Goals (SDGs) for human capital growth and resilient communities."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <div className="rounded border border-border bg-card p-5 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#C5192D] px-2.5 py-0.5 text-xs font-bold text-white uppercase">
                    SDG 4: Quality Education
                  </span>
                  <span className="rounded bg-[#FF3A21] px-2.5 py-0.5 text-xs font-bold text-white uppercase">
                    SDG 5: Gender Equality
                  </span>
                </div>
                <h4 className="mt-3 text-base font-bold text-navy">
                  Youth & Female Educational Empowerment
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Equipping 10,000 youth, including 5,000 young women, with digital literacy,
                  classroom tutoring, and CBT training.
                </p>
              </div>

              <div className="rounded border border-border bg-card p-5 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#26BDE2] px-2.5 py-0.5 text-xs font-bold text-white uppercase">
                    SDG 6: Clean Water & Sanitation
                  </span>
                </div>
                <h4 className="mt-3 text-base font-bold text-navy">
                  WASH Infrastructure in 50 Communities
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Delivering sustainable access to clean water and sanitation to build healthier,
                  disease-resilient communities.
                </p>
              </div>

              <div className="rounded border border-border bg-card p-5 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#A21942] px-2.5 py-0.5 text-xs font-bold text-white uppercase">
                    SDG 8: Decent Work
                  </span>
                  <span className="rounded bg-[#19486A] px-2.5 py-0.5 text-xs font-bold text-white uppercase">
                    SDG 17: Partnerships for the Goals
                  </span>
                </div>
                <h4 className="mt-3 text-base font-bold text-navy">
                  Sustainable Livelihoods & Strategic Alliances
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Building cross-sector collaborations with educational institutions, youth bodies,
                  and technology consultants.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 shadow-sm">
              <img
                src={sdgGoalsImg}
                alt="United Nations Sustainable Development Goals"
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
              <p className="mt-4 text-center text-xs font-semibold text-muted-foreground">
                United Nations Sustainable Development Goals — 2030 Agenda
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Every focus area begins with the community."
        description="From skills training to clean water access, you can help widen opportunity where it is needed most."
        secondaryLabel="Get Involved"
        secondaryTo="/get-involved"
      />
    </>
  );
}
