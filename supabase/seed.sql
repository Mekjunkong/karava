-- Santi Funeral (ศานติ) — Seed Data
-- Run this in Supabase SQL Editor after running 001_initial_schema.sql

-- ============================================
-- Packages
-- ============================================

INSERT INTO packages (slug, name_th, name_en, tradition_type, base_price, duration_nights, description_th, description_en, includes, display_order) VALUES
('basic', 'แพ็กเกจพื้นฐาน', 'Basic Package', 'buddhist', 79000, 1,
 'พิธีศพแบบเรียบง่าย สวด 1 คืน ฌาปนกิจ',
 'Simple funeral ceremony, 1-night chanting, cremation',
 '["รับศพจากโรงพยาบาล","จองศาลา 1 คืน","โลงศพมาตรฐาน","ดอกไม้หน้าโลง 1 ชุด","พิธีสวดอภิธรรม 1 คืน","พิธีฌาปนกิจ","เก็บอัฐิ"]'::jsonb,
 1),
('standard', 'แพ็กเกจมาตรฐาน', 'Standard Package', 'buddhist', 149000, 3,
 'พิธีศพครบวงจร สวด 3 คืน รดน้ำศพ ฌาปนกิจ ลอยอังคาร',
 'Full ceremony, 3-night chanting, water blessing, cremation, ash floating',
 '["รับศพจากโรงพยาบาล","จองศาลา 3 คืน","โลงศพ 3 ชั้น","ดอกไม้หน้าโลง 1 ชุด (15,000 ฿)","เครื่องไทยธรรม","นิมนต์พระสงฆ์","ถวายภัตตาหาร","พิธีรดน้ำศพ","สวดพระอภิธรรม 3 คืน","พิธีฌาปนกิจ","เก็บอัฐิ","ลอยอังคาร แม่น้ำปิง","ขนมกล่อง 50 ชุด/วัน","เจ้าหน้าที่ดูแลตลอดงาน"]'::jsonb,
 2),
('premium', 'แพ็กเกจพรีเมียม', 'Premium Package', 'buddhist', 249000, 5,
 'พิธีศพระดับพรีเมียม สวด 5 คืน ช่างภาพ ดอกไม้พิเศษ บริการครบถ้วน',
 'Premium ceremony, 5-night chanting, photographer, premium flowers, full service',
 '["ทุกอย่างในแพ็กเกจมาตรฐาน","สวดพระอภิธรรม 5 คืน","ดอกไม้พรีเมียม (30,000 ฿)","ช่างภาพตลอดงาน","ขนมกล่องพรีเมียม 100 ชุด/วัน","ของที่ระลึก","เจ้าหน้าที่เพิ่ม 2 คน","รถรับ-ส่งครอบครัว"]'::jsonb,
 3),
('custom', 'แพ็กเกจกำหนดเอง', 'Custom Package', 'custom', 0, 0,
 'ออกแบบพิธีศพตามความต้องการ รองรับทุกศาสนาและประเพณี',
 'Fully customizable ceremony for any tradition or religion',
 '[]'::jsonb,
 4);

-- ============================================
-- Services (add-ons)
-- ============================================

INSERT INTO services (slug, name_th, name_en, category, base_price, unit, description_th, description_en) VALUES
('body-transport', 'รับ-ส่งศพ', 'Body Transport', 'transport', 5000, 'per_event',
 'รับศพจากโรงพยาบาลภายในเชียงใหม่', 'Body pickup from hospital within Chiang Mai'),
('extra-transport', 'รถรับ-ส่งครอบครัว', 'Family Transport', 'transport', 3000, 'per_day',
 'รถตู้รับ-ส่งครอบครัว', 'Van transport for family members'),
('photographer', 'ช่างภาพ', 'Photographer', 'photography', 6500, 'per_event',
 'ช่างภาพถ่ายตลอดงาน', 'Professional photographer throughout ceremony'),
