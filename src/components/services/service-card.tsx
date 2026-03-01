import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Service } from "@/lib/database.types";

const unitKeyMap: Record<string, string> = {
  per_event: "perEvent",
  per_day: "perDay",
  per_person: "perPerson",
};

export function ServiceCard({ service }: { service: Service }) {
  const locale = useLocale();
  const t = useTranslations("services");

  return (
    <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md card-gold-top">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-1 group-hover:text-secondary transition-colors duration-300">
              {getLocalizedField(service, "name", locale)}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {getLocalizedField(service, "description", locale)}
            </p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <div className="font-serif text-lg font-semibold text-secondary">
              {formatPrice(service.base_price)}
            </div>
            <span className="text-xs text-muted">
              {t(unitKeyMap[service.unit] || "perEvent")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
