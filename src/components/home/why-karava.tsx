import { useTranslations } from "next-intl";
import {
  CheckCircle, Users, Globe, Banknote, Clock, MapPin,
} from "lucide-react";

const items = [
  { key: "complete", icon: CheckCircle },
  { key: "professional", icon: Users },
  { key: "allTraditions", icon: Globe },
  { key: "transparent", icon: Banknote },
  { key: "available", icon: Clock },
  { key: "chiangmai", icon: MapPin },
] as const;

export function WhyKarava() {
  const t = useTranslations("whyKarava");

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(({ key, icon: Icon }) => (
            <div key={key} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
