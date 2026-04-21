'use client';
import { advisors } from '@/config/advisors';
import { useLanguage } from '@/contexts/LanguageContext';

const avatarGradients = [
  'from-indigo-600 to-cyan-500',
  'from-purple-600 to-teal-500'
];

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('contact.title')}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {advisors.map((a, idx) => (
          <article key={a.whatsapp} className="card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[idx % avatarGradients.length]} text-white font-bold shadow`}>{a.name.slice(0, 1)}</div>
              <h2 className="text-lg font-semibold">{a.name}</h2>
            </div>
            <a href={a.whatsapp} target="_blank" rel="noreferrer" className="btn-primary w-full">{t('contact.cta')}</a>
          </article>
        ))}
      </div>
      <form className="card space-y-3 p-5">
        <input className="input-base" placeholder={t('contact.name')} />
        <input className="input-base" placeholder={t('contact.email')} />
        <textarea className="input-base min-h-28" placeholder={t('contact.message')} />
      </form>
    </section>
  );
}
