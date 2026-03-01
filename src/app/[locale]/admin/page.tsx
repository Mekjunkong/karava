"use client";

import { useTranslations } from "next-intl";
import { StatsCards } from "@/components/admin/stats-cards";
import { RecentInquiries } from "@/components/admin/recent-inquiries";
import { UpcomingCeremonies } from "@/components/admin/upcoming-ceremonies";

export default function AdminDashboardPage() {
  const t = useTranslations("admin.dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentInquiries />
        </div>
        <div>
          <UpcomingCeremonies />
        </div>
      </div>
    </div>
  );
}
