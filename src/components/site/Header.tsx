import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logo from "@/assets/thiaw-logo.jpeg.asset.json";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/whats-coming", label: t("nav.coming") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-bar fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Thiaw Agro Élevage logo" width={48} height={48}
            className="size-11 rounded-xl object-cover shadow-[var(--shadow-soft)]" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-secondary">Thiaw Agro Élevage</span>
            <span className="block text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">{t("footer.subtitle")}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }}
            className="relative rounded-full px-3.5 py-2 text-sm font-medium text-secondary/85 transition-colors hover:text-primary data-[status=active]:text-primary">{link.label}</Link>)}
          <Link to="/contact" className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105">{t("nav.order")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button type="button" aria-label={t("nav.menuAria")} onClick={() => setOpen(v => !v)}
            className="rounded-full border border-border bg-card p-2 text-secondary md:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden border-t border-border md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium text-secondary data-[status=active]:text-primary">{link.label}</Link>)}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">{t("nav.order")}</Link>
          </div>
        </motion.nav>}
      </AnimatePresence>
    </motion.header>
  );
}
