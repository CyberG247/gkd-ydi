import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  headingLevel: Heading = "h2",
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow",
            align === "center" && "justify-center",
            isDark ? "text-yellow" : "text-ocean",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "mt-4 text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-[1.0625rem]",
            isDark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
