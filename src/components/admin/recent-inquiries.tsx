"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

// Sample data for display
const sampleInquiries = [
  { id: "1", name: "คุณสมชาย จ.", phone: "081-234-5678", status: "new", date: "2026-03-01", package: "Standard" },
  { id: "2", name: "คุณวิภา ม.", phone: "089-876-5432", status: "contacted", date: "2026-02-28", package: "Premium" },
  { id: "3", name: "คุณประเสริฐ ว.", phone: "092-111-2222", status: "new", date: "2026-02-28", package: "Basic" },
  { id: "4", name: "Mr. John S.", phone: "084-555-6666", status: "quoted", date: "2026-02-27", package: "Custom" },
  { id: "5", name: "คุณนารี ล.", phone: "095-333-4444", status: "confirmed", date: "2026-02-27", package: "Standard" },
];

const statusVariants: Record<string, "default" | "secondary" | "success" | "warning" | "error"> = {
  new: "secondary",
  contacted: "warning",
  quoted: "default",
  confirmed: "success",
  cancelled: "error",
};

export function RecentInquiries() {
  const t = useTranslations("admin.dashboard");
  const ts = useTranslations("admin.inquiries.status");

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary">{t("recentInquiries")}</h3>
          <Link
            href="/admin/inquiries"
            className="text-sm text-secondary hover:text-secondary-light transition-colors"
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-muted/10">
                <th className="pb-2 font-medium">ชื่อ</th>
                <th className="pb-2 font-medium">โทร</th>
                <th className="pb-2 font-medium">แพ็กเกจ</th>
                <th className="pb-2 font-medium">สถานะ</th>
                <th className="pb-2 font-medium">วันที่</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/5">
              {sampleInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-background/50">
                  <td className="py-3 font-medium text-primary">{inq.name}</td>
                  <td className="py-3 text-muted">{inq.phone}</td>
                  <td className="py-3 text-muted">{inq.package}</td>
                  <td className="py-3">
                    <Badge variant={statusVariants[inq.status]}>
                      {ts(inq.status as "new" | "contacted" | "quoted" | "confirmed" | "cancelled")}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted">{inq.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
