import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en, { type TranslationSchema } from "@/i18n/en";
import fr from "@/i18n/fr";

export type Locale = "en" | "fr";
export const LOCALES: Locale[] = ["en", "fr"];
const STORAGE_KEY = "thiaw_agro_locale";
const dictionaries: Record<Locale, TranslationSchema> = { en, fr };

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "fr";
}
function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: any, key) => acc == null ? undefined : acc[key], obj);
}
function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => vars[key] === undefined ? match : String(vars[key]));
}
interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) document.documentElement.lang = locale;
  }, [locale, hydrated]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  const t = useMemo(() => (key: string, vars?: Record<string, string | number>) => {
    const value = getPath(dictionaries[locale], key);
    if (typeof value === "string") return interpolate(value, vars);
    const fallback = getPath(dictionaries.en, key);
    if (typeof fallback === "string") return interpolate(fallback, vars);
    return key;
  }, [locale]);

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
