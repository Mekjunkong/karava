import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
    <footer className="bg-primary text-surface/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-surface mb-2">คารวะ</div>
            <p className="text-xs text-surface/50 uppercase tracking-wider mb-3">
              Karava
            </p>
            <p className="text-sm text-surface/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-surface uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-surface/60 hover:text-secondary transition-colors"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-surface uppercase tracking-wider mb-4">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-surface/60">
                <Phone size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{tc("phoneNumber")}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-surface/60">
                <Mail size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{tc("emailAddress")}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-surface/60">
                <Clock size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>{tc("hoursDetail")}</span>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="text-sm font-semibold text-surface uppercase tracking-wider mb-4">
              {t("serviceArea")}
            </h3>
            <div className="flex items-start gap-2.5 text-sm text-surface/60">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
              <span>{t("serviceAreaDetail")}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-surface/10">
          <p className="text-xs text-surface/40 text-center">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
