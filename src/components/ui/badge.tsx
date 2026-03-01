import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "bg-primary/10 text-primary",
        variant === "secondary" && "bg-secondary/10 text-secondary",
        variant === "success" && "bg-success/10 text-success",
        variant === "warning" && "bg-secondary/20 text-secondary",
        variant === "error" && "bg-error/10 text-error",
        variant === "outline" && "border border-muted/20 text-muted",
        className
      )}
      {...props}
    />
  );
}
