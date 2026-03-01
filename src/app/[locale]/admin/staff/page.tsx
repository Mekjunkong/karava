"use client";

import { useTranslations } from "next-intl";
import { StaffTable } from "@/components/admin/staff-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export default function AdminStaffPage() {
  const t = useTranslations("admin.staff");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
        <Button>
          <UserPlus size={16} className="mr-2" />
          {t("create")}
        </Button>
      </div>
      <StaffTable />
    </div>
  );
}
