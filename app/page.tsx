'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Logo } from '@/components/Logo';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <section className="card relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,.25),transparent_50%)]" />
      <div className="relative mx-auto max-w-3xl space-y-6 text-center">
        <div className="mx-auto w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">AI-powered • Malaysia</div>
        <div className="mx-auto w-fit"><Logo /></div>
        <h1 className="text-4xl font-bold sm:text-5xl">{t('hero.title')}</h1>
        <p className="text-slate-300">{t('hero.subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/quiz" className="btn-primary">{t('hero.start')}</Link>
          <Link href="/learn-basics" className="btn-secondary">{t('hero.learn')}</Link>
        </div>
      </div>
    </section>
  );
}
