"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient();

  const data = {
    contact_name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || null,
    line_id: (formData.get("line_id") as string) || null,
    tradition_preference: (formData.get("tradition") as string) || null,
    deceased_name: (formData.get("deceased_name") as string) || null,
    preferred_date: (formData.get("date") as string) || null,
    estimated_guests: formData.get("guests")
      ? parseInt(formData.get("guests") as string)
      : null,
    message: (formData.get("message") as string) || null,
    source: "website" as const,
  };

  const { error } = await supabase.from("inquiries").insert(data as never);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
