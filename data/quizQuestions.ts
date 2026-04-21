import { QuizQuestion } from '@/config/types';

export const quizQuestions: QuizQuestion[] = [
  { id: 'major', label: { ar: 'ما تخصصك؟', en: 'What is your major?' }, supportsOther: true, options: [
    { value: 'cs', label: { ar: 'علوم حاسوب', en: 'Computer Science' } },
    { value: 'design', label: { ar: 'تصميم', en: 'Design' } },
    { value: 'business', label: { ar: 'إدارة أعمال', en: 'Business' } },
    { value: 'engineering', label: { ar: 'هندسة', en: 'Engineering' } }
  ]},
  { id: 'budget', label: { ar: 'ما ميزانيتك (رينجت)؟', en: 'What is your budget (MYR)?' }, supportsOther: true, options: [
    { value: 'under5000', label: { ar: 'أقل من 5000', en: 'Under 5000' } },
    { value: '5000to8000', label: { ar: '5000 - 8000', en: '5000 - 8000' } },
    { value: 'above8000', label: { ar: 'أكثر من 8000', en: 'Above 8000' } }
  ]},
  { id: 'usage', label: { ar: 'الاستخدام الأساسي؟', en: 'Primary usage?' }, supportsOther: true, options: [
    { value: 'coding', label: { ar: 'برمجة', en: 'Coding' } },
    { value: 'editing', label: { ar: 'مونتاج/تصميم', en: 'Editing/Design' } },
    { value: 'office', label: { ar: 'دراسة مكتبية', en: 'Office/Study' } },
    { value: 'gaming', label: { ar: 'ألعاب خفيفة', en: 'Light Gaming' } }
  ]},
  { id: 'priority', label: { ar: 'ما الأولوية الأهم؟', en: 'Top priority?' }, supportsOther: true, options: [
    { value: 'battery', label: { ar: 'عمر البطارية', en: 'Battery life' } },
    { value: 'performance', label: { ar: 'الأداء', en: 'Performance' } },
    { value: 'portability', label: { ar: 'الخفة والتنقل', en: 'Portability' } },
    { value: 'display', label: { ar: 'الشاشة', en: 'Display quality' } }
  ]}
];
