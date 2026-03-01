"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function upsertPackageAction(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const data = {
    slug: formData.get("slug") as string,
    name_th: formData.get("name_th") as string,
    name_en: formData.get("name_en") as string,
    tradition_type: formData.get("tradition_type") as string,
    base_price: parseInt(formData.get("base_price") as string) || 0,
    duration_nights: parseInt(formData.get("duration_nights") as string) || 0,
    description_th: (formData.get("description_th") as string) || null,
    description_en: (formData.get("description_en") as string) || null,
    display_order: parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "true",
  };

  if (id) {
    const { error } = await supabase
      .from("packages")
      .update({ ...data, updated_at: new Date().toISOString() } as never)
      .eq("id", id);
    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from("packages").insert(data as never);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/admin/packages");
  return { success: true };
}

export async function deletePackageAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/packages");
  return { success: true };
}
