"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "th" ? "en" : "th";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-1 rounded-lg border border-muted/20 px-3 py-1.5 text-sm font-medium",
        "text-muted hover:text-primary hover:border-muted/40 transition-colors"
      )}
      aria-label={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
    >
      <span className={cn(locale === "th" ? "text-primary font-semibold" : "text-muted")}>
        TH
      </span>
      <span className="text-muted/40">|</span>
      <span className={cn(locale === "en" ? "text-primary font-semibold" : "text-muted")}>
        EN
      </span>
    </button>
  );
}
