import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { NAV_ITEMS } from "./site-nav";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  currentPath: string;
  crumbLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  currentPath,
  crumbLabel,
}: PageHeroProps) {
  const current = NAV_ITEMS.find((item) => item.to === currentPath);

  return (
    <section className="radiant-field bg-navy text-white">
      <div className="container-page py-16 md:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
            <li>
              <Link to="/" className="transition-colors hover:text-yellow">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-yellow">
              {crumbLabel ?? current?.label ?? title}
            </li>
          </ol>
        </nav>

        <p className="eyebrow mt-10 text-yellow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {description}
        </div>
      </div>
    </section>
  );
}
