import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Droplets,
  GraduationCap,
  Globe2,
  Mail,
  ShieldCheck,
  ArrowRight,
  User,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FOUNDER_PROFILE } from "@/components/site/content";
import { Button } from "@/components/ui/button";

interface FounderSectionProps {
  showSectionHeader?: boolean;
  className?: string;
}

export function FounderSection({
  showSectionHeader = true,
  className = "",
}: FounderSectionProps) {
  const {
    name,
    fullNameWithCredentials,
    role,
    title,
    bio,
    credentials,
    academics,
    donorPartnerships,
    focusPillars,
  } = FOUNDER_PROFILE;

  return (
    <section id="founder" className={`relative overflow-hidden bg-card/60 ${className}`}>
      <div className="container-page py-16 md:py-24">
        {showSectionHeader && (
          <SectionHeader
            eyebrow="Executive Leadership"
            title="About the Founder"
            description="Combining engineering excellence, infrastructure expertise, and a passion for sustainable youth empowerment in Northeast Nigeria."
            className="mb-12 md:mb-16"
          />
        )}

        {/* Main Founder Card Container */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-card">
          {/* Top accent bar in brand colors */}
          <div className="h-1.5 w-full bg-gradient-to-r from-navy via-ocean to-yellow" />

          <div className="grid gap-10 p-6 sm:p-8 md:p-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:p-14">
            {/* Left Column: Founder Photo Placeholder & Key Highlights */}
            <Reveal animation="fade-right" className="flex flex-col justify-between">
              <div>
                {/* Photo Placeholder Frame */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Subtle Geometric Corner Accents */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-2.5 -left-2.5 z-10 hidden size-12 border-t-2 border-l-2 border-yellow sm:block"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-2.5 -bottom-2.5 z-10 hidden size-12 border-r-2 border-b-2 border-ocean sm:block"
                  />

                  {/* Clean Minimalist Photo Placeholder */}
                  <div className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-mist/60 text-muted-foreground/35 shadow-2xs">
                    <User className="size-24 stroke-[1.2] text-muted-foreground/35" />
                  </div>
                </div>

                {/* Engineering & Governance Box */}
                <div className="mt-6 rounded-xl border border-border/80 bg-mist/50 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-ocean uppercase">
                    <Briefcase className="size-4" />
                    Engineering & Project Governance
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Direct oversight of civil infrastructure, municipal water distribution schemes,
                    and community development interventions across Northeast Nigeria.
                  </p>

                  {/* Donor Experience Bar */}
                  <div className="mt-4 border-t border-border/70 pt-3">
                    <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                      <span className="flex items-center gap-1 text-navy font-semibold">
                        <Globe2 className="size-3.5 text-ocean" />
                        Donor Initiatives:
                      </span>
                      <span className="font-semibold text-ocean">
                        {donorPartnerships.join(" &bull; ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Focus Pillars Quick Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {focusPillars.map((pillar) => (
                    <span
                      key={pillar}
                      className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-[11px] font-medium text-navy border border-border/50"
                    >
                      <CheckCircle2 className="size-3 text-growth" />
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons in Left Column */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild variant="accent" className="w-full sm:w-auto flex-1 shadow-xs">
                  <Link to="/contact">
                    <Mail className="size-4 mr-2" />
                    Contact Leadership
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto flex-1">
                  <Link to="/our-focus">
                    View Programs
                    <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            {/* Right Column: Detailed Profile, Bio, Academic Timeline & Credentials */}
            <Reveal animation="fade-left" delay={100} className="flex flex-col justify-between">
              <div>
                {/* Header Title & Role */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-3 py-1 text-xs font-bold text-ocean">
                    <UserCheck className="size-3.5 text-ocean" />
                    Organizational Founder & Executive Profile
                  </div>

                  <h3 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl tracking-tight">
                    {fullNameWithCredentials}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-ocean sm:text-base">
                    {title}
                  </p>
                </div>

                {/* Visual Credentials Pills / Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {credentials.map((cred) => (
                    <div
                      key={cred.shortLabel}
                      className="group relative inline-flex items-center gap-1.5 rounded-lg border border-ocean/20 bg-ocean/5 px-3 py-1.5 text-xs font-semibold text-navy transition-all duration-200 hover:border-ocean hover:bg-ocean/10"
                      title={cred.description}
                    >
                      <Award className="size-3.5 text-ocean" />
                      <span>{cred.label}</span>
                    </div>
                  ))}
                </div>

                {/* Brief Biography Quote Box */}
                <div className="mt-6 rounded-xl border-l-4 border-yellow bg-mist/60 p-5 sm:p-6 shadow-2xs">
                  <p className="text-sm sm:text-[15px] leading-relaxed text-foreground font-normal">
                    &ldquo;{bio}&rdquo;
                  </p>
                </div>

                {/* Academic Background Timeline / Grid */}
                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded bg-navy text-white">
                      <GraduationCap className="size-4" />
                    </div>
                    <h4 className="text-base font-bold text-navy">
                      Academic Background & Research
                    </h4>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-1">
                    {academics.map((item, idx) => (
                      <div
                        key={item.qualification}
                        className="group relative flex items-start gap-3.5 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-ocean/30 hover:bg-mist/40 hover:shadow-2xs"
                      >
                        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded bg-ocean/10 text-ocean">
                          {idx === 0 ? (
                            <BookOpen className="size-3.5" />
                          ) : idx === 1 ? (
                            <Award className="size-3.5" />
                          ) : (
                            <Droplets className="size-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <p className="text-sm font-bold text-navy">
                              {item.qualification}
                            </p>
                            {item.status && (
                              <span className="rounded bg-navy/5 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                {item.status}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs font-semibold text-ocean">
                            {item.institution}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Focus: {item.discipline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statutory Key Credentials Card */}
                <div className="mt-7 rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded bg-growth/15 text-growth">
                      <ShieldCheck className="size-4" />
                    </div>
                    <h4 className="text-sm font-bold text-navy">
                      Professional Licensure & Statutory Credentials
                    </h4>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border/80 bg-mist/30 p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="flex size-5 items-center justify-center rounded-full bg-ocean text-[10px] font-bold text-white">
                          ✓
                        </span>
                        <span className="text-xs font-bold text-navy">COREN Registered</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-normal text-muted-foreground">
                        Council for the Regulation of Engineering in Nigeria (Full Licensure).
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/80 bg-mist/30 p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="flex size-5 items-center justify-center rounded-full bg-growth text-[10px] font-bold text-white">
                          ✓
                        </span>
                        <span className="text-xs font-bold text-navy">Corporate Member (MNSE)</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-normal text-muted-foreground">
                        Nigerian Society of Engineers (Corporate Engineering Division).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Note */}
              <div className="mt-8 border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
                <p>
                  Guiding GKD-YDI towards achieving Vision 2030 targets across Northeast Nigeria.
                </p>
                <Link
                  to="/donate"
                  className="font-bold text-ocean hover:text-navy transition-colors inline-flex items-center gap-1"
                >
                  Support GKD-YDI Projects <ArrowRight className="size-3" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
