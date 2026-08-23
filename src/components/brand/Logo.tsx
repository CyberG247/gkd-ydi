import { Link } from "@tanstack/react-router";
import gkdLogoDark from "@/assets/gkd-logo.png";
import gkdLogoLight from "@/assets/gkd-logo-light.png";
import gkdEmblem from "@/assets/gkd-emblem.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "compact" | "emblem";
  tone?: "light" | "dark";
  className?: string;
  imgClassName?: string;
};

export function Logo({
  variant = "full",
  tone = "dark",
  className,
  imgClassName,
}: LogoProps) {
  const isLight = tone === "light";
  const isEmblem = variant === "emblem";

  const logoSrc = isEmblem
    ? gkdEmblem
    : isLight
      ? gkdLogoLight
      : gkdLogoDark;

  return (
    <Link
      to="/"
      aria-label="GKD-YDI — Gidan Karan Dawa Youth Development Initiatives, home"
      className={cn("inline-flex shrink-0 items-center transition-opacity hover:opacity-90", className)}
    >
      <img
        src={logoSrc}
        alt="GKD-YDI — Gidan Karan Dawa Youth Development Initiatives"
        className={cn(
          "w-auto object-contain",
          variant === "compact"
            ? "h-9 sm:h-10"
            : variant === "emblem"
              ? "h-10 w-10 sm:h-12 sm:w-12"
              : "h-11 sm:h-13",
          imgClassName,
        )}
      />
    </Link>
  );
}

