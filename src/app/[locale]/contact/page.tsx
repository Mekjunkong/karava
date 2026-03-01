import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { ContactContent } from "@/components/contact/contact-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata("contact", locale);
}

export default function ContactPage() {
  return <ContactContent />;
}
