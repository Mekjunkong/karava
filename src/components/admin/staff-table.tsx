"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, UserX, UserCheck } from "lucide-react";

const sampleStaff = [
  { id: "s1", name: "คุณสมศักดิ์ ดี", role: "admin", phone: "081-111-1111", email: "somsak@karava.co.th", is_active: true },
  { id: "s2", name: "คุณวรรณา สุข", role: "coordinator", phone: "082-222-2222", email: "wanna@karava.co.th", is_active: true },
  { id: "s3", name: "คุณชาตรี กล้า", role: "coordinator", phone: "083-333-3333", email: "chatri@karava.co.th", is_active: true },
  { id: "s4", name: "คุณสมพร มั่น", role: "driver", phone: "084-444-4444", email: null, is_active: true },
  { id: "s5", name: "คุณประสิทธิ์ เจริญ", role: "driver", phone: "085-555-5555", email: null, is_active: false },
];

const roleVariants: Record<string, "secondary" | "default" | "outline"> = {
  admin: "secondary",
  coordinator: "default",
  driver: "outline",
};

export function StaffTable() {
  const t = useTranslations("admin.staff");

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-muted/10">
                <th className="p-4 font-medium">ชื่อ</th>
                <th className="p-4 font-medium">ตำแหน่ง</th>
                <th className="p-4 font-medium">โทร</th>
                <th className="p-4 font-medium">อีเมล</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/5">
              {sampleStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-background/50">
                  <td className="p-4 font-medium text-primary">{staff.name}</td>
                  <td className="p-4">
                    <Badge variant={roleVariants[staff.role]}>
                      {t(`role.${staff.role as "admin" | "coordinator" | "driver"}`)}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted">{staff.phone}</td>
                  <td className="p-4 text-muted">{staff.email || "-"}</td>
                  <td className="p-4">
                    <Badge variant={staff.is_active ? "success" : "error"}>
                      {staff.is_active ? "ใช้งาน" : "ปิดการใช้งาน"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost">
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" className={staff.is_active ? "text-error" : "text-success"}>
                        {staff.is_active ? <UserX size={14} /> : <UserCheck size={14} />}
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
  );
}
