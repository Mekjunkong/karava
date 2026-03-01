export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string;
          slug: string;
          name_th: string;
          name_en: string;
          tradition_type: "buddhist" | "christian" | "chinese" | "secular" | "custom";
          base_price: number;
          description_th: string | null;
          description_en: string | null;
          duration_nights: number;
          includes: Json;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_th: string;
          name_en: string;
          tradition_type?: "buddhist" | "christian" | "chinese" | "secular" | "custom";
          base_price: number;
          description_th?: string | null;
          description_en?: string | null;
          duration_nights?: number;
          includes?: Json;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_th?: string;
          name_en?: string;
          tradition_type?: "buddhist" | "christian" | "chinese" | "secular" | "custom";
          base_price?: number;
          description_th?: string | null;
          description_en?: string | null;
          duration_nights?: number;
          includes?: Json;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          name_th: string;
          name_en: string;
          category: "transport" | "ceremony" | "supplies" | "venue" | "catering" | "photography" | "memorial";
          base_price: number;
          unit: "per_event" | "per_day" | "per_person";
          description_th: string | null;
          description_en: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_th: string;
          name_en: string;
          category: "transport" | "ceremony" | "supplies" | "venue" | "catering" | "photography" | "memorial";
          base_price: number;
          unit?: "per_event" | "per_day" | "per_person";
          description_th?: string | null;
          description_en?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_th?: string;
          name_en?: string;
          category?: "transport" | "ceremony" | "supplies" | "venue" | "catering" | "photography" | "memorial";
          base_price?: number;
          unit?: "per_event" | "per_day" | "per_person";
          description_th?: string | null;
          description_en?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          contact_name: string;
          phone: string;
          email: string | null;
          line_id: string | null;
          package_id: string | null;
          tradition_preference: string | null;
          deceased_name: string | null;
          relation_to_deceased: string | null;
          preferred_date: string | null;
          estimated_guests: number | null;
          message: string | null;
          status: "new" | "contacted" | "quoted" | "confirmed" | "cancelled";
          assigned_staff_id: string | null;
          source: "website" | "line" | "phone" | "walk-in";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          contact_name: string;
          phone: string;
          email?: string | null;
          line_id?: string | null;
          package_id?: string | null;
          tradition_preference?: string | null;
          deceased_name?: string | null;
          relation_to_deceased?: string | null;
          preferred_date?: string | null;
          estimated_guests?: number | null;
          message?: string | null;
          status?: "new" | "contacted" | "quoted" | "confirmed" | "cancelled";
          assigned_staff_id?: string | null;
          source?: "website" | "line" | "phone" | "walk-in";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          contact_name?: string;
          phone?: string;
          email?: string | null;
          line_id?: string | null;
          package_id?: string | null;
          tradition_preference?: string | null;
          deceased_name?: string | null;
          relation_to_deceased?: string | null;
          preferred_date?: string | null;
          estimated_guests?: number | null;
          message?: string | null;
          status?: "new" | "contacted" | "quoted" | "confirmed" | "cancelled";
          assigned_staff_id?: string | null;
          source?: "website" | "line" | "phone" | "walk-in";
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          inquiry_id: string | null;
          package_id: string | null;
          custom_notes: string | null;
          total_price: number;
          deposit_paid: number;
          balance_remaining: number;
          ceremony_start_date: string | null;
          ceremony_nights: number;
          venue_name: string | null;
          tradition_type: string;
          status: "received" | "preparing" | "ceremony" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          inquiry_id?: string | null;
          package_id?: string | null;
          custom_notes?: string | null;
          total_price?: number;
          deposit_paid?: number;
          balance_remaining?: number;
          ceremony_start_date?: string | null;
          ceremony_nights?: number;
          venue_name?: string | null;
          tradition_type?: string;
          status?: "received" | "preparing" | "ceremony" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          inquiry_id?: string | null;
          package_id?: string | null;
          custom_notes?: string | null;
          total_price?: number;
          deposit_paid?: number;
          balance_remaining?: number;
          ceremony_start_date?: string | null;
          ceremony_nights?: number;
          venue_name?: string | null;
          tradition_type?: string;
          status?: "received" | "preparing" | "ceremony" | "completed";
          created_at?: string;
          updated_at?: string;
        };
      };
      order_services: {
        Row: {
          id: string;
          order_id: string;
          service_id: string;
          quantity: number;
          unit_price: number;
          subtotal: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          service_id: string;
          quantity?: number;
          unit_price: number;
          subtotal: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          service_id?: string;
          quantity?: number;
          unit_price?: number;
          subtotal?: number;
        };
      };
      order_timeline: {
        Row: {
          id: string;
          order_id: string;
          step_number: number;
          step_name_th: string;
          step_name_en: string;
          status: "pending" | "in_progress" | "completed";
          notes: string | null;
          completed_at: string | null;
          completed_by: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          step_number: number;
          step_name_th: string;
          step_name_en: string;
          status?: "pending" | "in_progress" | "completed";
          notes?: string | null;
          completed_at?: string | null;
          completed_by?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          step_number?: number;
          step_name_th?: string;
          step_name_en?: string;
          status?: "pending" | "in_progress" | "completed";
          notes?: string | null;
          completed_at?: string | null;
          completed_by?: string | null;
        };
      };
      staff: {
        Row: {
          id: string;
          name: string;
          role: "admin" | "coordinator" | "driver";
          phone: string | null;
          email: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          role?: "admin" | "coordinator" | "driver";
          phone?: string | null;
          email?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: "admin" | "coordinator" | "driver";
          phone?: string | null;
          email?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          message_th: string;
          message_en: string | null;
          rating: number | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          message_th: string;
          message_en?: string | null;
          rating?: number | null;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          message_th?: string;
          message_en?: string | null;
          rating?: number | null;
          is_featured?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// Convenience type aliases
export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type PackageInsert = Database["public"]["Tables"]["packages"]["Insert"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderService = Database["public"]["Tables"]["order_services"]["Row"];
export type OrderTimeline = Database["public"]["Tables"]["order_timeline"]["Row"];
export type Staff = Database["public"]["Tables"]["staff"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
