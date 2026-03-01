import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { href: "/packages", key: "packages" },
  { href: "/services", key: "services" },
  { href: "/process", key: "process" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact.info");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-surface/80 relative">
      {/* Gold gradient line at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="full" color="white" className="mb-4" />
            <p className="text-sm text-surface/50 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-secondary uppercase tracking-[0.2em] mb-5">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-surface/50 hover:text-secondary transition-colors duration-300"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-secondary uppercase tracking-[0.2em] mb-5">
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-surface/50">
                <Phone size={16} className="mt-0.5 shrink-0 text-secondary/60" />
                <span>{tc("phoneNumber")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-surface/50">
                <Mail size={16} className="mt-0.5 shrink-0 text-secondary/60" />
                <span>{tc("emailAddress")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-surface/50">
                <Clock size={16} className="mt-0.5 shrink-0 text-secondary/60" />
                <span>{tc("hoursDetail")}</span>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="text-xs font-semibold text-secondary uppercase tracking-[0.2em] mb-5">
              {t("serviceArea")}
            </h3>
            <div className="flex items-start gap-3 text-sm text-surface/50">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary/60" />
              <span>{t("serviceAreaDetail")}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-surface/8">
          <p className="text-xs text-surface/30 text-center tracking-wide">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
