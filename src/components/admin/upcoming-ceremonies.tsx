"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const sampleCeremonies = [
  {
    id: "1",
    family: "ครอบครัว จันทร์",
    venue: "วัดพระสิงห์",
    date: "2026-03-03",
    nights: 3,
    status: "preparing",
    package: "Standard",
  },
  {
    id: "2",
    family: "ครอบครัว วงศ์",
    venue: "วัดสวนดอก",
    date: "2026-03-05",
    nights: 5,
    status: "received",
    package: "Premium",
  },
];

export function UpcomingCeremonies() {
  const t = useTranslations("admin.dashboard");
  const to = useTranslations("admin.orders.status");

  const statusVariants: Record<string, "default" | "secondary" | "success" | "warning"> = {
    received: "secondary",
    preparing: "warning",
    ceremony: "default",
    completed: "success",
  };

  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="font-semibold text-primary mb-4">
          {t("upcomingCeremoniesList")}
        </h3>

        <div className="space-y-4">
          {sampleCeremonies.map((ceremony) => (
            <div
              key={ceremony.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-background"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-primary">
                    {ceremony.family}
                  </span>
                  <Badge variant={statusVariants[ceremony.status]}>
                    {to(ceremony.status as "received" | "preparing" | "ceremony" | "completed")}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {ceremony.venue}
                  </span>
                  <span>{ceremony.date}</span>
                  <span>{ceremony.nights} คืน</span>
                </div>
                <span className="text-xs text-muted">{ceremony.package}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
