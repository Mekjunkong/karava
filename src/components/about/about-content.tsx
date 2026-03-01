"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Shield, MapPin } from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/motion";
import Image from "next/image";

const values = [
  { key: "respect", icon: Heart },
  { key: "care", icon: Eye },
  { key: "transparency", icon: Shield },
] as const;

export function AboutContent() {
  const t = useTranslations("about");
  const tn = useTranslations("nav");

  return (
    <div>
      {/* Hero banner with monks photo */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/images/monks.jpg"
          alt="Buddhist monks in Thailand"
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
            <p className="text-xl text-surface/70">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Story */}
        <FadeIn className="max-w-3xl mx-auto mb-24" delay={0.2}>
          <div className="text-center">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-8" />
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-6 tracking-wide">
              {t("story.title")}
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              {t("story.content")}
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <div className="mb-24">
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary tracking-wide">
              {t("values.title")}
            </h2>
          </FadeIn>

          {/* Accent image */}
          <FadeIn className="mb-12" delay={0.1}>
            <div className="relative h-[200px] md:h-[280px] rounded-2xl overflow-hidden">
              <Image
                src="/images/flowers-arrangement.jpg"
                alt="Flower arrangement"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ key, icon: Icon }) => (
              <StaggerItem key={key}>
                <Card className="card-gold-top transition-all duration-300 hover:shadow-lg hover:border-secondary/20">
                  <CardContent className="p-8 pt-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                      <Icon size={28} className="text-secondary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-3 tracking-wide">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>

        {/* Coverage area */}
        <FadeIn>
          <div className="relative rounded-2xl bg-surface border border-muted/10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40" />
            <div className="p-10 md:p-14">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin size={28} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-2 tracking-wide">
                    {t("coverage.title")}
                  </h2>
                  <p className="text-muted">{t("coverage.description")}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-white font-medium hover:bg-secondary-light transition-all duration-300 shadow-sm hover:shadow-gold shrink-0"
                >
                  {tn("inquire")}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      </div>
    </div>
  );
}
