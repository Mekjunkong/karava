"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderTimeline } from "@/components/admin/order-timeline";
import { ArrowLeft, Calendar, MapPin, Package, Banknote } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Sample order data
const sampleOrder = {
  id: "ord-1",
  family: "ครอบครัว จันทร์",
  contactName: "คุณสมชาย จันทร์",
  phone: "081-234-5678",
  email: "somchai@email.com",
  venue: "วัดพระสิงห์",
  date: "2026-03-03",
  nights: 3,
  status: "preparing",
  package: "Standard",
  tradition: "buddhist",
  totalPrice: 149000,
  depositPaid: 50000,
  balanceRemaining: 99000,
  customNotes: "ต้องการดอกไม้สีขาวเป็นหลัก",
};

export default function OrderDetailPage() {
  const params = useParams();
  const t = useTranslations("admin.orders");
  const order = sampleOrder; // In production: fetch by params.id

  const statusVariants: Record<string, "secondary" | "warning" | "default" | "success"> = {
    received: "secondary",
    preparing: "warning",
    ceremony: "default",
    completed: "success",
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        กลับไปรายการคำสั่งงาน
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">{order.family}</h1>
          <p className="text-muted">{order.contactName} | {order.phone}</p>
        </div>
        <Badge variant={statusVariants[order.status]} className="text-sm px-4 py-1">
          {t(`status.${order.status as "received" | "preparing" | "ceremony" | "completed"}`)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-primary mb-4">{t("details")}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-secondary mt-0.5" />
                  <div>
                    <span className="text-xs text-muted block">วันเริ่มพิธี</span>
                    <span className="text-sm text-primary">{order.date} ({order.nights} คืน)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-secondary mt-0.5" />
                  <div>
                    <span className="text-xs text-muted block">สถานที่</span>
                    <span className="text-sm text-primary">{order.venue}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package size={16} className="text-secondary mt-0.5" />
                  <div>
                    <span className="text-xs text-muted block">แพ็กเกจ</span>
                    <span className="text-sm text-primary">{order.package}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <Banknote size={16} className="text-secondary" />
                การเงิน
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">ราคารวม</span>
                  <span className="font-medium text-primary">{formatPrice(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">มัดจำแล้ว</span>
                  <span className="text-success">{formatPrice(order.depositPaid)}</span>
                </div>
                <div className="flex justify-between border-t border-muted/10 pt-2">
                  <span className="text-muted font-medium">ยอดคงเหลือ</span>
                  <span className="font-semibold text-secondary">{formatPrice(order.balanceRemaining)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.customNotes && (
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-primary mb-2">หมายเหตุ</h3>
                <p className="text-sm text-muted bg-background rounded-lg p-3">
                  {order.customNotes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 13-Step Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-5">
              <OrderTimeline />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
