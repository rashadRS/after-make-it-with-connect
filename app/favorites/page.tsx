'use client';
import { DeviceCard } from '@/components/DeviceCard';
import { products } from '@/config/products';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const list = products.filter((p) => favorites.includes(p.id));
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('favorites.title')}</h1>
      {!list.length ? <p className="text-slate-500">{t('favorites.empty')}</p> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{list.map((p) => <DeviceCard key={p.id} product={p} viewText={t('devices.view')} saveText={t('favorites.remove')} />)}</div>}
    </section>
  );
}
