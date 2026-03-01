-- Santi Funeral (ศานติ) — Initial Database Schema
-- Run this in Supabase SQL Editor

-- Packages (funeral packages)
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_th TEXT NOT NULL,
  name_en TEXT NOT NULL,
  tradition_type TEXT NOT NULL DEFAULT 'buddhist'
    CHECK (tradition_type IN ('buddhist','christian','chinese','secular','custom')),
  base_price INTEGER NOT NULL,
  description_th TEXT,
  description_en TEXT,
  duration_nights INTEGER NOT NULL DEFAULT 3,
  includes JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services (add-on / a-la-carte)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_th TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('transport','ceremony','supplies','venue','catering','photography','memorial')),
  base_price INTEGER NOT NULL,
  unit TEXT NOT NULL DEFAULT 'per_event'
    CHECK (unit IN ('per_event','per_day','per_person')),
  description_th TEXT,
  description_en TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Staff (admin users — linked to Supabase auth)
CREATE TABLE staff (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'coordinator'
    CHECK (role IN ('admin','coordinator','driver')),
  phone TEXT,
  email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inquiries (customer submissions)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  line_id TEXT,
  package_id UUID REFERENCES packages(id),
  tradition_preference TEXT,
  deceased_name TEXT,
  relation_to_deceased TEXT,
  preferred_date DATE,
  estimated_guests INTEGER,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','quoted','confirmed','cancelled')),
  assigned_staff_id UUID REFERENCES staff(id),
  source TEXT NOT NULL DEFAULT 'website'
    CHECK (source IN ('website','line','phone','walk-in')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders (confirmed bookings)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id),
  package_id UUID REFERENCES packages(id),
  custom_notes TEXT,
  total_price INTEGER NOT NULL DEFAULT 0,
  deposit_paid INTEGER NOT NULL DEFAULT 0,
  balance_remaining INTEGER NOT NULL DEFAULT 0,
  ceremony_start_date DATE,
  ceremony_nights INTEGER NOT NULL DEFAULT 3,
  venue_name TEXT,
  tradition_type TEXT NOT NULL DEFAULT 'buddhist',
  status TEXT NOT NULL DEFAULT 'received'
    CHECK (status IN ('received','preparing','ceremony','completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order <-> Services junction
CREATE TABLE order_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL
);

-- Order timeline (13-step progress)
CREATE TABLE order_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 13),
  step_name_th TEXT NOT NULL,
  step_name_en TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','in_progress','completed')),
  notes TEXT,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES staff(id),
  UNIQUE(order_id, step_number)
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  message_th TEXT NOT NULL,
  message_en TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read for packages, services, testimonials
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Public insert for inquiries (customer submissions)
CREATE POLICY "Public create inquiry" ON inquiries FOR INSERT WITH CHECK (true);

-- Staff can do everything (authenticated users in staff table)
CREATE POLICY "Staff full access packages" ON packages FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access services" ON services FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access inquiries" ON inquiries FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access orders" ON orders FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access order_services" ON order_services FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access order_timeline" ON order_timeline FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access staff" ON staff FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);
CREATE POLICY "Staff full access testimonials" ON testimonials FOR ALL USING (
  auth.uid() IN (SELECT id FROM staff WHERE is_active = true)
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_packages_display_order ON packages(display_order);
CREATE INDEX idx_packages_slug ON packages(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_ceremony_date ON orders(ceremony_start_date);
CREATE INDEX idx_order_timeline_order ON order_timeline(order_id, step_number);
