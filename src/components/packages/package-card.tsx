import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Package } from "@/lib/database.types";
import { ArrowRight, Moon } from "lucide-react";
import Image from "next/image";

const packageImages: Record<string, string> = {
  basic: "/images/lotus-white.jpg",
  standard: "/images/pexels-white-flowers.jpg",
  premium: "/images/pexels-candles-dark.jpg",
  custom: "/images/pexels-ceremony.jpg",
};

export function PackageCard({ pkg }: { pkg: Package }) {
  const t = useTranslations("packages");
  const locale = useLocale();

  const isRecommended = pkg.slug === "standard";

  const imageUrl = packageImages[pkg.slug];

  return (
    <Card
      className={`group flex flex-col h-full card-gold-top transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
        isRecommended
          ? "border-secondary shadow-gold"
          : "hover:border-secondary/30"
      }`}
    >
      {/* Package photo */}
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={getLocalizedField(pkg, "name", locale)}
            fill
            className="object-cover photo-zoom group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <CardContent className="flex flex-col flex-1 p-6 pt-6">
        {/* Most Popular badge */}
        {isRecommended && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-white">
              {locale === "th" ? "แนะนำ" : "Most Popular"}
            </span>
          </div>
        )}

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
              <div className="font-serif text-3xl font-semibold text-secondary tracking-wide">
                {formatPrice(pkg.base_price)}
              </div>
            </>
          ) : (
            <div className="font-serif text-xl font-semibold text-secondary">
              {t("customQuote")}
            </div>
          )}
        </div>

        <Link
          href={`/packages/${pkg.slug}`}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            isRecommended
              ? "bg-secondary text-white hover:bg-secondary-light shadow-gold hover:shadow-gold-lg"
              : "bg-secondary text-white hover:bg-secondary-light"
          }`}
        >
          {t("viewDetail")}
          <ArrowRight size={14} />
        </Link>
      </CardContent>
    </Card>
  );
}
