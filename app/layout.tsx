import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { Providers } from './provider/provider';

const inter = Inter({ subsets: ['latin'] });
const Navbar = dynamic(() => import('../app/components/nav'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Workout Plan',
  description: 'Planing your workout plan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
