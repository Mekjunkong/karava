"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateStaffAction(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    phone: (formData.get("phone") as string) || null,
    email: (formData.get("email") as string) || null,
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase
    .from("staff")
    .update(data as never)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/staff");
  return { success: true };
}

export async function toggleStaffActiveAction(id: string, isActive: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("staff")
    .update({ is_active: isActive } as never)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/staff");
  return { success: true };
}
