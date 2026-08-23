import { Link, createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { APPROACH, CORE_VALUES, MISSION, VISION } from "@/components/site/content";
import { ORG } from "@/components/site/site-nav";
import leadership from "@/assets/leadership.jpg";
import patronImg from "@/assets/media/patron-dakasko-advisory-1.jpg";
import sdgGoalsImg from "@/assets/sdg-goals-transparent.png";
import { PartnersSlider } from "@/components/site/PartnersSlider";

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

      {/* UN Sustainable Development Goals Alignment Section */}
      <section className="border-t border-border bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Global Framework"
            title="Our Vision and Mission are Aligned to the United Nations Sustainable Development Goals"
            description="GKD-YDI's programmatic roadmap directly advances the 2030 Agenda for Sustainable Development, fostering education, equity, clean water access, and youth resilience across Northeast Nigeria."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-wider text-navy uppercase">
                Core SDG Commitments:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#C5192D] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 4 &middot; Quality Education
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">Academic & Digital Readiness</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Delivering free JAMB/WAEC/NECO tutorials and hands-on CBT test training for
                    public school scholars.
                  </p>
                </div>

                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#FF3A21] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 5 &middot; Gender Equality
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">Empowering 5,000 Young Women</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Providing young women with leadership tools, digital skills, and vocational
                    agency.
                  </p>
                </div>

                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#26BDE2] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 6 &middot; Clean Water & WASH
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">50 Resilient Communities</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Improving access to potable water, sanitation infrastructure, and community
                    hygiene standards.
                  </p>
                </div>

                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#A21942] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 8 &middot; Decent Work
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">Livelihoods for 10,000 Youth</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Vocational mentorship and technical empowerment for long-term economic
                    independence.
                  </p>
                </div>

                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#DD1367] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 10 &middot; Reduced Inequalities
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">Inclusive Opportunities</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Bridging educational and technological divides for underserved youth in
                    Northeast Nigeria.
                  </p>
                </div>

                <div className="rounded border border-border bg-card p-4.5 shadow-2xs">
                  <span className="inline-block rounded bg-[#19486A] px-2 py-0.5 text-[11px] font-bold text-white uppercase">
                    SDG 17 &middot; Partnerships
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-navy">Collaborative Impact</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Uniting with academic institutions, youth organizations, and technology
                    consultants.
                  </p>
                </div>
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
                Official United Nations Sustainable Development Goals Framework
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patron & Advisory Leadership Section */}
      <section className="border-t border-border bg-background">
        <div className="container-page py-16 md:py-24">
          <SectionHeader
            eyebrow="Leadership & Governance"
            title="Guided by seasoned regional leadership."
            description="Our patron and advisory council provide strategic direction, ethical governance, and mission alignment."
          />

          <div className="mt-12 overflow-hidden border border-border bg-card shadow-sm lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/20 px-3 py-1 text-xs font-bold text-navy-deep">
                  Organization Patron
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-navy sm:text-3xl">
                  Dr. Usman Muhammad Dakasko
                </h3>
                <p className="mt-2 text-sm font-semibold text-ocean">
                  Dean, Faculty of Education — Yobe State University (YSU)
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Dr. Usman Muhammad Dakasko serves as Patron of GKD-YDI, providing strategic advice
                  on ethical leadership, institutional growth, and regional youth empowerment.
                  During his formal advisory session on December 23rd, 2025, Dr. Dakasko emphasized
                  the imperative of discipline, historical consciousness, and sustainable human
                  capital development.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="accent">
                  <Link to="/media">Read Patron Advisory Update</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Request Partnership</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-muted lg:aspect-auto">
              <img
                src={patronImg}
                alt="Dr. Usman Muhammad Dakasko during the GKD-YDI advisory session"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <PartnersSlider />

      <CTASection
        title="Help equip the next generation of leaders."
        description="Your support funds education, skills training, leadership development and clean water access across Yobe State."
      />
    </>
  );
}
