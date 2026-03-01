"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/admin/package-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const samplePackages = [
  { id: "1", slug: "basic", name_th: "แพ็กเกจพื้นฐาน", name_en: "Basic Package", tradition_type: "buddhist", base_price: 79000, duration_nights: 1, description_th: "พิธีศพแบบเรียบง่าย", description_en: "Simple funeral", display_order: 1, is_active: true },
  { id: "2", slug: "standard", name_th: "แพ็กเกจมาตรฐาน", name_en: "Standard Package", tradition_type: "buddhist", base_price: 149000, duration_nights: 3, description_th: "พิธีศพครบวงจร", description_en: "Full ceremony", display_order: 2, is_active: true },
  { id: "3", slug: "premium", name_th: "แพ็กเกจพรีเมียม", name_en: "Premium Package", tradition_type: "buddhist", base_price: 249000, duration_nights: 5, description_th: "พิธีศพระดับพรีเมียม", description_en: "Premium ceremony", display_order: 3, is_active: true },
  { id: "4", slug: "custom", name_th: "แพ็กเกจกำหนดเอง", name_en: "Custom Package", tradition_type: "custom", base_price: 0, duration_nights: 0, description_th: "ออกแบบตามต้องการ", description_en: "Fully customizable", display_order: 4, is_active: true },
];

export default function AdminPackagesPage() {
  const t = useTranslations("admin.packages");
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

      {showForm && <PackageForm onClose={() => setShowForm(false)} />}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-muted/10">
                  <th className="p-4 font-medium">ลำดับ</th>
                  <th className="p-4 font-medium">ชื่อ</th>
                  <th className="p-4 font-medium">ศาสนา</th>
                  <th className="p-4 font-medium">ราคา</th>
                  <th className="p-4 font-medium">คืน</th>
                  <th className="p-4 font-medium">สถานะ</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/5">
                {samplePackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-background/50">
                    <td className="p-4 text-muted">{pkg.display_order}</td>
                    <td className="p-4">
                      <div className="font-medium text-primary">{pkg.name_th}</div>
                      <div className="text-xs text-muted">{pkg.name_en}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{pkg.tradition_type}</Badge>
                    </td>
                    <td className="p-4 text-secondary font-medium">
                      {pkg.base_price > 0 ? formatPrice(pkg.base_price) : "-"}
                    </td>
                    <td className="p-4 text-muted">{pkg.duration_nights || "-"}</td>
                    <td className="p-4">
                      <Badge variant={pkg.is_active ? "success" : "error"}>
                        {pkg.is_active ? "เปิด" : "ปิด"}
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
