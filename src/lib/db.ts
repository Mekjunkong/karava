import { createClient } from "./supabase/server";
import type {
  Package,
  Service,
  Inquiry,
  InquiryInsert,
  Order,
  OrderInsert,
  OrderTimeline,
  Staff,
  Testimonial,
} from "./database.types";

// Helper to get a typed Supabase client
async function supabase() {
  return createClient();
}

// ---- Packages ----

export async function getActivePackages(): Promise<Package[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data as Package[]) || [];
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const client = await supabase();
  const { data, error } = await client
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Package;
}

export async function getAllPackages(): Promise<Package[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("packages")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data as Package[]) || [];
}

export async function upsertPackage(pkg: Partial<Package> & { slug: string; name_th: string; name_en: string; base_price: number }): Promise<Package> {
  const client = await supabase();
  const { data, error } = await client
    .from("packages")
    .upsert(pkg as never)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Package;
}

export async function deletePackage(id: string): Promise<void> {
  const client = await supabase();
  const { error } = await client.from("packages").delete().eq("id", id);
  if (error) throw error;
}

// ---- Services ----

export async function getActiveServices(): Promise<Service[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("category");

  if (error) throw error;
  return (data as Service[]) || [];
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("services")
    .select("*")
    .eq("category", category)
    .eq("is_active", true);

  if (error) throw error;
  return (data as Service[]) || [];
}

export async function getAllServices(): Promise<Service[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("services")
    .select("*")
    .order("category");

  if (error) throw error;
  return (data as Service[]) || [];
}

export async function upsertService(svc: Partial<Service> & { slug: string; name_th: string; name_en: string; category: string; base_price: number }): Promise<Service> {
  const client = await supabase();
  const { data, error } = await client
    .from("services")
    .upsert(svc as never)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Service;
}

export async function deleteService(id: string): Promise<void> {
  const client = await supabase();
  const { error } = await client.from("services").delete().eq("id", id);
  if (error) throw error;
}

// ---- Inquiries ----

export async function createInquiry(data: InquiryInsert): Promise<Inquiry> {
  const client = await supabase();
  const { data: inquiry, error } = await client
    .from("inquiries")
    .insert(data as never)
    .select()
    .single();

  if (error) throw error;
  return inquiry as unknown as Inquiry;
}

export async function getInquiries(status?: string): Promise<Inquiry[]> {
  const client = await supabase();
  let query = client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as Inquiry[]) || [];
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const client = await supabase();
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Inquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: string
): Promise<void> {
  const client = await supabase();
  const { error } = await client
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) throw error;
}

export async function assignInquiryStaff(
  id: string,
  staffId: string
): Promise<void> {
  const client = await supabase();
  const { error } = await client
    .from("inquiries")
    .update({ assigned_staff_id: staffId, updated_at: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) throw error;
}

// ---- Orders ----

export async function createOrder(data: OrderInsert): Promise<Order> {
  const client = await supabase();
  const { data: order, error } = await client
    .from("orders")
    .insert(data as never)
    .select()
    .single();

  if (error) throw error;
  return order as unknown as Order;
}

export async function getOrders(status?: string): Promise<Order[]> {
  const client = await supabase();
  let query = client
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as Order[]) || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const client = await supabase();
  const { data, error } = await client
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Order;
}

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<void> {
  const client = await supabase();
  const { error } = await client
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) throw error;
}

// ---- Order Timeline ----

const TIMELINE_STEPS = [
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

export { TIMELINE_STEPS };

export async function createOrderTimelineSteps(orderId: string): Promise<void> {
  const client = await supabase();
  const steps = TIMELINE_STEPS.map((s) => ({
    order_id: orderId,
    step_number: s.step,
    step_name_th: s.th,
    step_name_en: s.en,
    status: "pending" as const,
  }));

  const { error } = await client.from("order_timeline").insert(steps as never);
  if (error) throw error;
}

export async function getOrderTimeline(orderId: string): Promise<OrderTimeline[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("order_timeline")
    .select("*")
    .eq("order_id", orderId)
    .order("step_number", { ascending: true });

  if (error) throw error;
  return (data as OrderTimeline[]) || [];
}

export async function updateTimelineStep(
  id: string,
  status: string,
  notes?: string
): Promise<void> {
  const client = await supabase();
  const updateData: Record<string, unknown> = { status };

  if (status === "completed") {
    updateData.completed_at = new Date().toISOString();
  }

  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const { error } = await client
    .from("order_timeline")
    .update(updateData as never)
    .eq("id", id);

  if (error) throw error;
}

// ---- Testimonials ----

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("testimonials")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Testimonial[]) || [];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Testimonial[]) || [];
}

// ---- Staff ----

export async function getStaff(): Promise<Staff[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("staff")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return (data as Staff[]) || [];
}

export async function getAllStaff(): Promise<Staff[]> {
  const client = await supabase();
  const { data, error } = await client
    .from("staff")
    .select("*")
    .order("name");

  if (error) throw error;
  return (data as Staff[]) || [];
}

export async function upsertStaff(staff: Partial<Staff> & { id: string; name: string }): Promise<Staff> {
  const client = await supabase();
  const { data, error } = await client
    .from("staff")
    .upsert(staff as never)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Staff;
}
