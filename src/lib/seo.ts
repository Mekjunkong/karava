import type { Metadata } from "next";

const siteUrl = "https://santifuneral.com";

interface PageSeoConfig {
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  path: string;
}

const pageSeoConfigs: Record<string, PageSeoConfig> = {
  home: {
    titleTh: "ศานติ | บริการจัดงานศพครบวงจร เชียงใหม่",
    titleEn: "Santi Funeral | Complete Funeral Services Chiang Mai",
    descriptionTh: "บริการจัดงานศพครบวงจร เชียงใหม่ รองรับทุกศาสนาและประเพณี ดูแลทุกพิธีด้วยความเคารพ ราคาโปร่งใส พร้อมให้คำปรึกษา 24 ชม.",
    descriptionEn: "Complete funeral services in Chiang Mai. All traditions supported. Every farewell, with reverence. Transparent pricing. 24/7 consultation.",
    path: "",
  },
  packages: {
    titleTh: "แพ็กเกจงานศพ | ศานติ เชียงใหม่",
    titleEn: "Funeral Packages | Santi Funeral Chiang Mai",
    descriptionTh: "แพ็กเกจจัดงานศพ เชียงใหม่ เริ่มต้น 79,000 บาท รองรับพุทธ คริสต์ จีน ไม่ระบุศาสนา หรือกำหนดเอง",
    descriptionEn: "Funeral packages in Chiang Mai starting from 79,000 THB. Buddhist, Christian, Chinese, secular, or custom ceremonies.",
    path: "/packages",
  },
  services: {
    titleTh: "บริการเสริมงานศพ | ศานติ เชียงใหม่",
    titleEn: "Funeral Add-on Services | Santi Funeral Chiang Mai",
    descriptionTh: "บริการเสริมสำหรับงานศพ เชียงใหม่ ช่างภาพ ดอกไม้ อาหาร รถรับ-ส่ง ของที่ระลึก และอื่นๆ",
    descriptionEn: "Funeral add-on services in Chiang Mai. Photography, flowers, catering, transport, memorial keepsakes, and more.",
    path: "/services",
  },
  process: {
    titleTh: "ขั้นตอนจัดงานศพ 13 ขั้นตอน | ศานติ เชียงใหม่",
    titleEn: "13-Step Funeral Process | Santi Funeral Chiang Mai",
    descriptionTh: "ขั้นตอนจัดงานศพครบวงจร 13 ขั้นตอน ตั้งแต่ปรึกษา รับเรื่อง จนถึงลอยอังคาร ดูแลทุกรายละเอียด",
    descriptionEn: "Complete 13-step funeral process from consultation to ash floating. Every detail handled with care.",
    path: "/process",
  },
  about: {
    titleTh: "เกี่ยวกับศานติ | บริษัทจัดงานศพ เชียงใหม่",
    titleEn: "About Santi Funeral | Funeral Service Provider Chiang Mai",
    descriptionTh: "ศานติ บริการจัดงานศพครบวงจร เชียงใหม่ ดูแลทุกพิธีด้วยความเคารพ ทีมงานมืออาชีพ ราคาโปร่งใส",
    descriptionEn: "Santi Funeral provides complete funeral services in Chiang Mai. Professional team, transparent pricing, all traditions supported.",
    path: "/about",
  },
  contact: {
    titleTh: "ติดต่อจัดงานศพ | ศานติ เชียงใหม่",
    titleEn: "Contact for Funeral Services | Santi Funeral Chiang Mai",
    descriptionTh: "ติดต่อสอบถามบริการจัดงานศพ เชียงใหม่ พร้อมให้คำปรึกษา 24 ชม. โทร LINE อีเมล",
    descriptionEn: "Contact Santi Funeral for funeral services in Chiang Mai. 24/7 consultation. Phone, LINE, email.",
    path: "/contact",
  },
};

export function generatePageMetadata(
  page: string,
  locale: string
): Metadata {
  const config = pageSeoConfigs[page];
  if (!config) return {};

  const title = locale === "en" ? config.titleEn : config.titleTh;
  const description = locale === "en" ? config.descriptionEn : config.descriptionTh;
  const url = `${siteUrl}/${locale}${config.path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        th: `${siteUrl}/th${config.path}`,
        en: `${siteUrl}/en${config.path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Santi Funeral (ศานติ)",
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Santi Funeral - ศานติ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    name: "ศานติ (Santi Funeral)",
    alternateName: "Santi Funeral Services",
    description: "บริการจัดงานศพครบวงจร เชียงใหม่ รองรับทุกศาสนาและประเพณี",
    url: siteUrl,
    telephone: "+66929894495",
    email: "info@santifuneral.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chiang Mai",
      addressRegion: "Chiang Mai",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.7883,
      longitude: 98.9853,
    },
    areaServed: {
      "@type": "City",
      name: "Chiang Mai",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    serviceType: [
      "Funeral Services",
      "Cremation Services",
      "Buddhist Funeral",
      "Memorial Services",
    ],
  };
}

export function funeralServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Funeral Service",
    provider: {
      "@type": "FuneralHome",
      name: "ศานติ (Santi Funeral)",
      url: siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: "Chiang Mai",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Basic Package / แพ็กเกจพื้นฐาน",
        price: "79000",
        priceCurrency: "THB",
      },
      {
        "@type": "Offer",
        name: "Standard Package / แพ็กเกจมาตรฐาน",
        price: "149000",
        priceCurrency: "THB",
      },
      {
        "@type": "Offer",
        name: "Premium Package / แพ็กเกจพรีเมียม",
        price: "249000",
        priceCurrency: "THB",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
