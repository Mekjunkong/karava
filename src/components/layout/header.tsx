"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageToggle } from "./language-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/packages", key: "packages" },
  { href: "/services", key: "services" },
  { href: "/process", key: "process" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted/10 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              คารวะ
            </span>
            <span className="hidden sm:inline text-xs text-muted font-medium tracking-wider uppercase">
              Karava
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-secondary"
                    : "text-muted hover:text-primary hover:bg-background"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-white hover:bg-secondary-light transition-colors"
            >
              {t("inquire")}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-muted hover:text-primary hover:bg-background transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-muted/10 bg-surface">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "text-secondary bg-secondary/5"
                    : "text-muted hover:text-primary hover:bg-background"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link
                href="/contact"
                className="block w-full text-center rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white hover:bg-secondary-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("inquire")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
