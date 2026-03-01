import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Decorative line */}
          <div className="w-12 h-0.5 bg-secondary mb-8" />

          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-primary leading-tight mb-6">
            {t("headline")}
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            {t("subheadline")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-secondary px-8 py-3.5 text-lg font-medium text-white hover:bg-secondary-light transition-colors"
            >
              {t("cta")}
            </Link>
            <a
              href="tel:0XXXXXXXX"
              className="inline-flex items-center gap-2 rounded-lg border border-muted/20 px-6 py-3.5 text-muted hover:text-primary hover:border-muted/40 transition-colors"
            >
              <Phone size={18} />
              <span>{t("phone")}</span>
            </a>
          </div>

          <p className="mt-6 text-sm text-muted/80">{t("available")}</p>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
    </section>
  );
}
