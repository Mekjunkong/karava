"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatusAction(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function assignStaffAction(inquiryId: string, staffId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ assigned_staff_id: staffId, updated_at: new Date().toISOString() } as never)
    .eq("id", inquiryId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function convertToOrderAction(inquiryId: string) {
  const supabase = await createClient();

  // Get inquiry data
  const { data: inquiry, error: inquiryError } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", inquiryId)
    .single();

  if (inquiryError || !inquiry) {
    return { success: false, error: "Inquiry not found" };
  }

  // Create order from inquiry
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      inquiry_id: inquiryId,
      package_id: (inquiry as Record<string, unknown>).package_id as string | null,
      tradition_type: ((inquiry as Record<string, unknown>).tradition_preference as string) || "buddhist",
      status: "received",
    } as never)
    .select()
    .single();

  if (orderError) return { success: false, error: orderError.message };

  // Update inquiry status to confirmed
  await supabase
    .from("inquiries")
    .update({ status: "confirmed", updated_at: new Date().toISOString() } as never)
    .eq("id", inquiryId);

  // Create 13-step timeline for the order
  const steps = [
    { step: 1, th: "ปรึกษาและรับเรื่อง", en: "Consultation & Intake" },
    { step: 2, th: "จองศาลา/สถานที่", en: "Venue/Temple Booking" },
    { step: 3, th: "รับศพจากโรงพยาบาล", en: "Body Collection" },
    { step: 4, th: "เตรียมโลงและตกแต่ง", en: "Coffin Preparation" },
    { step: 5, th: "พิธีรดน้ำศพ", en: "Water Blessing Ceremony" },
    { step: 6, th: "จัดดอกไม้หน้าโลง", en: "Coffin Flower Arrangement" },
    { step: 7, th: "เตรียมเครื่องไทยธรรม", en: "Merit Items Preparation" },
    { step: 8, th: "สวดพระอภิธรรม", en: "Nightly Chanting" },
    { step: 9, th: "พิธีทำบุญเช้า", en: "Morning Merit Ceremony" },
    { step: 10, th: "พิธีฌาปนกิจ", en: "Cremation Ceremony" },
    { step: 11, th: "เก็บอัฐิ", en: "Ash Collection" },
    { step: 12, th: "ลอยอังคาร", en: "Ash Floating" },
    { step: 13, th: "ส่งมอบและติดตาม", en: "Handover & Follow-up" },
  ];

  const timelineRows = steps.map((s) => ({
    order_id: (order as Record<string, unknown>).id as string,
    step_number: s.step,
    step_name_th: s.th,
    step_name_en: s.en,
    status: "pending",
  }));

  await supabase.from("order_timeline").insert(timelineRows as never);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/orders");
  return { success: true, orderId: (order as Record<string, unknown>).id };
}
