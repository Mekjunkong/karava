import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata("contact", locale);
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t("title")}
          </h1>
          <p className="text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                <InquiryForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Phone */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      {t("info.phone")}
                    </h3>
                    <a
                      href="tel:+66929894495"
                      className="text-secondary hover:text-secondary-light transition-colors"
                    >
                      {t("info.phoneNumber")}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LINE */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      {t("info.line")}
                    </h3>
                    <span className="text-muted">{t("info.lineId")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      {t("info.email")}
                    </h3>
                    <a
                      href="mailto:info@karava.co.th"
                      className="text-secondary hover:text-secondary-light transition-colors"
                    >
                      {t("info.emailAddress")}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      {t("info.hours")}
                    </h3>
                    <span className="text-muted">{t("info.hoursDetail")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Area */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      {t("info.area")}
                    </h3>
                    <span className="text-muted">{t("info.areaDetail")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
