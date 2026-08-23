import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/site/CTASection";
import { ImpactStats } from "@/components/site/ImpactStats";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { APPROACH, FOCUS_AREAS, MISSION } from "@/components/site/content";
import { ORG } from "@/components/site/site-nav";
import { MEDIA_UPDATES } from "@/components/site/media-data";
import { PartnersSlider } from "@/components/site/PartnersSlider";
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
        <div className="container-page grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="eyebrow text-yellow">{ORG.motto}</p>
            <h1 className="text-display-xl mt-6 font-extrabold">
              Empowering youth.
              <span className="block text-yellow">Building futures.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {ORG.short} works alongside communities in {ORG.state} to expand education, skills and
              leadership opportunities for young people — and to improve access to clean water,
              sanitation and hygiene.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link to="/donate">
                  Donate <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link to="/our-focus">Explore Our Focus</Link>
              </Button>
            </div>
            <p className="mt-9 text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
              Founded {ORG.founded} &middot; {ORG.city}, {ORG.state}
            </p>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -top-3 -left-3 hidden size-24 border-t-2 border-l-2 border-yellow sm:block"
            />
            <img
              src={heroYouth}
              alt="Young people taking part in a community development programme in Northeast Nigeria"
              className="aspect-[4/3] w-full border border-white/15 object-cover"
              loading="eager"
            />
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 hidden h-24 w-40 border-r-2 border-b-2 border-growth sm:block"
            />
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          <div className="container-page py-14">
            <p className="text-xs font-semibold tracking-[0.14em] text-yellow uppercase">
              Our 2030 targets
            </p>
            <ImpactStats className="mt-8" />
          </div>
        </div>
      </section>

      <section>
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Our Mission"
            title="Equipping a generation to lead its own transformation."
          />
          <Reveal delay={80}>
            <p className="border-l-2 border-yellow pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {MISSION}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="What We Do" title="Six areas where our work concentrates." />
          <ol className="mt-12 border-t border-border">
            {FOCUS_AREAS.map((area, index) => (
              <li key={area.title} className="border-b border-border">
                <Link
                  to="/our-focus"
                  className="group -mx-3 grid gap-3 px-3 py-7 transition-colors duration-200 hover:bg-background sm:-mx-4 sm:grid-cols-[2rem_minmax(0,16rem)_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-muted-foreground/70 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-3">
                    <area.icon
                      className="size-5 shrink-0 text-ocean"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="text-lg font-bold text-navy sm:text-xl">{area.title}</span>
                  </span>
                  <span className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-5 shrink-0 text-navy/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-navy sm:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="container-page py-16 md:py-24">
          <SectionHeader eyebrow="Our Approach" title="How we work with communities." />
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

      <section>
        <div className="container-page py-16 md:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Media & Updates"
              title="Latest announcements and field reports."
              description="Stay informed on our strategic advisories, stakeholder partnerships, and community milestones."
            />
            <Button asChild variant="outline" className="self-start sm:self-end">
              <Link to="/media">
                View All Media <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {MEDIA_UPDATES.map((item) => (
              <Reveal key={item.id}>
                <article className="group flex h-full flex-col justify-between overflow-hidden border border-border bg-card transition-all hover:border-navy/40 hover:shadow-card">
                  <div>
                    {item.images.length > 0 && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        <img
                          src={item.images[0].src}
                          alt={item.images[0].alt}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-103"
                        />
                        <span className="absolute top-3 left-3 rounded-sm bg-navy/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-xs">
                          {item.category}
                        </span>
                      </div>
                    )}
                    <div className="p-6 md:p-7">
                      <p className="text-xs font-semibold text-ocean">
                        {item.formattedDate} &middot; {item.location}
                      </p>
                      <h3 className="mt-2.5 text-xl font-bold text-navy group-hover:text-ocean transition-colors">
                        <Link to="/media">{item.title}</Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border bg-mist/30 px-6 py-4">
                    <Link
                      to="/media"
                      className="inline-flex items-center text-xs font-bold text-navy hover:text-ocean transition-colors"
                    >
                      Read full report <ArrowRight className="ml-1.5 size-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnersSlider />

      <CTASection
        title="Building opportunity through youth empowerment."
        description="Volunteers, partners and supporters make community-driven work possible. Give, or tell us how you would like to contribute."
      />
    </>
  );
}
