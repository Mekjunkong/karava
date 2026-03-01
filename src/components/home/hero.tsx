"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";
import { motion } from "@/components/ui/motion";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Dark gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/80" />

      {/* Subtle pattern texture */}
      <div className="absolute inset-0 bg-pattern opacity-40" />

      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Decorative gold line above subtitle */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mb-8"
          />

          {/* Main heading - Cormorant Garamond */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-surface leading-tight mb-6 tracking-wide"
          >
            {t("headline")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="text-lg md:text-xl text-surface/60 max-w-2xl mb-12 leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-secondary px-8 py-4 text-lg font-medium text-white hover:bg-secondary-light transition-all duration-300 shadow-gold hover:shadow-gold-lg"
            >
              {t("cta")}
            </Link>
            <a
              href="tel:+66929894495"
              className="inline-flex items-center gap-2 rounded-lg border border-surface/20 px-6 py-4 text-surface/80 hover:text-surface hover:border-surface/40 transition-all duration-300"
            >
              <Phone size={18} />
              <span>{t("phone")}</span>
            </a>
          </motion.div>

          {/* Availability text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 text-sm text-surface/40 tracking-wide"
          >
            {t("available")}
          </motion.p>
        </div>
      </div>

      {/* Bottom decorative gold gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Decorative corner elements */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-secondary/10 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-secondary/10 hidden lg:block" />
    </section>
  );
}
