"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, MessageSquare, ClipboardList,
  Package, Wrench, Users, LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", key: "inquiries", icon: MessageSquare },
  { href: "/admin/orders", key: "orders", icon: ClipboardList },
  { href: "/admin/packages", key: "packages", icon: Package },
  { href: "/admin/services", key: "services", icon: Wrench },
  { href: "/admin/staff", key: "staff", icon: Users },
] as const;

export function AdminSidebar() {
  const t = useTranslations("admin.sidebar");
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-primary min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-surface/10">
        <Link href="/admin" className="text-surface font-bold text-xl">
          ศานติ
        </Link>
        <p className="text-surface/40 text-xs mt-1">{t("dashboard")}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, key, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={key}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-white"
                  : "text-surface/60 hover:text-surface hover:bg-surface/5"
              )}
            >
              <Icon size={18} />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-surface/60 hover:text-surface hover:bg-surface/5 transition-colors w-full"
        >
          <LogOut size={18} />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
