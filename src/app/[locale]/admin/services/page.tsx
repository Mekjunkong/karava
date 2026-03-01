"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceForm } from "@/components/admin/service-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const sampleServices = [
  { id: "1", slug: "body-transport", name_th: "รับ-ส่งศพ", name_en: "Body Transport", category: "transport", base_price: 5000, unit: "per_event", is_active: true },
  { id: "2", slug: "extra-transport", name_th: "รถรับ-ส่งครอบครัว", name_en: "Family Transport", category: "transport", base_price: 3000, unit: "per_day", is_active: true },
  { id: "3", slug: "photographer", name_th: "ช่างภาพ", name_en: "Photographer", category: "photography", base_price: 6500, unit: "per_event", is_active: true },
  { id: "4", slug: "videographer", name_th: "ช่างวิดีโอ", name_en: "Videographer", category: "photography", base_price: 12000, unit: "per_event", is_active: true },
  { id: "5", slug: "premium-flowers", name_th: "ดอกไม้พรีเมียม", name_en: "Premium Flowers", category: "supplies", base_price: 15000, unit: "per_event", is_active: true },
  { id: "6", slug: "extra-night", name_th: "สวดเพิ่ม 1 คืน", name_en: "Extra Chanting Night", category: "ceremony", base_price: 15000, unit: "per_event", is_active: true },
  { id: "7", slug: "memorial-keepsake", name_th: "ของที่ระลึก", name_en: "Memorial Keepsake", category: "memorial", base_price: 6500, unit: "per_event", is_active: true },
];

const unitLabels: Record<string, string> = {
  per_event: "ต่อครั้ง",
  per_day: "ต่อวัน",
  per_person: "ต่อคน",
};

export default function AdminServicesPage() {
  const t = useTranslations("admin.services");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          {t("create")}
        </Button>
      </div>

      {showForm && <ServiceForm onClose={() => setShowForm(false)} />}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-muted/10">
                  <th className="p-4 font-medium">ชื่อ</th>
                  <th className="p-4 font-medium">หมวดหมู่</th>
                  <th className="p-4 font-medium">ราคา</th>
                  <th className="p-4 font-medium">หน่วย</th>
                  <th className="p-4 font-medium">สถานะ</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/5">
                {sampleServices.map((svc) => (
                  <tr key={svc.id} className="hover:bg-background/50">
                    <td className="p-4">
                      <div className="font-medium text-primary">{svc.name_th}</div>
                      <div className="text-xs text-muted">{svc.name_en}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{svc.category}</Badge>
                    </td>
                    <td className="p-4 text-secondary font-medium">
                      {formatPrice(svc.base_price)}
                    </td>
                    <td className="p-4 text-muted">{unitLabels[svc.unit]}</td>
                    <td className="p-4">
                      <Badge variant={svc.is_active ? "success" : "error"}>
                        {svc.is_active ? "เปิด" : "ปิด"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost">
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-error">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
