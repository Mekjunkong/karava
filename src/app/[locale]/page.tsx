import { Hero } from "@/components/home/hero";
import { PackagesOverview } from "@/components/home/packages-overview";
import { ProcessSummary } from "@/components/home/process-summary";
import { WhyKarava } from "@/components/home/why-karava";
import { Testimonials } from "@/components/home/testimonials";
import { InquiryCta } from "@/components/home/inquiry-cta";

export default function HomePage() {
  // In production, these would be fetched from Supabase:
  // const packages = await getActivePackages();
  // const testimonials = await getFeaturedTestimonials();

  return (
    <div>
      <Hero />
      <PackagesOverview />
      <ProcessSummary />
      <WhyKarava />
      <Testimonials />
      <InquiryCta />
    </div>
  );
}
