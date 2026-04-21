'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = { name: string; email: string };
const KEY = 'studytech_user';
const AuthContext = createContext<{user: User | null; signin: (u: User)=>void; logout: ()=>void;} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const signin = (u: User) => { setUser(u); localStorage.setItem(KEY, JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem(KEY); };
  const value = useMemo(() => ({ user, signin, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const c = useContext(AuthContext); if (!c) throw new Error('auth missing'); return c; };
