import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalizedField } from "@/lib/utils";
import type { Testimonial } from "@/lib/database.types";
import { Star, Quote } from "lucide-react";

// Fallback testimonials
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "คุณสมศรี ว.",
    message_th: "ขอบคุณทีมคารวะที่ดูแลพิธีศพคุณแม่อย่างดีมาก ทุกอย่างเรียบร้อย ทีมงานใส่ใจทุกรายละเอียด ทำให้ครอบครัวเราสบายใจมาก",
    message_en: "Thank you to the Karava team for taking such good care of our mother's ceremony. Everything was well-organized. The team paid attention to every detail.",
    rating: 5,
    is_featured: true,
    created_at: "",
  },
  {
    id: "2",
    client_name: "คุณวิชัย พ.",
    message_th: "ใช้บริการแพ็กเกจมาตรฐาน ราคาสมเหตุสมผล ไม่มีค่าใช้จ่ายเพิ่มเติมที่ไม่ได้แจ้งก่อน ทีมงานเป็นมืออาชีพมาก",
    message_en: "Used the Standard package. Fair pricing with no unexpected additional costs. The team was very professional.",
    rating: 5,
    is_featured: true,
    created_at: "",
  },
  {
    id: "3",
    client_name: "คุณนิภา ส.",
    message_th: "ในช่วงเวลาที่ยากลำบาก ทีมคารวะช่วยแบ่งเบาภาระได้มาก ดูแลทุกขั้นตอนจนเสร็จสิ้น ลอยอังคารที่แม่น้ำปิงสวยงามมาก",
    message_en: "During a difficult time, the Karava team helped ease our burden tremendously. The ash floating at the Ping River was beautiful.",
    rating: 5,
    is_featured: true,
    created_at: "",
  },
];

export function Testimonials({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((item) => (
            <Card key={item.id} className="relative">
              <CardContent className="p-6">
                <Quote
                  size={24}
                  className="text-secondary/20 mb-4"
                />

                <p className="text-sm text-muted leading-relaxed mb-4">
                  {getLocalizedField(item, "message", locale)}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {item.client_name}
                  </span>
                  {item.rating && (
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.rating }, (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
