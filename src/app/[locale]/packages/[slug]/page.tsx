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
import { FadeIn, motion } from "@/components/ui/motion";

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
    <div>
      {/* Premium hero banner */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-pattern opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-surface/50 hover:text-surface text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              {tc("back")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-surface tracking-wide">
              {getLocalizedField(pkg, "name", locale)}
            </h1>
            <Badge variant="secondary">{t(`filter.${pkg.tradition_type}`)}</Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-surface/60 max-w-2xl leading-relaxed text-lg"
          >
            {getLocalizedField(pkg, "description", locale)}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick facts */}
            <FadeIn>
              <div className="flex flex-wrap gap-8 py-8 border-b border-muted/10">
                {pkg.base_price > 0 && (
                  <div>
                    <span className="text-xs text-muted block mb-1">{t("startingAt")}</span>
                    <span className="font-serif text-3xl font-semibold text-secondary tracking-wide">
                      {formatPrice(pkg.base_price)}
                    </span>
                  </div>
                )}
                {pkg.duration_nights > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Moon size={18} className="text-secondary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted block">{t("nights")}</span>
                      <span className="font-semibold text-primary text-lg">{pkg.duration_nights}</span>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Includes */}
            <FadeIn delay={0.2}>
              <PackageIncludes includes={pkg.includes} />
            </FadeIn>
          </div>

          {/* Sidebar -- Inquiry Form */}
          <FadeIn className="lg:col-span-1" delay={0.3}>
            <Card className="sticky top-24 card-gold-top">
              <CardContent className="p-6 pt-8">
                <h3 className="font-serif text-lg font-semibold text-primary mb-4 tracking-wide">
                  {t("inquireAbout")}
                </h3>
                <PackageInquiryForm
                  packageName={getLocalizedField(pkg, "name", locale)}
                />
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Related packages */}
        {otherPackages.length > 0 && (
          <FadeIn className="mt-20" delay={0.2}>
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mb-8" />
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-8 tracking-wide">
              {t("relatedPackages")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPackages.map((p) => (
                <Card key={p.id} className="card-gold-top transition-all duration-300 hover:shadow-lg hover:border-secondary/20">
                  <CardContent className="p-6 pt-8">
                    <h3 className="font-semibold text-primary mb-1">
                      {getLocalizedField(p, "name", locale)}
                    </h3>
                    {p.base_price > 0 && (
                      <div className="font-serif text-lg text-secondary font-medium mb-3">
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
          </FadeIn>
        )}
      </div>
    </div>
  );
}
