"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ClipboardList, Calendar, CheckCircle } from "lucide-react";

interface StatsData {
  newInquiries: number;
  activeOrders: number;
  upcomingCeremonies: number;
  completedThisMonth: number;
}

export function StatsCards({ stats }: { stats?: StatsData }) {
  const t = useTranslations("admin.dashboard");

  const data = stats || {
    newInquiries: 3,
    activeOrders: 5,
    upcomingCeremonies: 2,
    completedThisMonth: 8,
  };

  const cards = [
    {
      label: t("newInquiries"),
      value: data.newInquiries,
      icon: MessageSquare,
      color: "text-secondary bg-secondary/10",
    },
    {
      label: t("activeOrders"),
      value: data.activeOrders,
      icon: ClipboardList,
      color: "text-accent bg-accent/10",
    },
    {
      label: t("upcomingCeremonies"),
      value: data.upcomingCeremonies,
      icon: Calendar,
      color: "text-primary bg-primary/10",
    },
    {
      label: t("completedThisMonth"),
      value: data.completedThisMonth,
      icon: CheckCircle,
      color: "text-success bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-primary">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon size={22} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
