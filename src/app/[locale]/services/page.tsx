import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { ServicesContent } from "@/components/services/services-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata("services", locale);
}

export default function ServicesPage() {
  return <ServicesContent />;
}
