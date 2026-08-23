import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScroll = scrollHeight - clientHeight;

      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100)));
      }

      if (scrollTop > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={cn(
        "fixed right-5 bottom-6 z-40 transition-all duration-400 ease-out print:hidden sm:right-8 sm:bottom-8",
        visible
          ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
          : "translate-y-6 scale-90 opacity-0 pointer-events-none",
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top of page"
        className="group relative flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-lift transition-all duration-300 hover:bg-ocean hover:scale-108 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-yellow"
      >
        {/* Circular SVG Scroll Progress Indicator */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-white/15"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-yellow transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
