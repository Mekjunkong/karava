import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Package } from "@/lib/database.types";
import { ArrowRight } from "lucide-react";

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

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardContent className="flex flex-col flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-primary">
                    {getLocalizedField(pkg, "name", locale)}
                  </h3>
                  <Badge variant="secondary">
                    {t(`filter.${pkg.tradition_type}`)}
                  </Badge>
                </div>

                <p className="text-sm text-muted mb-4 flex-1">
                  {getLocalizedField(pkg, "description", locale)}
                </p>

                {pkg.base_price > 0 ? (
                  <div className="mb-4">
                    <span className="text-xs text-muted">{t("startingAt")}</span>
                    <div className="text-xl font-semibold text-secondary">
                      {formatPrice(pkg.base_price)}
                    </div>
                    {pkg.duration_nights > 0 && (
                      <span className="text-xs text-muted">
                        {pkg.duration_nights} {t("nights")}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="text-xl font-semibold text-secondary">
                      {t("customQuote")}
                    </div>
                  </div>
                )}

                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-secondary text-secondary px-4 py-2 text-sm font-medium hover:bg-secondary hover:text-white transition-colors"
                >
                  {t("viewDetail")}
                  <ArrowRight size={14} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-light font-medium transition-colors"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
