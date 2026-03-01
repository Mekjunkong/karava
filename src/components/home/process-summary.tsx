"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import {
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart
} from "lucide-react";
import { FadeIn, motion } from "@/components/ui/motion";

const stepIcons = [
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
];

// Show only first 5 steps on homepage as a summary
const SUMMARY_STEPS = 5;

export function ProcessSummary() {
  const t = useTranslations("process");

  return (
    <section className="py-20 lg:py-32 bg-surface relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4 tracking-wide">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical gold line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-secondary/40 via-secondary/20 to-secondary/40" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-secondary/40" />

          <div className="space-y-12 md:space-y-16">
            {Array.from({ length: SUMMARY_STEPS }, (_, i) => {
              const step = i + 1;
              const Icon = stepIcons[i];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="relative"
                >
                  {/* Desktop: Alternating layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* Left side */}
                    <div className={`${isEven ? "text-right pr-12" : "order-2 pl-12"}`}>
                      <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 rounded-full px-3 py-1 mb-3">
                        {step.toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {t(`steps.${step}.name`)}
                      </h3>
                    </div>

                    {/* Right side (or left if even) */}
                    <div className={`${isEven ? "order-2 pl-12" : "text-right pr-12 order-1"}`}>
                      {/* Empty space for alternating effect */}
                    </div>

                    {/* Center circle */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-14 h-14 rounded-full bg-surface border-2 border-secondary/30 flex items-center justify-center shadow-gold">
                        <Icon size={22} className="text-secondary" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Left-aligned timeline */}
                  <div className="md:hidden flex gap-6">
                    {/* Circle */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-surface border-2 border-secondary/30 flex items-center justify-center shadow-sm">
                        <Icon size={18} className="text-secondary" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 rounded-full px-2.5 py-0.5 mb-2">
                        {step.toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-primary">
                        {t(`steps.${step}.name`)}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <FadeIn className="text-center mt-16" delay={0.2}>
          <Link
            href="/process"
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
