"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export function InquiryCta() {
  const t = useTranslations("inquiryCta");

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-2xl bg-primary overflow-hidden">
            {/* Subtle gold gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10" />

            {/* Pattern texture */}
            <div className="absolute inset-0 bg-pattern opacity-30" />

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-secondary/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-secondary/20 rounded-br-2xl" />

            <div className="relative p-10 md:p-16 lg:p-20 text-center">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent mx-auto mb-8" />

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-surface mb-4 tracking-wide">
                {t("title")}
              </h2>
              <p className="text-surface/60 max-w-xl mx-auto mb-10 text-lg">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+66929894495"
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3.5 text-white font-medium hover:bg-secondary-light transition-all duration-300 shadow-gold hover:shadow-gold-lg"
                >
                  <Phone size={18} />
                  {t("phone")}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-surface/20 px-8 py-3.5 text-surface font-medium hover:bg-surface/10 transition-all duration-300"
                >
                  <MessageCircle size={18} />
                  {t("line")}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
