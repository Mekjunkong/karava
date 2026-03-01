import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Shield, MapPin } from "lucide-react";

const values = [
  { key: "respect", icon: Heart },
  { key: "care", icon: Eye },
  { key: "transparency", icon: Shield },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");
  const tn = useTranslations("nav");

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-xl text-muted">{t("subtitle")}</p>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center">
            <div className="w-12 h-0.5 bg-secondary mx-auto mb-8" />
            <h2 className="text-2xl font-semibold text-primary mb-6">
              {t("story.title")}
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              {t("story.content")}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-primary text-center mb-10">
            {t("values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ key, icon: Icon }) => (
              <Card key={key}>
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {t(`values.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage area */}
        <div className="rounded-2xl bg-surface border border-muted/10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <MapPin size={28} className="text-secondary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-primary mb-2">
                {t("coverage.title")}
              </h2>
              <p className="text-muted">{t("coverage.description")}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-white font-medium hover:bg-secondary-light transition-colors shrink-0"
            >
              {tn("inquire")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
