import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '트랄라레로 트랄랄라 vs 퉁퉁퉁퉁 사후라',
  description: '캐릭터 클릭 배틀! 당신의 선택으로 승자를 결정하세요!',
  metadataBase: new URL('https://trallvs.vercel.app'),
  verification: {
    google: 'ca-pub-7690408360085725',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}