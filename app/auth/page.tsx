'use client';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AuthPage() {
  const { signin } = useAuth();
  const { t } = useLanguage();
  const params = useSearchParams();
  const router = useRouter();
  const mode = params.get('mode') === 'signup' ? 'signup' : 'signin';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    signin({ name: name || email.split('@')[0], email });
    router.push('/dashboard');
  };

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={submit} className="card space-y-4 p-6">
        <h1 className="text-2xl font-bold">{mode === 'signup' ? t('auth.signup') : t('auth.signin')}</h1>
        {mode === 'signup' && <input className="input-base" placeholder={t('auth.name')} value={name} onChange={(e) => setName(e.target.value)} />}
        <input className="input-base" placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
        <input className="input-base" placeholder={t('auth.password')} value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
        <button className="btn-primary w-full">{mode === 'signup' ? t('auth.signup') : t('auth.signin')}</button>
      </form>
    </section>
  );
}
