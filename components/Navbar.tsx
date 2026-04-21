'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from './Logo';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { muted, toggleMute } = useSound();

  const links = [
    ['/', t('nav.home')], ['/learn-basics', t('nav.learn')], ['/quiz', t('nav.quiz')], ['/trusted-devices', t('nav.devices')], ['/favorites', t('nav.favorites')], ['/contact', t('nav.contact')]
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/"><Logo /></Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {links.map(([href, label]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">{label}</Link>)}
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="btn-secondary px-3 py-2">{lang === 'ar' ? 'EN' : 'AR'}</button>
          <button onClick={toggle} className="btn-secondary px-3 py-2">{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}</button>
          <button onClick={toggleMute} className="btn-secondary px-3 py-2" aria-label="sound">{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}</button>
          {user ? <><Link href="/dashboard" className="btn-secondary px-3 py-2">{t('nav.dashboard')}</Link><button onClick={logout} className="btn-secondary px-3 py-2">{t('nav.logout')}</button></> : <><Link href="/auth?mode=signin" className="btn-secondary px-3 py-2">{t('nav.signin')}</Link><Link href="/auth?mode=signup" className="btn-primary px-3 py-2">{t('nav.signup')}</Link></>}
        </nav>
      </div>
    </header>
  );
}
