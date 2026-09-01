import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";


import logo from "@/assets/thiaw-logo.jpeg";

export function Footer() {
    const { t } = useLanguage();
  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-olive)] text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Thiaw Agro Élevage logo"
              width={56}
              height={56}
              loading="lazy"
              className="size-14 rounded-xl object-cover"
            />
            <div>
              <p className="font-display text-lg font-bold">Thiaw Agro Élevage</p>
              <p className="text-sm opacity-80">{t("footer.subtitle")}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm opacity-80">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold tracking-wide uppercase opacity-70">{t("footer.explore")}</p>
          <ul className="space-y-2 opacity-90">
            <li><Link to="/">{t("footer.home")}</Link></li>
            <li><Link to="/about">{t("footer.about")}</Link></li>
            <li><Link to="/services">{t("footer.service")}</Link></li>
            <li><Link to="/whats-coming">{t("footer.coming")}</Link></li>
            <li><Link to="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold tracking-wide uppercase opacity-70">{t("footer.getInTouch")}</p>
          <a href="tel:+19013199938" className="flex items-center gap-2 opacity-90">
            <Phone className="size-4" /> 901-319-9938
          </a>
          <a href="mailto:thiaw@att.net" className="mt-2 flex items-center gap-2 opacity-90">
            <Mail className="size-4" /> thiaw@att.net
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Thiaw Agro Élevage. {t("footer.rights")}
      </div>
    </footer>
  );
}
