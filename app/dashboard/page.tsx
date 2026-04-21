'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { products } from '@/config/products';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const favs = products.filter((p) => favorites.includes(p.id));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
      <p className="text-slate-500">{t('dashboard.subtitle')}</p>
      <div className="card p-5">{t('auth.welcome')} {user?.name ?? 'Student'}</div>
      <div className="grid gap-3 md:grid-cols-2">
        {favs.map((f) => <div key={f.id} className="card p-4">{f.model} - RM {f.price}</div>)}
      </div>
    </section>
  );
}
