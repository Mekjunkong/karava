import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata("about", locale);
}

export default function AboutPage() {
  return <AboutContent />;
}
