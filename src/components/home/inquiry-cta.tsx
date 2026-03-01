import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, MessageCircle } from "lucide-react";

export function InquiryCta() {
  const t = useTranslations("inquiryCta");

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-surface mb-3">
            {t("title")}
          </h2>
          <p className="text-surface/70 max-w-xl mx-auto mb-8">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+66929894495"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-white font-medium hover:bg-secondary-light transition-colors"
            >
              <Phone size={18} />
              {t("phone")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-surface/20 px-6 py-3 text-surface font-medium hover:bg-surface/10 transition-colors"
            >
              <MessageCircle size={18} />
              {t("line")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
