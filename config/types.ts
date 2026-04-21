export type Language = 'ar' | 'en';

export type Product = {
  id: string;
  brand: string;
  model: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  battery: string;
  price: number;
  image: string;
  buyLink: string;
  tags: string[];
  portability: number;
  performance: number;
  batteryScore: number;
  designScore: number;
};

export type Advisor = { name: string; whatsapp: string };

export type QuizOption = { value: string; label: Record<Language, string> };
export type QuizQuestion = {
  id: string;
  label: Record<Language, string>;
  options: QuizOption[];
  supportsOther?: boolean;
};
