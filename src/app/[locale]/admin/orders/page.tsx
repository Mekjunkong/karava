"use client";

import { useTranslations } from "next-intl";
import { OrderKanban } from "@/components/admin/order-kanban";

export default function AdminOrdersPage() {
  const t = useTranslations("admin.orders");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
      <OrderKanban />
    </div>
  );
}
