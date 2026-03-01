import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
} from "lucide-react";

const stepIcons = [
  MessageCircle, Building, Truck, Package, Droplets, Flower2,
  BookOpen, Music, Sun, Flame, Gem, Waves, Heart,
];

export default function ProcessPage() {
  const t = useTranslations("process");
  const tn = useTranslations("nav");

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-muted/15" />

          <div className="space-y-8 md:space-y-12">
            {Array.from({ length: 13 }, (_, i) => {
              const step = i + 1;
              const Icon = stepIcons[i];

              return (
                <div key={step} className="relative flex gap-6 md:gap-8">
                  {/* Step indicator */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center">
                      <Icon size={20} className="text-secondary md:hidden" />
                      <Icon size={24} className="text-secondary hidden md:block" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-secondary bg-secondary/10 rounded-full px-2.5 py-0.5">
                        {step.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                      {t(`steps.${step}.name`)}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {t(`steps.${step}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-4">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-secondary px-8 py-3 text-white font-medium hover:bg-secondary-light transition-colors"
          >
            {tn("inquire")}
          </Link>
        </div>
      </div>
    </div>
  );
}
