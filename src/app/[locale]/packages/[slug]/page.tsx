"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageIncludes } from "@/components/packages/package-includes";
import { PackageInquiryForm } from "@/components/packages/package-inquiry-form";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import type { Package } from "@/lib/database.types";
import { ArrowLeft, Moon, ArrowRight } from "lucide-react";

// Fallback data
const allPackages: Package[] = [
  {
    id: "1", slug: "basic", name_th: "แพ็กเกจพื้นฐาน", name_en: "Basic Package",
    tradition_type: "buddhist", base_price: 79000,
    description_th: "พิธีศพแบบเรียบง่าย สวด 1 คืน ฌาปนกิจ เหมาะสำหรับครอบครัวที่ต้องการจัดงานเรียบง่าย ดูแลทุกขั้นตอนอย่างสมเกียรติ",
    description_en: "Simple funeral ceremony with 1-night chanting and cremation. Suitable for families who prefer a simple and dignified ceremony.",
    duration_nights: 1,
    includes: ["รับศพจากโรงพยาบาล","จองศาลา 1 คืน","โลงศพมาตรฐาน","ดอกไม้หน้าโลง 1 ชุด","พิธีสวดอภิธรรม 1 คืน","พิธีฌาปนกิจ","เก็บอัฐิ"],
    image_url: null, display_order: 1, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "2", slug: "standard", name_th: "แพ็กเกจมาตรฐาน", name_en: "Standard Package",
    tradition_type: "buddhist", base_price: 149000,
    description_th: "พิธีศพครบวงจร สวด 3 คืน รดน้ำศพ ฌาปนกิจ ลอยอังคาร เหมาะสำหรับครอบครัวที่ต้องการพิธีครบถ้วน ดูแลทุกขั้นตอนจนลอยอังคาร",
    description_en: "Full funeral ceremony with 3-night chanting, water blessing, cremation, and ash floating at the Ping River.",
    duration_nights: 3,
    includes: ["รับศพจากโรงพยาบาล","จองศาลา 3 คืน","โลงศพ 3 ชั้น","ดอกไม้หน้าโลง 1 ชุด (15,000 ฿)","เครื่องไทยธรรม","นิมนต์พระสงฆ์","ถวายภัตตาหาร","พิธีรดน้ำศพ","สวดพระอภิธรรม 3 คืน","พิธีฌาปนกิจ","เก็บอัฐิ","ลอยอังคาร แม่น้ำปิง","ขนมกล่อง 50 ชุด/วัน","เจ้าหน้าที่ดูแลตลอดงาน"],
    image_url: null, display_order: 2, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "3", slug: "premium", name_th: "แพ็กเกจพรีเมียม", name_en: "Premium Package",
    tradition_type: "buddhist", base_price: 249000,
    description_th: "พิธีศพระดับพรีเมียม สวด 5 คืน ช่างภาพ ดอกไม้พิเศษ บริการครบถ้วน สำหรับครอบครัวที่ต้องการดูแลอย่างสมบูรณ์แบบ",
    description_en: "Premium funeral with 5-night chanting, photographer, premium flowers, and the most comprehensive service available.",
    duration_nights: 5,
    includes: ["ทุกอย่างในแพ็กเกจมาตรฐาน","สวดพระอภิธรรม 5 คืน","ดอกไม้พรีเมียม (30,000 ฿)","ช่างภาพตลอดงาน","ขนมกล่องพรีเมียม 100 ชุด/วัน","ของที่ระลึก","เจ้าหน้าที่เพิ่ม 2 คน","รถรับ-ส่งครอบครัว"],
    image_url: null, display_order: 3, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "4", slug: "custom", name_th: "แพ็กเกจกำหนดเอง", name_en: "Custom Package",
    tradition_type: "custom", base_price: 0,
    description_th: "ออกแบบพิธีศพตามความต้องการ รองรับทุกศาสนาและประเพณี พุทธ คริสต์ จีน หรือกำหนดเอง ทีมงานพร้อมให้คำปรึกษา",
    description_en: "Fully customizable funeral for any tradition or religion. Our team will consult with you to create the perfect ceremony.",
    duration_nights: 0, includes: [],
    image_url: null, display_order: 4, is_active: true, created_at: "", updated_at: "",
  },
];

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();
  const t = useTranslations("packages");
  const tc = useTranslations("common");

  const pkg = allPackages.find((p) => p.slug === slug);
  const otherPackages = allPackages.filter((p) => p.slug !== slug).slice(0, 3);

  if (!pkg) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">{tc("noData")}</p>
        <Link href="/packages" className="text-secondary mt-4 inline-block">
          {tc("back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {tc("back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-semibold text-primary">
                  {getLocalizedField(pkg, "name", locale)}
                </h1>
                <Badge variant="secondary">{t(`filter.${pkg.tradition_type}`)}</Badge>
              </div>
              <p className="text-muted leading-relaxed">
                {getLocalizedField(pkg, "description", locale)}
              </p>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-muted/10">
              {pkg.base_price > 0 && (
                <div>
                  <span className="text-xs text-muted block">{t("startingAt")}</span>
                  <span className="text-2xl font-semibold text-secondary">
                    {formatPrice(pkg.base_price)}
                  </span>
                </div>
              )}
              {pkg.duration_nights > 0 && (
                <div className="flex items-center gap-2">
                  <Moon size={18} className="text-muted" />
                  <div>
                    <span className="text-xs text-muted block">{t("nights")}</span>
                    <span className="font-semibold text-primary">{pkg.duration_nights}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Includes */}
            <PackageIncludes includes={pkg.includes} />
          </div>

          {/* Sidebar — Inquiry Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {t("inquireAbout")}
                </h3>
                <PackageInquiryForm
                  packageName={getLocalizedField(pkg, "name", locale)}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related packages */}
        {otherPackages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-primary mb-6">
              {t("relatedPackages")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPackages.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-1">
                      {getLocalizedField(p, "name", locale)}
                    </h3>
                    {p.base_price > 0 && (
                      <div className="text-secondary font-medium mb-2">
                        {formatPrice(p.base_price)}
                      </div>
                    )}
                    <Link
                      href={`/packages/${p.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary-light transition-colors"
                    >
                      {t("viewDetail")}
                      <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
