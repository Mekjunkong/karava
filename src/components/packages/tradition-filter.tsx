"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const traditions = ["all", "buddhist", "christian", "chinese", "secular", "custom"] as const;

export function TraditionFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("packages.filter");

  return (
    <div className="flex flex-wrap gap-2">
      {traditions.map((tradition) => (
        <button
          key={tradition}
          onClick={() => onChange(tradition)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selected === tradition
              ? "bg-secondary text-white"
              : "bg-surface border border-muted/20 text-muted hover:text-primary hover:border-muted/40"
          )}
        >
          {t(tradition)}
        </button>
      ))}
    </div>
  );
}
