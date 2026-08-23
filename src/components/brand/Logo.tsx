import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/gkd-ydi-official-logo.png.asset.json";
import { cn } from "@/lib/utils";

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
      className={cn(
        "inline-flex shrink-0 items-center",
        isLight && "rounded-sm bg-background px-2 py-1.5",
        className,
      )}
    >
      <img
        src={logoAsset.url}
        alt=""
        width={612}
        height={408}
        className={cn("w-auto object-contain", variant === "compact" ? "h-10" : "h-12 sm:h-14")}
      />
    </Link>
  );
}
