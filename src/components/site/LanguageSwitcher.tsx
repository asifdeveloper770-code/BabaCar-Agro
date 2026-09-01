import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage, LOCALES, type Locale } from "@/i18n/LanguageContext";

const LOCALE_LABELS: Record<Locale, string> = { en: "EN", fr: "FR" };

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handle = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  return <div ref={rootRef} className={`relative ${className}`}>
    <button type="button" onClick={() => setOpen(v => !v)} aria-haspopup="listbox" aria-expanded={open}
      aria-label={t("nav.languageAria")} className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary transition">
      <Globe className="h-4 w-4" /><span>{LOCALE_LABELS[locale]}</span>
    </button>
    {open && <div role="listbox" className="absolute right-0 mt-2 w-40 rounded-2xl border border-border bg-background shadow-soft p-1.5 z-50 animate-fade-up">
      {LOCALES.map(code => <button key={code} role="option" aria-selected={locale === code} onClick={() => { setLocale(code); setOpen(false); }}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-left hover:bg-secondary transition">
        <span>{t(`languageNames.${code}`)}</span>{locale === code && <Check className="h-3.5 w-3.5 text-primary" />}
      </button>)}
    </div>}
  </div>;
}
