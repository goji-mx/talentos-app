import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teen-electric focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-teen-electric text-white shadow-sm hover:bg-teen-electric/90",
        secondary: "border-transparent bg-teen-sunshine text-teen-charcoal shadow-sm hover:bg-teen-sunshine/80",
        destructive: "border-transparent bg-teen-neon-pink text-white shadow-sm hover:bg-teen-neon-pink/90",
        outline: "border-teen-electric text-teen-electric hover:bg-teen-electric hover:text-white",
        success: "border-transparent bg-teen-citrus text-teen-charcoal shadow-sm hover:bg-teen-citrus/90",
        talent: "border-transparent bg-gradient-to-r from-teen-sunshine to-teen-orange text-teen-charcoal shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };