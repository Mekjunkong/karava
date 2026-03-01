"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ArrowRightLeft } from "lucide-react";

// Sample inquiries data
const sampleInquiries = [
  { id: "1", contact_name: "คุณสมชาย จันทร์", phone: "081-234-5678", email: "somchai@email.com", line_id: "@somchai", status: "new", tradition_preference: "buddhist", package_interest: "Standard", message: "ต้องการจัดงานศพให้คุณพ่อ", created_at: "2026-03-01", source: "website" },
  { id: "2", contact_name: "คุณวิภา มาลี", phone: "089-876-5432", email: null, line_id: null, status: "contacted", tradition_preference: "buddhist", package_interest: "Premium", message: "สอบถามราคาแพ็กเกจพรีเมียม", created_at: "2026-02-28", source: "line" },
  { id: "3", contact_name: "คุณประเสริฐ วงศ์", phone: "092-111-2222", email: "prasert@email.com", line_id: null, status: "new", tradition_preference: "chinese", package_interest: "Custom", message: "ต้องการจัดงานแบบจีน", created_at: "2026-02-28", source: "phone" },
  { id: "4", contact_name: "Mr. John Smith", phone: "084-555-6666", email: "john@email.com", line_id: null, status: "quoted", tradition_preference: "christian", package_interest: "Custom", message: "Need Christian funeral service", created_at: "2026-02-27", source: "website" },
  { id: "5", contact_name: "คุณนารี ลิ้ม", phone: "095-333-4444", email: null, line_id: "@naree", status: "confirmed", tradition_preference: "buddhist", package_interest: "Standard", message: "ยืนยันจอง", created_at: "2026-02-27", source: "website" },
];

const statusVariants: Record<string, "default" | "secondary" | "success" | "warning" | "error"> = {
  new: "secondary",
  contacted: "warning",
  quoted: "default",
  confirmed: "success",
  cancelled: "error",
};

const statuses = ["new", "contacted", "quoted", "confirmed", "cancelled"] as const;

export function InquiryTable() {
  const t = useTranslations("admin.inquiries");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? sampleInquiries
      : sampleInquiries.filter((i) => i.status === filter);

  const selected = sampleInquiries.find((i) => i.id === selectedId);

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filter === "all" ? "bg-primary text-white" : "bg-surface border border-muted/20 text-muted hover:text-primary"
          }`}
        >
          ทั้งหมด ({sampleInquiries.length})
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === status ? "bg-primary text-white" : "bg-surface border border-muted/20 text-muted hover:text-primary"
            }`}
          >
            {t(`status.${status}`)} ({sampleInquiries.filter((i) => i.status === status).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted border-b border-muted/10">
                      <th className="p-4 font-medium">ชื่อ</th>
                      <th className="p-4 font-medium">โทร</th>
                      <th className="p-4 font-medium">แพ็กเกจ</th>
                      <th className="p-4 font-medium">แหล่ง</th>
                      <th className="p-4 font-medium">สถานะ</th>
                      <th className="p-4 font-medium">วันที่</th>
                      <th className="p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/5">
                    {filtered.map((inq) => (
                      <tr
                        key={inq.id}
                        className={`hover:bg-background/50 cursor-pointer ${
                          selectedId === inq.id ? "bg-secondary/5" : ""
                        }`}
                        onClick={() => setSelectedId(inq.id)}
                      >
                        <td className="p-4 font-medium text-primary">{inq.contact_name}</td>
                        <td className="p-4 text-muted">{inq.phone}</td>
                        <td className="p-4 text-muted">{inq.package_interest}</td>
                        <td className="p-4">
                          <Badge variant="outline">{inq.source}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={statusVariants[inq.status]}>
                            {t(`status.${inq.status as "new" | "contacted" | "quoted" | "confirmed" | "cancelled"}`)}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted">{inq.created_at}</td>
                        <td className="p-4">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedId(inq.id)}>
                            <Eye size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-primary text-lg">{selected.contact_name}</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">โทร:</span>
                    <span className="text-primary">{selected.phone}</span>
                  </div>
                  {selected.email && (
                    <div className="flex justify-between">
                      <span className="text-muted">อีเมล:</span>
                      <span className="text-primary">{selected.email}</span>
                    </div>
                  )}
                  {selected.line_id && (
                    <div className="flex justify-between">
                      <span className="text-muted">LINE:</span>
                      <span className="text-primary">{selected.line_id}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted">ศาสนา:</span>
                    <span className="text-primary">{selected.tradition_preference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">แพ็กเกจ:</span>
                    <span className="text-primary">{selected.package_interest}</span>
                  </div>
                </div>

                {selected.message && (
                  <div>
                    <span className="text-xs text-muted">ข้อความ:</span>
                    <p className="text-sm text-primary mt-1 bg-background rounded-lg p-3">
                      {selected.message}
                    </p>
                  </div>
                )}

                <div className="pt-2 space-y-2">
                  <Button size="sm" className="w-full" variant="primary">
                    <ArrowRightLeft size={14} className="mr-2" />
                    {t("convertToOrder")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted">
                เลือกรายการเพื่อดูรายละเอียด
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
