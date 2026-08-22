import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  note: string;
  /** Rendered verbatim instead of counting up (e.g. a year). */
  literal?: boolean;
};

export const AMBITION_STATS: Stat[] = [
  { value: 10000, label: "Youth to empower", note: "Target by 2030" },
  { value: 5000, label: "Young women to empower", note: "Target by 2030" },
  { value: 50, label: "Communities to reach", note: "WASH access target" },
  { value: 2030, label: "Vision horizon", note: "Strategic timeframe", literal: true },
];

function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);

  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const counted = useCountUp(stat.value, active && !stat.literal);
  const display = stat.literal ? stat.value : counted.toLocaleString("en-NG");

  return (
    <div className="border-t-2 border-yellow pt-5">
      <p className="text-4xl leading-none font-extrabold tracking-tight text-white tabular-nums sm:text-5xl">
        {display}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-semibold text-white">{stat.label}</p>
      <p className="mt-1 text-xs font-medium tracking-wide text-yellow uppercase">{stat.note}</p>
    </div>
  );
}

export function ImpactStats({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {AMBITION_STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  );
}
