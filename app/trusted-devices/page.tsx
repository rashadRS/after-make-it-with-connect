'use client';
import { DeviceCard } from '@/components/DeviceCard';
import { products } from '@/config/products';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TrustedDevicesPage() {
  const { t } = useLanguage();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{t('devices.title')}</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => <DeviceCard key={p.id} product={p} viewText={t('devices.view')} saveText={t('results.save')} />)}
      </div>
    </section>
  );
}
