import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';
import MainNav from '@/components/layout/main-nav';
import SiteFooter from '@/components/layout/site-footer';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GuardianAI',
  description: 'AI for Combatting Human Trafficking',
  keywords: ['AI', 'Human Trafficking', 'Machine Learning', 'NGO', 'Law Enforcement'],
  authors: [{name: 'Aditya Bhatia'}, {name: 'Mahin Mirza'}],
  openGraph: {
    title: 'GuardianAI',
    description: 'Leveraging Technology for a Safer Tomorrow',
    url: 'https://guardianai.example.com', // Replace with your actual URL
    siteName: 'GuardianAI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

