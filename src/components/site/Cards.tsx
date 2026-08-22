import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const accentMap = {
  yellow: { bar: "bg-yellow", icon: "bg-yellow/15 text-navy" },
  ocean: { bar: "bg-ocean", icon: "bg-ocean/12 text-ocean" },
  growth: { bar: "bg-growth", icon: "bg-growth/12 text-growth" },
} as const;

type FocusAreaCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: keyof typeof accentMap;
  index?: number;
};

export function FocusAreaCard({
  title,
  description,
  icon: Icon,
  accent = "ocean",
  index,
}: FocusAreaCardProps) {
  const tone = accentMap[accent];

  return (
    <article className="group relative flex h-full flex-col border border-border bg-card p-7 transition-[box-shadow,transform,border-color] duration-300 ease-[cubic-bezier(0.16,0.72,0.29,1)] hover:-translate-y-1 hover:border-transparent hover:shadow-lift">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
          tone.bar,
        )}
      />
      <div className="flex items-start justify-between">
        <span
          className={cn("grid size-12 place-items-center rounded-sm", tone.icon)}
          aria-hidden="true"
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        {index !== undefined ? (
          <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground/70 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-6 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export function ValueCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="group h-full border-t-2 border-border bg-transparent pt-6 transition-colors duration-300 hover:border-yellow">
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-sm bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-navy-foreground"
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-base font-bold text-navy">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-input bg-mist px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="mx-auto grid size-14 place-items-center rounded-full bg-white text-ocean shadow-card"
      >
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-6 text-xl font-bold text-navy">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children ? <div className="mt-7 flex justify-center">{children}</div> : null}
    </div>
  );
}
