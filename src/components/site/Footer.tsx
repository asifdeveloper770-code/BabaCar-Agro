import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react"; // Note: Lucide does not have "WhatApp", MessageCircle or Phone is standard, but if you have a custom SVG or external icon package, import it accordingly.
import { useLanguage } from "@/i18n/LanguageContext";

import logo from "@/assets/thiaw-logo.png";
// Official WhatsApp SVG Icon Component
function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006L2 22l5.129-1.343c1.46.797 3.109 1.216 4.88 1.217h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.038-5.174-2.925-7.06A9.923 9.923 0 0012.012 2zm5.836 14.126c-.244.688-1.427 1.314-1.969 1.397-.502.077-1.151.109-1.851-.115-.432-.138-1.002-.325-1.745-.646-3.13-1.353-5.171-4.512-5.328-4.721-.157-.209-1.272-1.693-1.272-3.23 0-1.538.802-2.295 1.085-2.603.283-.308.618-.385.824-.385.206 0 .412.002.592.01.19.008.448-.072.701.536.258.621.876 2.138.953 2.293.077.155.129.336.026.543-.103.207-.155.336-.309.516-.154.18-.324.402-.463.54-.154.155-.315.324-.135.633.18.309.802 1.321 1.72 2.139 1.181 1.05 2.177 1.376 2.486 1.53.309.155.489.129.67-.077.18-.206.772-.901.978-1.21.206-.309.412-.258.695-.155.283.103 1.799.849 2.108 1.003.309.155.515.232.592.361.077.129.077.747-.167 1.435z" />
    </svg>
  );
}
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-olive)] text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center rounded-2xl bg-card shadow-[var(--shadow-soft)] overflow-hidden border border-border">
              <img src={logo} alt="Darou Thiaw Agro Élevage logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-display text-lg font-bold">Darou Thiaw Agro Élevage</p>
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

        <div className="text-sm space-y-3">
          <p className="mb-3 font-semibold tracking-wide uppercase opacity-70">{t("footer.getInTouch")}</p>
          
          {/* WhatsApp Link */}
          <div>
            <span className="text-xs uppercase font-medium opacity-60 block mb-0.5">WhatsApp</span>
            <a href="https://wa.me/19013199938" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <WhatsAppIcon className="size-6 text-green-500" />
              <span>+1 901-319-9938</span>
            </a>
          </div>

          {/* Local Phone Link */}
          <div>
            <span className="text-xs uppercase font-medium opacity-60 block mb-0.5">Local</span>
            <a href="tel:+221777548004" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="size-4" />
              <span>77 754 80 04</span>
            </a>
          </div>

          {/* Email */}
          <div className="pt-1">
            <span className="text-xs uppercase font-medium opacity-60 block mb-0.5">Email</span>
            <a href="mailto:thiaw@att.net" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="size-4" />
              <span>thiaw@att.net</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Darou Thiaw Agro Élevage. {t("footer.rights")}
      </div>
    </footer>
  );
}
