import { useTranslations } from "next-intl";
import { ServiceCard } from "@/components/services/service-card";
import type { Service } from "@/lib/database.types";

// Fallback data grouped by category
const fallbackServices: Service[] = [
  { id: "1", slug: "body-transport", name_th: "รับ-ส่งศพ", name_en: "Body Transport", category: "transport", base_price: 5000, unit: "per_event", description_th: "รับศพจากโรงพยาบาลภายในเชียงใหม่", description_en: "Body pickup from hospital within Chiang Mai", is_active: true, created_at: "" },
  { id: "2", slug: "extra-transport", name_th: "รถรับ-ส่งครอบครัว", name_en: "Family Transport", category: "transport", base_price: 3000, unit: "per_day", description_th: "รถตู้รับ-ส่งครอบครัว", description_en: "Van transport for family members", is_active: true, created_at: "" },
  { id: "3", slug: "extra-night", name_th: "สวดเพิ่ม 1 คืน", name_en: "Extra Chanting Night", category: "ceremony", base_price: 15000, unit: "per_event", description_th: "เพิ่มคืนสวดพระอภิธรรม", description_en: "Additional night of Buddhist chanting", is_active: true, created_at: "" },
  { id: "4", slug: "christian-ceremony", name_th: "พิธีคริสเตียน", name_en: "Christian Ceremony", category: "ceremony", base_price: 20000, unit: "per_event", description_th: "จัดพิธีตามแบบคริสเตียน", description_en: "Christian funeral ceremony arrangement", is_active: true, created_at: "" },
  { id: "5", slug: "chinese-ceremony", name_th: "พิธีจีน", name_en: "Chinese Ceremony", category: "ceremony", base_price: 25000, unit: "per_event", description_th: "จัดพิธีตามแบบจีน", description_en: "Chinese funeral ceremony arrangement", is_active: true, created_at: "" },
  { id: "6", slug: "extra-staff", name_th: "เจ้าหน้าที่เพิ่ม", name_en: "Extra Staff", category: "ceremony", base_price: 1200, unit: "per_day", description_th: "เจ้าหน้าที่ดูแลเพิ่ม 1 คน/วัน", description_en: "Additional staff member per day", is_active: true, created_at: "" },
  { id: "7", slug: "premium-flowers", name_th: "ดอกไม้พรีเมียม", name_en: "Premium Flowers", category: "supplies", base_price: 15000, unit: "per_event", description_th: "อัพเกรดดอกไม้หน้าโลง", description_en: "Upgraded coffin flower arrangement", is_active: true, created_at: "" },
  { id: "8", slug: "extra-flower-set", name_th: "ดอกไม้เพิ่ม 1 ชุด", name_en: "Extra Flower Set", category: "supplies", base_price: 8000, unit: "per_event", description_th: "ดอกไม้ตกแต่งเพิ่ม 1 ชุด", description_en: "Additional decorative flower set", is_active: true, created_at: "" },
  { id: "9", slug: "premium-snacks", name_th: "ขนมกล่องพรีเมียม", name_en: "Premium Snack Box", category: "catering", base_price: 150, unit: "per_person", description_th: "ขนมกล่องแบรนด์ (ต่อกล่อง)", description_en: "Branded bakery snack box (per box)", is_active: true, created_at: "" },
  { id: "10", slug: "guest-catering", name_th: "อาหารว่างผู้ร่วมงาน", name_en: "Guest Catering", category: "catering", base_price: 200, unit: "per_person", description_th: "อาหารว่างสำหรับผู้ร่วมงาน (ต่อคน)", description_en: "Refreshments for guests (per person)", is_active: true, created_at: "" },
  { id: "11", slug: "photographer", name_th: "ช่างภาพ", name_en: "Photographer", category: "photography", base_price: 6500, unit: "per_event", description_th: "ช่างภาพถ่ายตลอดงาน", description_en: "Professional photographer throughout ceremony", is_active: true, created_at: "" },
  { id: "12", slug: "videographer", name_th: "ช่างวิดีโอ", name_en: "Videographer", category: "photography", base_price: 12000, unit: "per_event", description_th: "ถ่ายวิดีโอพิธีและตัดต่อ", description_en: "Video recording and editing of ceremony", is_active: true, created_at: "" },
  { id: "13", slug: "memorial-keepsake", name_th: "ของที่ระลึก", name_en: "Memorial Keepsake", category: "memorial", base_price: 6500, unit: "per_event", description_th: "ของที่ระลึกสำหรับผู้ร่วมงาน", description_en: "Memorial keepsakes for attendees", is_active: true, created_at: "" },
];

const categories = ["transport", "ceremony", "supplies", "catering", "photography", "memorial"] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="space-y-10">
          {categories.map((category) => {
            const services = fallbackServices.filter((s) => s.category === category);
            if (services.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full" />
                  {t(`categories.${category}`)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
