"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
} from "lucide-react";
import { FadeIn, motion } from "@/components/ui/motion";
import Image from "next/image";

const stepIcons = [
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
];

export function ProcessContent() {
  const t = useTranslations("process");
  const tn = useTranslations("nav");

  return (
    <div>
      {/* Header banner with temple night photo */}
      <div className="relative h-[250px] md:h-[340px] overflow-hidden">
        <Image
          src="/images/lotus-white.jpg"
          alt="Lotus flower on peaceful water"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-surface mb-4 tracking-wide">
              {t("title")}
            </h1>
            <p className="text-surface/70 max-w-xl mx-auto text-lg">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div className="relative">
          {/* Timeline gold line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary/50 via-secondary/20 to-secondary/50" />

          <div className="space-y-10 md:space-y-14">
            {Array.from({ length: 13 }, (_, i) => {
              const step = i + 1;
              const Icon = stepIcons[i];

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Step indicator with gold ring */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface border-2 border-secondary/30 flex items-center justify-center shadow-gold transition-all duration-300 hover:border-secondary hover:shadow-gold-lg">
                      <Icon size={20} className="text-secondary md:hidden" />
                      <Icon size={24} className="text-secondary hidden md:block" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block text-xs font-semibold text-secondary bg-secondary/10 rounded-full px-3 py-1">
                        {step.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-primary mb-2 tracking-wide">
                      {t(`steps.${step}.name`)}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {t(`steps.${step}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <FadeIn className="mt-20 text-center" delay={0.2}>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <p className="text-muted mb-6 text-lg">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-secondary px-8 py-3.5 text-white font-medium hover:bg-secondary-light transition-all duration-300 shadow-sm hover:shadow-gold"
          >
            {tn("inquire")}
          </Link>
        </FadeIn>
      </div>
      </div>
    </div>
  );
}
