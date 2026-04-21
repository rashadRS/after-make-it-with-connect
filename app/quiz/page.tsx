'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/data/quizQuestions';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';

export default function QuizPage() {
  const { lang, t } = useLanguage();
  const { play } = useSound();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});

  const current = quizQuestions[step];
  const progress = useMemo(() => Math.round(((step + 1) / quizQuestions.length) * 100), [step]);

  const select = (questionId: string, value: string) => {
    play('select');
    setAnswers((p) => ({ ...p, [questionId]: value }));
  };

  const next = async () => {
    if (step === 0) play('start');
    if (step < quizQuestions.length - 1) return setStep((s) => s + 1);
    const finalAnswers = { ...answers };
    Object.entries(otherValues).forEach(([k, v]) => { if (answers[k] === 'other') finalAnswers[k] = `${answers[k]}:${v}`; });
    const response = await fetch('/api/recommend', { method: 'POST', body: JSON.stringify(finalAnswers) });
    const data = await response.json();
    play('finish');
    sessionStorage.setItem('studytech_results', JSON.stringify(data.top));
    router.push('/results');
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">{t('quiz.title')}</h1>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500" style={{ width: `${progress}%` }} /></div>
      <p className="text-sm text-slate-500">{t('quiz.progress')}: {progress}%</p>
      <article className="card space-y-4 p-5">
        <h2 className="text-xl font-semibold">{current.label[lang]}</h2>
        <div className="space-y-2">
          {current.options.map((o) => <button key={o.value} onClick={() => select(current.id, o.value)} className={`w-full rounded-xl border px-4 py-3 text-start ${answers[current.id] === o.value ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-300 dark:border-slate-700'}`}>{o.label[lang]}</button>)}
          <button onClick={() => select(current.id, 'other')} className={`w-full rounded-xl border px-4 py-3 text-start ${answers[current.id] === 'other' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-300 dark:border-slate-700'}`}>{t('quiz.other')}</button>
          {answers[current.id] === 'other' && <input className="input-base" value={otherValues[current.id] ?? ''} onChange={(e) => setOtherValues((p) => ({ ...p, [current.id]: e.target.value }))} placeholder={t('quiz.otherPlaceholder')} />}
        </div>
      </article>
      <div className="flex justify-between">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="btn-secondary" disabled={step === 0}>{t('quiz.back')}</button>
        <button onClick={next} className="btn-primary">{step === quizQuestions.length - 1 ? t('quiz.submit') : t('quiz.next')}</button>
      </div>
    </section>
  );
}
