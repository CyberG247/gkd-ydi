import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
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
  const [featuredValue, ...supportingValues] = CORE_VALUES;

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="A youth development initiative rooted in Northeast Nigeria."
        description={`${ORG.name} (${ORG.short}) was founded on ${ORG.founded} and works from ${ORG.city}, ${ORG.state}, across ${ORG.region}.`}
        currentPath="/about"
      />

      <section>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeader eyebrow="Mission" title="Why we exist." />
            <Reveal delay={80}>
              <p className="mt-7 border-l-2 border-yellow pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {MISSION}
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <img
              src={leadership}
              alt="Young leaders in a community training session"
              className="aspect-[4/3] w-full border border-border object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="radiant-field bg-navy text-white">
        <div className="container-page max-w-5xl py-16 md:py-24">
          <p className="eyebrow text-yellow">Vision 2030</p>
          <Reveal>
            <p className="text-display-lg mt-6 font-extrabold">
              By 2030: <span className="text-yellow">10,000</span> young people equipped,{" "}
              <span className="text-yellow">5,000</span> young women leading, and{" "}
              <span className="text-yellow">50</span> communities with improved water, sanitation
              and hygiene.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
              {VISION}
            </p>
          </Reveal>
        </div>
      </section>

      {featuredValue ? (
        <section className="bg-mist">
          <div className="container-page py-16 md:py-24">
            <SectionHeader eyebrow="Core Values" title="The principles that guide our work." />
            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <Reveal>
                <div className="flex h-full flex-col justify-between border border-border bg-background p-8 md:p-10">
                  <span
                    aria-hidden="true"
                    className="grid size-14 place-items-center rounded-sm bg-navy text-navy-foreground"
                  >
                    <featuredValue.icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <div className="mt-10">
                    <h3 className="text-2xl font-extrabold text-navy">{featuredValue.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                      {featuredValue.description}
                    </p>
                  </div>
                </div>
              </Reveal>
              <ul className="divide-y divide-border border-y border-border">
                {supportingValues.map((value) => (
                  <li key={value.title}>
                    <Reveal className="flex gap-5 py-7">
                      <value.icon
                        className="mt-1 size-5 shrink-0 text-ocean"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-base font-bold text-navy">{value.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="Our Approach" title="How we deliver." />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((item) => (
              <Reveal key={item.title}>
                <div className="border-t-2 border-border pt-5">
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Help equip the next generation of leaders."
        description="Your support funds education, skills training, leadership development and clean water access across Yobe State."
      />
    </>
  );
}
