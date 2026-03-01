import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import {
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart
} from "lucide-react";

const stepIcons = [
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
];

export function ProcessSummary() {
  const t = useTranslations("process");

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
            {t("title")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mb-8">
          {Array.from({ length: 13 }, (_, i) => {
            const step = i + 1;
            const Icon = stepIcons[i];
            return (
              <div
                key={step}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-background transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-secondary" />
                </div>
                <span className="text-xs text-muted mb-1">
                  {step.toString().padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-primary leading-tight">
                  {t(`steps.${step}.name`)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-light font-medium transition-colors"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
