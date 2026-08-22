import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

/**
 * BRAND ASSET SLOT
 * ----------------
 * The official GKD-YDI logo file was not available in the project when this
 * lockup was built, so this component renders a neutral typographic wordmark
 * instead of an invented emblem.
 *
 * To install the real logo: drop the supplied file at `public/logo.svg`
 * (or `public/logo.png`) and replace the `<span aria-hidden>` monogram block
 * below with:
 *   <img src="/logo.svg" alt="" width={40} height={40} className="h-10 w-auto" />
 * Nothing else in the site needs to change.
 */

type LogoProps = {
  variant?: "full" | "compact";
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "full", tone = "dark", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      to="/"
      aria-label="GKD-YDI — Gidan Karan Dawa Youth Development Initiatives, home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-sm",
          isLight ? "bg-white/10 ring-1 ring-white/25" : "bg-navy",
        )}
      >
        <span className="absolute -top-3 -right-3 size-7 rounded-full bg-yellow/90" />
        <span className="absolute -bottom-3 -left-2 size-6 rounded-full bg-growth/80" />
        <span
          className={cn(
            "relative text-[0.9375rem] leading-none font-extrabold tracking-tight",
            isLight ? "text-white" : "text-navy-foreground",
          )}
        >
          GKD
        </span>
      </span>

      <span className="flex flex-col">
        <span
          className={cn(
            "text-base leading-none font-extrabold tracking-tight",
            isLight ? "text-white" : "text-navy",
          )}
        >
          GKD-YDI
        </span>
        {variant === "full" ? (
          <span
            className={cn(
              "mt-1 hidden max-w-[15rem] text-[0.6875rem] leading-tight font-medium sm:block",
              isLight ? "text-white/70" : "text-muted-foreground",
            )}
          >
            Gidan Karan Dawa Youth Development Initiatives
          </span>
        ) : null}
      </span>
    </Link>
  );
}
