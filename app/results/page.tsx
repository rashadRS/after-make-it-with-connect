'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function ResultsPage() {
  const { t } = useLanguage();
  const { toggleFav } = useFavorites();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem('studytech_results');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('results.title')}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((r) => {
          const reason = r.reasonKeys?.map((k: string) => t(`results.reasons.${k}`)).join(' • ') || t('results.reasons.default');
          return (
            <article key={r.product.id} className="card p-5">
              <h2 className="text-lg font-semibold">{r.product.model}</h2>
              <p className="text-3xl font-bold text-indigo-500">{r.match}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-300"><b>{t('results.reason')}:</b> {reason}</p>
              <div className="mt-4 flex gap-2">
                <a href={r.product.buyLink} target="_blank" rel="noreferrer" className="btn-primary">{t('results.view')}</a>
                <button onClick={() => toggleFav(r.product.id)} className="btn-secondary">{t('results.save')}</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
