"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Package } from "@/lib/database.types";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/motion";

// Fallback data for when DB is not connected
const fallbackPackages: Package[] = [
  {
    id: "1", slug: "basic", name_th: "แพ็กเกจพื้นฐาน", name_en: "Basic Package",
    tradition_type: "buddhist", base_price: 79000, description_th: "พิธีศพแบบเรียบง่าย สวด 1 คืน ฌาปนกิจ",
    description_en: "Simple funeral ceremony, 1-night chanting, cremation",
    duration_nights: 1, includes: [], image_url: null, display_order: 1, is_active: true,
    created_at: "", updated_at: "",
  },
  {
    id: "2", slug: "standard", name_th: "แพ็กเกจมาตรฐาน", name_en: "Standard Package",
    tradition_type: "buddhist", base_price: 149000, description_th: "พิธีศพครบวงจร สวด 3 คืน รดน้ำศพ ฌาปนกิจ ลอยอังคาร",
    description_en: "Full ceremony, 3-night chanting, water blessing, cremation, ash floating",
    duration_nights: 3, includes: [], image_url: null, display_order: 2, is_active: true,
    created_at: "", updated_at: "",
  },
  {
    id: "3", slug: "premium", name_th: "แพ็กเกจพรีเมียม", name_en: "Premium Package",
    tradition_type: "buddhist", base_price: 249000, description_th: "พิธีศพระดับพรีเมียม สวด 5 คืน ช่างภาพ ดอกไม้พิเศษ",
    description_en: "Premium ceremony, 5-night chanting, photographer, premium flowers",
    duration_nights: 5, includes: [], image_url: null, display_order: 3, is_active: true,
    created_at: "", updated_at: "",
  },
  {
    id: "4", slug: "custom", name_th: "แพ็กเกจกำหนดเอง", name_en: "Custom Package",
    tradition_type: "custom", base_price: 0, description_th: "ออกแบบพิธีศพตามความต้องการ รองรับทุกศาสนาและประเพณี",
    description_en: "Fully customizable ceremony for any tradition or religion",
    duration_nights: 0, includes: [], image_url: null, display_order: 4, is_active: true,
    created_at: "", updated_at: "",
  },
];

export function PackagesOverview({ packages }: { packages?: Package[] }) {
  const t = useTranslations("packages");
  const locale = useLocale();
  const displayPackages = packages && packages.length > 0 ? packages : fallbackPackages;

  // Standard package (index 1) is the recommended one
  const recommendedSlug = "standard";

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4 tracking-wide">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {displayPackages.map((pkg) => {
            const isRecommended = pkg.slug === recommendedSlug;
            return (
              <StaggerItem
                key={pkg.id}
                className={`relative flex flex-col rounded-xl border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isRecommended
                    ? "border-secondary shadow-gold lg:scale-105 lg:z-10"
                    : "border-muted/10 hover:border-secondary/30"
                } card-gold-top`}
              >
                {/* Most Popular badge */}
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-xs font-semibold text-white shadow-gold">
                      {locale === "th" ? "แนะนำ" : "Most Popular"}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 pt-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary">
                      {getLocalizedField(pkg, "name", locale)}
                    </h3>
                    <Badge variant="secondary">
                      {t(`filter.${pkg.tradition_type}`)}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted mb-6 flex-1 leading-relaxed">
                    {getLocalizedField(pkg, "description", locale)}
                  </p>

                  {pkg.base_price > 0 ? (
                    <div className="mb-6">
                      <span className="text-xs text-muted">{t("startingAt")}</span>
                      <div className="font-serif text-3xl font-semibold text-secondary tracking-wide">
                        {formatPrice(pkg.base_price)}
                      </div>
                      {pkg.duration_nights > 0 && (
                        <span className="text-xs text-muted">
                          {pkg.duration_nights} {t("nights")}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="font-serif text-2xl font-semibold text-secondary">
                        {t("customQuote")}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isRecommended
                        ? "bg-secondary text-white hover:bg-secondary-light shadow-gold hover:shadow-gold-lg"
                        : "border border-secondary text-secondary hover:bg-secondary hover:text-white"
                    }`}
                  >
                    {t("viewDetail")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </FadeInStagger>

        <FadeIn className="text-center mt-12" delay={0.3}>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-light font-medium transition-colors text-lg"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
