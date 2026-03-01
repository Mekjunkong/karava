"use client";

import { useTranslations } from "next-intl";
import {
  CheckCircle, Users, Globe, Banknote, Clock, MapPin,
} from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/motion";

const items = [
  { key: "complete", icon: CheckCircle },
  { key: "professional", icon: Users },
  { key: "allTraditions", icon: Globe },
  { key: "transparent", icon: Banknote },
  { key: "available", icon: Clock },
  { key: "chiangmai", icon: MapPin },
] as const;

export function WhySanti() {
  const t = useTranslations("whySanti");

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4 tracking-wide">
            {t("title")}
          </h2>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {items.map(({ key, icon: Icon }) => (
            <StaggerItem
              key={key}
              className="group relative rounded-xl p-6 transition-all duration-300 hover:bg-surface hover:shadow-lg hover:border-secondary/10 border border-transparent"
            >
              {/* Large faded icon background */}
              <div className="absolute top-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                <Icon size={80} className="text-secondary" />
              </div>

              <div className="relative flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/15 transition-colors duration-300">
                  <Icon size={22} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2 text-lg">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
