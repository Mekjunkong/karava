"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PackageCard } from "@/components/packages/package-card";
import { TraditionFilter } from "@/components/packages/tradition-filter";
import type { Package } from "@/lib/database.types";

// Fallback data
const fallbackPackages: Package[] = [
  {
    id: "1", slug: "basic", name_th: "แพ็กเกจพื้นฐาน", name_en: "Basic Package",
    tradition_type: "buddhist", base_price: 79000,
    description_th: "พิธีศพแบบเรียบง่าย สวด 1 คืน ฌาปนกิจ เหมาะสำหรับครอบครัวที่ต้องการจัดงานเรียบง่าย",
    description_en: "Simple funeral ceremony with 1-night chanting and cremation. Suitable for families who prefer a simple ceremony.",
    duration_nights: 1, includes: ["รับศพจากโรงพยาบาล","จองศาลา 1 คืน","โลงศพมาตรฐาน","ดอกไม้หน้าโลง 1 ชุด","พิธีสวดอภิธรรม 1 คืน","พิธีฌาปนกิจ","เก็บอัฐิ"],
    image_url: null, display_order: 1, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "2", slug: "standard", name_th: "แพ็กเกจมาตรฐาน", name_en: "Standard Package",
    tradition_type: "buddhist", base_price: 149000,
    description_th: "พิธีศพครบวงจร สวด 3 คืน รดน้ำศพ ฌาปนกิจ ลอยอังคาร เหมาะสำหรับครอบครัวที่ต้องการพิธีครบถ้วน",
    description_en: "Full ceremony with 3-night chanting, water blessing, cremation, and ash floating. Comprehensive funeral care.",
    duration_nights: 3, includes: ["รับศพจากโรงพยาบาล","จองศาลา 3 คืน","โลงศพ 3 ชั้น","ดอกไม้หน้าโลง 1 ชุด (15,000 ฿)","เครื่องไทยธรรม","นิมนต์พระสงฆ์","ถวายภัตตาหาร","พิธีรดน้ำศพ","สวดพระอภิธรรม 3 คืน","พิธีฌาปนกิจ","เก็บอัฐิ","ลอยอังคาร แม่น้ำปิง","ขนมกล่อง 50 ชุด/วัน","เจ้าหน้าที่ดูแลตลอดงาน"],
    image_url: null, display_order: 2, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "3", slug: "premium", name_th: "แพ็กเกจพรีเมียม", name_en: "Premium Package",
    tradition_type: "buddhist", base_price: 249000,
    description_th: "พิธีศพระดับพรีเมียม สวด 5 คืน ช่างภาพ ดอกไม้พิเศษ บริการครบถ้วน",
    description_en: "Premium funeral with 5-night chanting, photographer, premium flowers, and complete service.",
    duration_nights: 5, includes: ["ทุกอย่างในแพ็กเกจมาตรฐาน","สวดพระอภิธรรม 5 คืน","ดอกไม้พรีเมียม (30,000 ฿)","ช่างภาพตลอดงาน","ขนมกล่องพรีเมียม 100 ชุด/วัน","ของที่ระลึก","เจ้าหน้าที่เพิ่ม 2 คน","รถรับ-ส่งครอบครัว"],
    image_url: null, display_order: 3, is_active: true, created_at: "", updated_at: "",
  },
  {
    id: "4", slug: "custom", name_th: "แพ็กเกจกำหนดเอง", name_en: "Custom Package",
    tradition_type: "custom", base_price: 0,
    description_th: "ออกแบบพิธีศพตามความต้องการ รองรับทุกศาสนาและประเพณี พุทธ คริสต์ จีน หรือกำหนดเอง",
    description_en: "Fully customizable funeral for any tradition or religion. Buddhist, Christian, Chinese, or custom.",
    duration_nights: 0, includes: [],
    image_url: null, display_order: 4, is_active: true, created_at: "", updated_at: "",
  },
];

export default function PackagesPage() {
  const t = useTranslations("packages");
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? fallbackPackages
      : fallbackPackages.filter((p) => p.tradition_type === filter);

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="flex justify-center mb-8">
          <TraditionFilter selected={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
