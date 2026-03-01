"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import Image from "next/image";

export function ContactContent() {
  const t = useTranslations("contact");

  return (
    <div>
      {/* Header banner with white flowers photo */}
      <div className="relative h-[220px] md:h-[300px] overflow-hidden">
        <Image
          src="/images/white-flowers.jpg"
          alt="White flowers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6" />
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-surface mb-4 tracking-wide">
              {t("title")}
            </h1>
            <p className="text-surface/70 max-w-xl mx-auto text-lg">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Inquiry Form */}
          <FadeIn className="lg:col-span-2" delay={0.1}>
            <Card className="card-gold-top">
              <CardContent className="p-6 md:p-8 pt-8">
                <InquiryForm />
              </CardContent>
            </Card>
          </FadeIn>

          {/* Contact Info Sidebar */}
          <FadeIn className="space-y-5" delay={0.3}>
            {/* Phone */}
            <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors">
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
            <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-success/10 flex items-center justify-center shrink-0 group-hover:bg-success/15 transition-colors">
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
            <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
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
            <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors">
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
            <Card className="group transition-all duration-300 hover:border-secondary/20 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors">
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
          </FadeIn>
        </div>
      </div>
      </div>
    </div>
  );
}
