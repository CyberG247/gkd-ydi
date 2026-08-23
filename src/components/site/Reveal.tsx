import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "fade";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  animation?: RevealAnimation;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
};

/** Reveals content with professional spring/fade motion once it scrolls into view. */
export function Reveal({
  children,
  as: Tag = "div",
  animation = "fade-up",
  delay = 0,
  threshold = 0.08,
  rootMargin = "0px 0px -8% 0px",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const animationClass = {
    "fade-up": "reveal-up",
    "fade-down": "reveal-down",
    "fade-left": "reveal-left",
    "fade-right": "reveal-right",
    "scale-up": "reveal-scale",
    fade: "reveal-fade",
  }[animation];

  return (
    <Tag
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn("reveal", animationClass, className)}
    >
      {children}
    </Tag>
  );
}
