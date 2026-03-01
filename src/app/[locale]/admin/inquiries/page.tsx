"use client";

import { useTranslations } from "next-intl";
import { InquiryTable } from "@/components/admin/inquiry-table";

export default function AdminInquiriesPage() {
  const t = useTranslations("admin.inquiries");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
      <InquiryTable />
    </div>
  );
}
