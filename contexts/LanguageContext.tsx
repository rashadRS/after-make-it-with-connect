'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '@/data/translations.json';
import { Language } from '@/config/types';

const KEY = 'studytech_lang';

type Ctx = { lang: Language; setLang: (l: Language) => void; t: (path: string) => string; dir: 'rtl' | 'ltr' };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Language | null;
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);

  const t = (path: string) => {
    const value = path.split('.').reduce<any>((acc, key) => acc?.[key], (translations as any)[lang]);
    return typeof value === 'string' ? value : path;
  };

  const value = useMemo(() => ({ lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' as const }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('Language context missing');
  return ctx;
};
