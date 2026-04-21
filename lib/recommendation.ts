import { products } from '@/config/products';

export type QuizAnswers = Record<string, string>;

export function recommendDevices(answers: QuizAnswers) {
  const major = answers.major || '';
  const budget = answers.budget || '';
  const usage = answers.usage || '';
  const priority = answers.priority || '';

  const scored = products.map((p) => {
    let score = 0;
    const reasonKeys: string[] = [];

    if (major.includes('cs') || usage.includes('coding')) { score += p.performance * 1.5; reasonKeys.push('coding'); }
    if (major.includes('design') || usage.includes('editing')) { score += (p.performance + p.designScore) * 1.3; reasonKeys.push('design'); }
    if (major.includes('business') || usage.includes('office')) { score += (p.batteryScore + p.portability) * 1.3; reasonKeys.push('business'); }
    if (major.includes('engineering') || usage.includes('gaming')) { score += p.performance * 1.4; reasonKeys.push('heavy'); }

    if (priority.includes('battery')) { score += p.batteryScore * 2; reasonKeys.push('battery'); }
    if (priority.includes('portability')) { score += p.portability * 2; reasonKeys.push('portability'); }
    if (priority.includes('performance')) { score += p.performance * 2; reasonKeys.push('performance'); }
    if (priority.includes('display')) { score += p.designScore * 2; reasonKeys.push('display'); }

    if (budget === 'under5000' && p.price <= 5000) score += 18;
    if (budget === '5000to8000' && p.price > 5000 && p.price <= 8000) score += 18;
    if (budget === 'above8000' && p.price > 8000) score += 18;

    const match = Math.min(98, Math.round(score));

    return { product: p, match, reasonKeys: reasonKeys.slice(0, 2) };
  });

  return scored.sort((a, b) => b.match - a.match).slice(0, 3);
}
