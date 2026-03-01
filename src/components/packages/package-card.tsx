import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Package } from "@/lib/database.types";
import { ArrowRight, Moon } from "lucide-react";

export function PackageCard({ pkg }: { pkg: Package }) {
  const t = useTranslations("packages");
  const locale = useLocale();

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">
              {getLocalizedField(pkg, "name", locale)}
            </h3>
            <Badge variant="secondary">
              {t(`filter.${pkg.tradition_type}`)}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
          {getLocalizedField(pkg, "description", locale)}
        </p>

        {pkg.duration_nights > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted mb-4">
            <Moon size={14} />
            <span>
              {pkg.duration_nights} {t("nights")}
            </span>
          </div>
        )}

        <div className="mb-6">
          {pkg.base_price > 0 ? (
            <>
              <span className="text-xs text-muted">{t("startingAt")}</span>
              <div className="text-2xl font-semibold text-secondary">
                {formatPrice(pkg.base_price)}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-secondary">
              {t("customQuote")}
            </div>
          )}
        </div>

        <Link
          href={`/packages/${pkg.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white px-4 py-2.5 text-sm font-medium hover:bg-secondary-light transition-colors"
        >
          {t("viewDetail")}
          <ArrowRight size={14} />
        </Link>
      </CardContent>
    </Card>
  );
}
