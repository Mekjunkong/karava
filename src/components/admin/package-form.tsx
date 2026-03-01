"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface PackageFormProps {
  onClose: () => void;
  initialData?: {
    id?: string;
    slug: string;
    name_th: string;
    name_en: string;
    tradition_type: string;
    base_price: number;
    duration_nights: number;
    description_th: string;
    description_en: string;
    display_order: number;
    is_active: boolean;
  };
}

export function PackageForm({ onClose, initialData }: PackageFormProps) {
  const t = useTranslations("admin.packages");
  const [loading, setLoading] = useState(false);

  const traditionOptions = [
    { value: "buddhist", label: "พุทธ" },
    { value: "christian", label: "คริสต์" },
    { value: "chinese", label: "จีน" },
    { value: "secular", label: "ไม่ระบุศาสนา" },
    { value: "custom", label: "กำหนดเอง" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // In production: call server action
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    onClose();
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary">
            {initialData ? t("edit") : t("create")}
          </h3>
          <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="slug" name="slug" label="Slug" required defaultValue={initialData?.slug} placeholder="standard" />
            <Select id="tradition_type" name="tradition_type" label="ศาสนา/ประเพณี" options={traditionOptions} defaultValue={initialData?.tradition_type || "buddhist"} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="name_th" name="name_th" label="ชื่อ (ไทย)" required defaultValue={initialData?.name_th} />
            <Input id="name_en" name="name_en" label="Name (EN)" required defaultValue={initialData?.name_en} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input id="base_price" name="base_price" label="ราคา (฿)" type="number" required defaultValue={initialData?.base_price} />
            <Input id="duration_nights" name="duration_nights" label="จำนวนคืน" type="number" defaultValue={initialData?.duration_nights} />
            <Input id="display_order" name="display_order" label="ลำดับ" type="number" defaultValue={initialData?.display_order} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea id="description_th" name="description_th" label="คำอธิบาย (ไทย)" defaultValue={initialData?.description_th} />
            <Textarea id="description_en" name="description_en" label="Description (EN)" defaultValue={initialData?.description_en} />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="is_active" value="true" defaultChecked={initialData?.is_active !== false} className="rounded" />
              เปิดใช้งาน
            </label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="ghost" onClick={onClose}>ยกเลิก</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
