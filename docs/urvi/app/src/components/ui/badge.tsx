import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center justify-center rounded-full font-semibold", {
  variants: {
    variant: {
      brand: "bg-brand text-white",
      muted: "bg-surface text-fg-muted border border-line",
    },
  },
  defaultVariants: { variant: "brand" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
