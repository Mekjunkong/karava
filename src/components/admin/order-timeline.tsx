"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Clock, Play } from "lucide-react";

interface TimelineStep {
  id: string;
  step_number: number;
  step_name_th: string;
  step_name_en: string;
  status: "pending" | "in_progress" | "completed";
  notes: string | null;
  completed_at: string | null;
}

// Sample timeline data
const sampleTimeline: TimelineStep[] = [
  { id: "t1", step_number: 1, step_name_th: "ปรึกษาและรับเรื่อง", step_name_en: "Consultation & Intake", status: "completed", notes: "ติดต่อครอบครัวแล้ว", completed_at: "2026-03-01T10:00:00" },
  { id: "t2", step_number: 2, step_name_th: "จองศาลา/สถานที่", step_name_en: "Venue/Temple Booking", status: "completed", notes: "จองศาลาวัดพระสิงห์ 3 คืน", completed_at: "2026-03-01T14:00:00" },
  { id: "t3", step_number: 3, step_name_th: "รับศพจากโรงพยาบาล", step_name_en: "Body Collection", status: "completed", notes: null, completed_at: "2026-03-02T08:00:00" },
  { id: "t4", step_number: 4, step_name_th: "เตรียมโลงและตกแต่ง", step_name_en: "Coffin Preparation", status: "in_progress", notes: null, completed_at: null },
  { id: "t5", step_number: 5, step_name_th: "พิธีรดน้ำศพ", step_name_en: "Water Blessing Ceremony", status: "pending", notes: null, completed_at: null },
  { id: "t6", step_number: 6, step_name_th: "จัดดอกไม้หน้าโลง", step_name_en: "Coffin Flower Arrangement", status: "pending", notes: null, completed_at: null },
  { id: "t7", step_number: 7, step_name_th: "เตรียมเครื่องไทยธรรม", step_name_en: "Merit Items Preparation", status: "pending", notes: null, completed_at: null },
  { id: "t8", step_number: 8, step_name_th: "สวดพระอภิธรรม", step_name_en: "Nightly Chanting", status: "pending", notes: null, completed_at: null },
  { id: "t9", step_number: 9, step_name_th: "พิธีทำบุญเช้า", step_name_en: "Morning Merit Ceremony", status: "pending", notes: null, completed_at: null },
  { id: "t10", step_number: 10, step_name_th: "พิธีฌาปนกิจ", step_name_en: "Cremation Ceremony", status: "pending", notes: null, completed_at: null },
  { id: "t11", step_number: 11, step_name_th: "เก็บอัฐิ", step_name_en: "Ash Collection", status: "pending", notes: null, completed_at: null },
  { id: "t12", step_number: 12, step_name_th: "ลอยอังคาร", step_name_en: "Ash Floating", status: "pending", notes: null, completed_at: null },
  { id: "t13", step_number: 13, step_name_th: "ส่งมอบและติดตาม", step_name_en: "Handover & Follow-up", status: "pending", notes: null, completed_at: null },
];

const statusIcons = {
  pending: Clock,
  in_progress: Play,
  completed: Check,
};

const statusColors = {
  pending: "text-muted bg-muted/10",
  in_progress: "text-secondary bg-secondary/10",
  completed: "text-success bg-success/10",
};

export function OrderTimeline() {
  const t = useTranslations("admin.orders");
  const locale = useLocale();
  const [steps, setSteps] = useState(sampleTimeline);

  function handleStepClick(stepId: string) {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id !== stepId) return step;
        const nextStatus =
          step.status === "pending"
            ? "in_progress"
            : step.status === "in_progress"
            ? "completed"
            : "pending";
        return {
          ...step,
          status: nextStatus,
          completed_at:
            nextStatus === "completed" ? new Date().toISOString() : null,
        };
      })
    );
  }

  const completedCount = steps.filter((s) => s.status === "completed").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-primary">{t("timeline")}</h3>
        <Badge variant={completedCount === 13 ? "success" : "secondary"}>
          {completedCount}/13
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted/10 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / 13) * 100}%` }}
        />
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const StatusIcon = statusIcons[step.status];
          const name = locale === "en" ? step.step_name_en : step.step_name_th;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-background",
                step.status === "in_progress" && "bg-secondary/5"
              )}
              onClick={() => handleStepClick(step.id)}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  statusColors[step.status]
                )}
              >
                <StatusIcon size={14} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {step.step_number.toString().padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      step.status === "completed"
                        ? "text-muted line-through"
                        : "text-primary"
                    )}
                  >
                    {name}
                  </span>
                </div>
                {step.notes && (
                  <p className="text-xs text-muted mt-0.5">{step.notes}</p>
                )}
              </div>

              {step.completed_at && (
                <span className="text-xs text-muted shrink-0">
                  {new Date(step.completed_at).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
