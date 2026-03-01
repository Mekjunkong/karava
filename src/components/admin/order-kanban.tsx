"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

// Sample order data
const sampleOrders = [
  { id: "ord-1", family: "ครอบครัว จันทร์", venue: "วัดพระสิงห์", date: "2026-03-03", nights: 3, status: "received", package: "Standard", price: 149000 },
  { id: "ord-2", family: "ครอบครัว แก้ว", venue: "วัดเจดีย์หลวง", date: "2026-03-05", nights: 1, status: "received", package: "Basic", price: 79000 },
  { id: "ord-3", family: "ครอบครัว วงศ์", venue: "วัดสวนดอก", date: "2026-03-04", nights: 5, status: "preparing", package: "Premium", price: 249000 },
  { id: "ord-4", family: "ครอบครัว ลิ้ม", venue: "วัดอุโมงค์", date: "2026-03-01", nights: 3, status: "preparing", package: "Custom", price: 180000 },
  { id: "ord-5", family: "ครอบครัว สุข", venue: "วัดพระธาตุดอยสุเทพ", date: "2026-02-28", nights: 3, status: "ceremony", package: "Standard", price: 149000 },
  { id: "ord-6", family: "ครอบครัว ใจดี", venue: "วัดเชียงมั่น", date: "2026-02-25", nights: 3, status: "completed", package: "Standard", price: 149000 },
  { id: "ord-7", family: "ครอบครัว พงศ์", venue: "วัดพันเตา", date: "2026-02-20", nights: 5, status: "completed", package: "Premium", price: 249000 },
];

const columns = [
  { key: "received", color: "border-secondary" },
  { key: "preparing", color: "border-accent" },
  { key: "ceremony", color: "border-primary" },
  { key: "completed", color: "border-success" },
] as const;

export function OrderKanban() {
  const t = useTranslations("admin.orders");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((col) => {
        const orders = sampleOrders.filter((o) => o.status === col.key);

        return (
          <div key={col.key} className="space-y-3">
            <div className={`flex items-center gap-2 pb-2 border-b-2 ${col.color}`}>
              <h3 className="font-semibold text-primary text-sm">
                {t(`status.${col.key}`)}
              </h3>
              <Badge variant="outline">{orders.length}</Badge>
            </div>

            <div className="space-y-3">
              {orders.map((order) => (
                <Link key={order.id} href={`/admin/orders/${order.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-primary text-sm">
                          {order.family}
                        </span>
                        <ChevronRight size={14} className="text-muted" />
                      </div>
                      <div className="space-y-1.5 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          <span>{order.date}</span>
                          <span>({order.nights} คืน)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          <span>{order.venue}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">{order.package}</Badge>
                        <span className="text-xs font-medium text-secondary">
                          {new Intl.NumberFormat("th-TH").format(order.price)} ฿
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
