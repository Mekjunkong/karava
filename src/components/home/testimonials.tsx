"use client";

import { useTranslations, useLocale } from "next-intl";
import { getLocalizedField } from "@/lib/utils";
import type { Testimonial } from "@/lib/database.types";
import { Star } from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/motion";

// Fallback testimonials
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "คุณสมศรี ว.",
    message_th: "ขอบคุณทีมศานติที่ดูแลพิธีศพคุณแม่อย่างดีมาก ทุกอย่างเรียบร้อย ทีมงานใส่ใจทุกรายละเอียด ทำให้ครอบครัวเราสบายใจมาก",
    message_en: "Thank you to the Santi Funeral team for taking such good care of our mother's ceremony. Everything was well-organized. The team paid attention to every detail.",
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
    message_th: "ในช่วงเวลาที่ยากลำบาก ทีมศานติช่วยแบ่งเบาภาระได้มาก ดูแลทุกขั้นตอนจนเสร็จสิ้น ลอยอังคารที่แม่น้ำปิงสวยงามมาก",
    message_en: "During a difficult time, the Santi Funeral team helped ease our burden tremendously. The ash floating at the Ping River was beautiful.",
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
    <section className="py-20 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4 tracking-wide">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">{t("subtitle")}</p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((item) => (
            <StaggerItem
              key={item.id}
              className="relative rounded-xl border border-muted/10 bg-surface p-8 transition-all duration-300 hover:shadow-lg hover:border-secondary/20"
            >
              {/* Large decorative gold quotation mark */}
              <div className="absolute -top-3 left-6">
                <span className="font-serif text-6xl text-secondary/20 leading-none select-none">
                  &ldquo;
                </span>
              </div>

              {/* Quote text */}
              <p className="font-serif text-lg text-primary/80 leading-relaxed mb-6 mt-4 italic">
                {getLocalizedField(item, "message", locale)}
              </p>

              {/* Bottom section */}
              <div className="flex items-center justify-between pt-4 border-t border-muted/10">
                <span className="text-sm font-semibold text-primary">
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

              {/* Closing quotation mark */}
              <div className="absolute -bottom-2 right-6">
                <span className="font-serif text-6xl text-secondary/20 leading-none select-none">
                  &rdquo;
                </span>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
