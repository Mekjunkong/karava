import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-4">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mb-8">
          {t("subheadline")}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-secondary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary-light transition-colors"
        >
          {t("cta")}
        </Link>
      </section>
    </div>
  );
}
