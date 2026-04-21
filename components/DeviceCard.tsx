'use client';
import Image from 'next/image';
import { Product } from '@/config/types';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

export function DeviceCard({ product, viewText, saveText }: { product: Product; viewText: string; saveText?: string }) {
  const { favorites, toggleFav } = useFavorites();
  const active = favorites.includes(product.id);
  return (
    <article className="card overflow-hidden">
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
        <Image src={product.image} alt={product.model} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs text-slate-500">{product.brand}</p>
          <h3 className="text-lg font-semibold">{product.model}</h3>
        </div>
        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>CPU: {product.cpu}</li><li>RAM: {product.ram}</li><li>Storage: {product.storage}</li><li>GPU: {product.gpu}</li><li>Battery: {product.battery}</li><li>RM {product.price}</li>
        </ul>
        <div className="flex gap-2">
          <a href={product.buyLink} target="_blank" rel="noreferrer" className="btn-primary flex-1">{viewText}</a>
          {saveText && <button onClick={() => toggleFav(product.id)} className="btn-secondary"><Heart size={16} className={active ? 'fill-red-500 text-red-500' : ''}/> {saveText}</button>}
        </div>
      </div>
    </article>
  );
}
