import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#dfe4f0] bg-[#f6f7fb] text-[#4a5570]",
        success: "border-[#cfc9ff] bg-[#f0eeff] text-[#4b3ac7]",
        warning: "border-[#ffd8bd] bg-[#fff3eb] text-[#b84f16]",
        danger: "border-[#ffc4cc] bg-[#fff0f2] text-[#b42338]",
        info: "border-[#c7dcff] bg-[#edf4ff] text-[#1d5fd1]",
        outline: "border-[#dfe4f0] bg-white text-[#5b657c]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
