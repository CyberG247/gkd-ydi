import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Handshake } from "lucide-react";
import { PARTNERS } from "@/components/site/partners-data";
import { Reveal } from "@/components/site/Reveal";

interface PartnersSliderProps {
  className?: string;
  showHeading?: boolean;
}

export function PartnersSlider({ className = "", showHeading = true }: PartnersSliderProps) {
  // Repeat partners array to create a seamless infinite horizontal loop (6 partners * 4 = 24 items)
  const repeatedPartners = Array(4).fill(PARTNERS).flat();

  return (
    <section
      className={`border-y border-border bg-card/60 py-12 md:py-16 overflow-hidden ${className}`}
      aria-labelledby="partners-heading"
    >
      <div className="container-page">
        {showHeading && (
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold tracking-widest text-ocean uppercase">
                  Strategic Alliances
                </span>
                <h2
                  id="partners-heading"
                  className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl"
                >
                  Our Trusted Partners & Collaborators
                </h2>
              </div>
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-ocean hover:text-navy transition-colors"
              >
                Become a Partner <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      {/* Horizontal Sliding Infinite Marquee */}
      <div className="relative mt-8 w-full overflow-hidden py-4">
        {/* Left & Right Gradient Fade Edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent sm:w-28"
        />

        {/* Marquee Track */}
        <div className="marquee-content gap-6 px-4">
          {repeatedPartners.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="group flex min-w-[280px] sm:min-w-[340px] items-center gap-4 rounded-xl border border-border bg-card p-4.5 shadow-2xs transition-all hover:border-ocean/40 hover:shadow-md"
            >
              <div className="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg bg-mist/50 p-2 transition-colors group-hover:bg-mist/80">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-11 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-108"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 rounded bg-ocean/10 px-2 py-0.5 text-[10px] font-bold text-ocean">
                  <ShieldCheck className="size-2.5" />
                  {partner.category}
                </span>
                <h3 className="mt-1 truncate text-sm font-bold text-navy group-hover:text-ocean transition-colors">
                  {partner.name}
                </h3>
                {partner.description && (
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {partner.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer info pill */}
      <div className="container-page mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium">
          <Handshake className="size-4 text-growth" /> Collaborating with leading organizations
          across Northern Nigeria.
        </span>
        <Link to="/contact" className="font-bold text-navy hover:text-ocean transition-colors">
          Partner with GKD-YDI &rarr;
        </Link>
      </div>
    </section>
  );
}
