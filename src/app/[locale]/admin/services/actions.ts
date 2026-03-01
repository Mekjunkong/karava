"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertServiceAction(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const data = {
    slug: formData.get("slug") as string,
    name_th: formData.get("name_th") as string,
    name_en: formData.get("name_en") as string,
    category: formData.get("category") as string,
    base_price: parseInt(formData.get("base_price") as string) || 0,
    unit: formData.get("unit") as string || "per_event",
    description_th: (formData.get("description_th") as string) || null,
    description_en: (formData.get("description_en") as string) || null,
    is_active: formData.get("is_active") === "true",
  };

  if (id) {
    const { error } = await supabase
      .from("services")
      .update(data as never)
      .eq("id", id);
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from("services").insert(data as never);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteServiceAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true };
}
