"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/orders");
  return { success: true };
}

export async function updateTimelineStepAction(
  stepId: string,
  status: string,
  notes?: string
) {
  const supabase = await createClient();
  const updateData: Record<string, unknown> = { status };

  if (status === "completed") {
    updateData.completed_at = new Date().toISOString();
  }

  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const { error } = await supabase
    .from("order_timeline")
    .update(updateData as never)
    .eq("id", stepId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/orders");
  return { success: true };
}
