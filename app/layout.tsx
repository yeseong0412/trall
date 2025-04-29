import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '트랄라레로 트랄랄라 VS 퉁퉁퉁퉁퉁 사후라 - 인기 클릭 배틀 게임',
  description: '🔥 트랄라레로 트랄랄라와 퉁퉁퉁퉁퉁 사후라의 클릭 배틀 게임! 지금 바로 참여하고 승리를 결정하세요! 간단한 클릭으로 즐기는 재미있는 캐릭터 배틀 게임. 무료로 즐기세요!',
  keywords: '트랄라레로, 트랄랄라, 퉁퉁퉁퉁퉁, 사후라, 클릭 게임, 클릭 배틀, 클릭형 게임, 캐릭터 배틀, 재미있는 게임, 간단한 게임, 온라인 게임, 웹 게임, 무료 게임, 인기 게임, 트렌드 게임, 실시간 배틀, 캐릭터 대결',
  openGraph: {
    title: '트랄라레로 트랄랄라 VS 퉁퉁퉁퉁퉁 사후라 - 인기 클릭 배틀 게임',
    description: '🔥 트랄라레로 트랄랄라와 퉁퉁퉁퉁퉁 사후라의 클릭 배틀 게임! 지금 바로 참여하고 승리를 결정하세요!',
    type: 'website',
    locale: 'ko_KR',
    siteName: '트랄라레로 VS 퉁퉁퉁퉁퉁 사후라',
    images: [
      {
        url: 'https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png',
        width: 1200,
        height: 630,
        alt: '트랄라레로 트랄랄라 VS 퉁퉁퉁퉁퉁 사후라 배틀 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '트랄라레로 트랄랄라 VS 퉁퉁퉁퉁퉁 사후라 - 인기 클릭 배틀 게임',
    description: '🔥 트랄라레로 트랄랄라와 퉁퉁퉁퉁퉁 사후라의 클릭 배틀 게임! 지금 바로 참여하세요!',
    images: ['https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png'],
    creator: '@trallvs',
  },
  alternates: {
    canonical: 'https://italianbrainrot.kro.kr',
  },
  metadataBase: new URL('https://italianbrainrot.kro.kr'),
  verification: {
    google: 'ca-pub-7690408360085725',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}