'use client';
import { learnTopics } from '@/data/learnTopics';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LearnBasicsPage() {
  const { t, lang } = useLanguage();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('learn.title')}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {learnTopics.map((topic) => (
          <article key={topic.key} className="card p-4">
            <h2 className="mb-2 text-lg font-semibold">{topic.title[lang]}</h2>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li><b>{t('learn.what')}:</b> {topic.what[lang]}</li>
              <li><b>{t('learn.why')}:</b> {topic.why[lang]}</li>
              <li><b>{t('learn.example')}:</b> {topic.example[lang]}</li>
              <li><b>{t('learn.mistake')}:</b> {topic.mistake[lang]}</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
