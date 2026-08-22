import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold cursor-pointer transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,0.72,0.29,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-navy text-navy-foreground hover:bg-navy-deep",
        /** Highest-emphasis action on navy / photographic surfaces. */
        accent: "bg-yellow text-yellow-foreground hover:brightness-[1.06] active:brightness-100",
        /** Secondary action on light surfaces. */
        outline: "border border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy/5",
        /** Secondary action on navy surfaces. */
        outlineLight:
          "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10",
        growth: "bg-growth text-growth-foreground hover:brightness-95",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-95",
        ghost: "text-navy hover:bg-accent",
        link: "text-ocean font-semibold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-[0.8125rem]",
        lg: "h-12 px-7 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