('videographer', 'ช่างวิดีโอ', 'Videographer', 'photography', 12000, 'per_event',
 'ถ่ายวิดีโอพิธีและตัดต่อ', 'Video recording and editing of ceremony'),
('premium-flowers', 'ดอกไม้พรีเมียม', 'Premium Flowers', 'supplies', 15000, 'per_event',
 'อัพเกรดดอกไม้หน้าโลง', 'Upgraded coffin flower arrangement'),
('extra-flower-set', 'ดอกไม้เพิ่ม 1 ชุด', 'Extra Flower Set', 'supplies', 8000, 'per_event',
 'ดอกไม้ตกแต่งเพิ่ม 1 ชุด', 'Additional decorative flower set'),
('premium-snacks', 'ขนมกล่องพรีเมียม', 'Premium Snack Box', 'catering', 150, 'per_person',
 'ขนมกล่องแบรนด์ (ต่อกล่อง)', 'Branded bakery snack box (per box)'),
('guest-catering', 'อาหารว่างผู้ร่วมงาน', 'Guest Catering', 'catering', 200, 'per_person',
 'อาหารว่างสำหรับผู้ร่วมงาน (ต่อคน)', 'Refreshments for guests (per person)'),
('memorial-keepsake', 'ของที่ระลึก', 'Memorial Keepsake', 'memorial', 6500, 'per_event',
 'ของที่ระลึกสำหรับผู้ร่วมงาน', 'Memorial keepsakes for attendees'),
('extra-night', 'สวดเพิ่ม 1 คืน', 'Extra Chanting Night', 'ceremony', 15000, 'per_event',
 'เพิ่มคืนสวดพระอภิธรรม', 'Additional night of Buddhist chanting'),
('christian-ceremony', 'พิธีคริสเตียน', 'Christian Ceremony', 'ceremony', 20000, 'per_event',
 'จัดพิธีตามแบบคริสเตียน', 'Christian funeral ceremony arrangement'),
('chinese-ceremony', 'พิธีจีน', 'Chinese Ceremony', 'ceremony', 25000, 'per_event',
 'จัดพิธีตามแบบจีน', 'Chinese funeral ceremony arrangement'),
('extra-staff', 'เจ้าหน้าที่เพิ่ม', 'Extra Staff', 'ceremony', 1200, 'per_day',
 'เจ้าหน้าที่ดูแลเพิ่ม 1 คน/วัน', 'Additional staff member per day');

-- ============================================
-- Testimonials (sample data)
-- ============================================

INSERT INTO testimonials (client_name, message_th, message_en, rating, is_featured) VALUES
('คุณสมศรี ว.', 'ขอบคุณทีมศานติที่ดูแลพิธีศพคุณแม่อย่างดีมาก ทุกอย่างเรียบร้อย ทีมงานใส่ใจทุกรายละเอียด ทำให้ครอบครัวเราสบายใจมาก',
 'Thank you to the Santi Funeral team for taking such good care of our mother''s ceremony. Everything was well-organized. The team paid attention to every detail and gave our family peace of mind.',
 5, true),
('คุณวิชัย พ.', 'ใช้บริการแพ็กเกจมาตรฐาน ราคาสมเหตุสมผล ไม่มีค่าใช้จ่ายเพิ่มเติมที่ไม่ได้แจ้งก่อน ทีมงานเป็นมืออาชีพมาก',
 'Used the Standard package. Fair pricing with no unexpected additional costs. The team was very professional.',
 5, true),
('คุณนิภา ส.', 'ในช่วงเวลาที่ยากลำบาก ทีมศานติช่วยแบ่งเบาภาระได้มาก ดูแลทุกขั้นตอนจนเสร็จสิ้น ลอยอังคารที่แม่น้ำปิงสวยงามมาก',
 'During a difficult time, the Santi Funeral team helped ease our burden tremendously. They handled every step through completion. The ash floating at the Ping River was beautiful.',
 5, true);
