'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'studytech_favorites';
const FavoritesContext = createContext<{favorites: string[]; toggleFav: (id: string)=>void; remove: (id: string)=>void;} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setFavorites(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFav = (id: string) => setFavorites((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const remove = (id: string) => setFavorites((p) => p.filter((x) => x !== id));
  const value = useMemo(() => ({ favorites, toggleFav, remove }), [favorites]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => { const c = useContext(FavoritesContext); if (!c) throw new Error('fav missing'); return c; };
