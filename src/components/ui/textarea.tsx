import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "flex w-full min-h-[80px] rounded-lg border bg-surface px-3 py-2 text-sm text-primary",
            "placeholder:text-muted/60",
            "focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors resize-y",
            error
              ? "border-error"
              : "border-muted/20 hover:border-muted/40",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
