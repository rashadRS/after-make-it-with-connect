import './globals.css';
import type { Metadata } from 'next';
import { Tajawal, Inter } from 'next/font/google';
import { AppProviders } from '@/contexts/AppProviders';
import { Navbar } from '@/components/Navbar';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const tajawal = Tajawal({ subsets: ['arabic'], variable: '--font-tajawal', weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'StudyTech Advisor',
  description: 'Bilingual smart laptop advisor for Malaysian students'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} antialiased`}>
        <AppProviders>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <FloatingWhatsApp />
        </AppProviders>
      </body>
    </html>
  );
}
