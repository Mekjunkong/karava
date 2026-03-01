import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { Json } from "@/lib/database.types";

export function PackageIncludes({ includes }: { includes: Json }) {
  const t = useTranslations("packages");
  const items = Array.isArray(includes) ? (includes as string[]) : [];

  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-4">{t("includes")}</h3>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check size={16} className="mt-0.5 shrink-0 text-success" />
            <span className="text-sm text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
