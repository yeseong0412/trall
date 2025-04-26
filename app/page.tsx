'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { subscribeToClicks } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdSpace } from '@/components/AdSpace';

export default function Home() {
  const [clicksA, setClicksA] = useState(0);
  const [clicksB, setClicksB] = useState(0);

  useEffect(() => {
    const unsubscribeA = subscribeToClicks('A', (count: number) => {
      setClicksA(count);
    });

    const unsubscribeB = subscribeToClicks('B', (count: number) => {
      setClicksB(count);
    });

    return () => {
      unsubscribeA();
      unsubscribeB();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-col md:flex-row h-screen">
        {/* 모바일에서는 광고를 상단에 배치 */}
        <div className="md:hidden w-full h-20 flex items-center justify-center">
          <AdSpace position="top" />
        </div>

        {/* 데스크톱에서는 광고를 좌우에 배치 */}
        <div className="hidden md:flex md:w-1/6 items-center justify-center">
          <AdSpace position="side" />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 space-y-4 md:space-y-8">
          <div className="text-center space-y-2 md:space-y-4">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              캐릭터 클릭 배틀!
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-lg mx-auto">
              캐릭터를 선택하고 클릭하여 승리를 도와주세요!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-3xl justify-center">
            <Link href="/a" className="w-full md:w-auto">
              <Button
                className="w-full h-32 md:h-40 lg:h-60 md:w-60 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
                    <Image
                      src="https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png"
                      alt="트랄라레로 트랄랄라"
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                      priority
                    />
                  </div>
                  <span className="text-sm md:text-lg font-medium">트랄라레로 트랄랄라</span>
                  <div className="text-2xl md:text-4xl font-bold text-blue-300">{clicksA}</div>
                </div>
              </Button>
            </Link>

            <div className="flex items-center justify-center">
              <div className="bg-white/10 p-2 md:p-4 rounded-full">
                <span className="text-xl md:text-2xl font-bold">VS</span>
              </div>
            </div>

            <Link href="/b" className="w-full md:w-auto">
              <Button
                className="w-full h-32 md:h-40 lg:h-60 md:w-60 bg-gradient-to-br from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
                    <Image
                      src="https://i1.sndcdn.com/artworks-qJ5IFyKat8H70Vkz-tYUbnQ-t1080x1080.jpg"
                      alt="퉁퉁퉁퉁 사후라"
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                      priority
                    />
                  </div>
                  <span className="text-sm md:text-lg font-medium">퉁퉁퉁퉁 사후라</span>
                  <div className="text-2xl md:text-4xl font-bold text-red-300">{clicksB}</div>
                </div>
              </Button>
            </Link>
          </div>

          <div className="text-center text-gray-400">
            <p className="text-lg md:text-2xl">현재 점수: 트랄라레로 트랄랄라 {clicksA} - {clicksB} 퉁퉁퉁퉁 사후라</p>
          </div>
        </div>

        {/* 데스크톱에서는 광고를 좌우에 배치 */}
        <div className="hidden md:flex md:w-1/6 items-center justify-center">
          <AdSpace position="side" />
        </div>

        {/* 모바일에서는 광고를 하단에 배치 */}
        <div className="md:hidden w-full h-20 flex items-center justify-center">
          <AdSpace position="bottom" />
        </div>
      </div>
    </main>
  );
}