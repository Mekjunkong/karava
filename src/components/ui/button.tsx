import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Variants
          variant === "primary" &&
            "bg-secondary text-white hover:bg-secondary-light",
          variant === "secondary" &&
            "bg-primary text-white hover:bg-primary-light",
          variant === "outline" &&
            "border border-secondary text-secondary hover:bg-secondary hover:text-white",
          variant === "ghost" &&
            "text-muted hover:text-primary hover:bg-background",
          variant === "danger" &&
            "bg-error text-white hover:opacity-90",
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-2.5 text-base",
          size === "lg" && "px-8 py-3 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
