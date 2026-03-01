import type { Metadata } from "next";
import { Sarabun, Inter, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { localBusinessJsonLd } from "@/lib/seo";
import "../globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | คารวะ (Karava)",
    default: "คารวะ | บริการจัดงานศพครบวงจร เชียงใหม่",
  },
  description:
    "บริการจัดงานศพครบวงจร เชียงใหม่ รองรับทุกศาสนาและประเพณี ดูแลทุกพิธีด้วยความเคารพ",
  metadataBase: new URL("https://karava.co.th"),
  openGraph: {
    type: "website",
    siteName: "Karava (คารวะ)",
    images: [
      {
        url: "/images/hero-temple.jpg",
        width: 1920,
        height: 1440,
        alt: "Karava - คารวะ - บริการจัดงานศพ เชียงใหม่",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sarabun.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </head>
      <body className="font-sarabun antialiased bg-background text-primary min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
