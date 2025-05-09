'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy } from 'lucide-react';
import { AdSpace } from '@/components/AdSpace';
import { subscribeToClicks } from '@/lib/firebase';
import Image from 'next/image';

export default function Dashboard() {
  const [characterAClicks, setCharacterAClicks] = useState(0);
  const [characterBClicks, setCharacterBClicks] = useState(0);

  useEffect(() => {
    // Firebase 실시간 구독 설정
    const unsubscribeA = subscribeToClicks('A', (count) => {
      console.log('Character A clicks updated:', count);
      setCharacterAClicks(count);
    });

    const unsubscribeB = subscribeToClicks('B', (count) => {
      console.log('Character B clicks updated:', count);
      setCharacterBClicks(count);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeA();
      unsubscribeB();
    };
  }, []);

  const totalClicks = characterAClicks + characterBClicks;
  const aPercentage = totalClicks > 0 ? (characterAClicks / totalClicks) * 100 : 0;
  const bPercentage = totalClicks > 0 ? (characterBClicks / totalClicks) * 100 : 0;
  
  const winner = characterAClicks > characterBClicks 
    ? '트랄라레로 트랄랄라' 
    : characterBClicks > characterAClicks 
      ? '퉁퉁퉁퉁 사후라' 
      : '무승부';

  const isAWinning = characterAClicks > characterBClicks;
  const isBWinning = characterBClicks > characterAClicks;
  const isTie = characterAClicks === characterBClicks;

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
        
        <div className="flex-1 flex flex-col p-4 md:p-8 space-y-4 md:space-y-8 overflow-y-auto">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">홈으로</span>
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2">클릭 배틀 대시보드</h1>
            <p className="text-sm md:text-base text-gray-300">트랄라레로 트랄랄라와 퉁퉁퉁퉁 사후라의 현재 전투 상황</p>
          </div>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl md:text-2xl text-white">전투 결과</CardTitle>
              <div className="px-3 py-1 rounded-full bg-gray-700/50 text-sm md:text-base text-white">
                총 클릭: {totalClicks}
              </div>
            </CardHeader>
            
            <CardContent>
              {totalClicks === 0 ? (
                <div className="text-center p-4 md:p-8 text-gray-400">
                  아직 클릭이 없습니다. 캐릭터를 선택하고 클릭을 시작해보세요!
                </div>
              ) : (
                <>
                  {winner !== '무승부' && (
                    <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg">
                      <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-4">
                        <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                        <span className="text-lg md:text-xl font-bold text-white">
                          {winner}가 이기고 있어요!
                        </span>
                      </div>
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                        <Image
                          src={isAWinning 
                            ? "https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png"
                            : "https://i1.sndcdn.com/artworks-qJ5IFyKat8H70Vkz-tYUbnQ-t1080x1080.jpg"}
                          alt={isAWinning ? "트랄라레로 트랄랄라" : "퉁퉁퉁퉁 사후라"}
                          className="w-full h-full object-cover"
                          width={500}
                          height={500}
                          priority
                        />
                      </div>
                    </div>
                  )}
                  
                  {winner === '무승부' && (
                    <div className="flex flex-col items-center mb-4 md:mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg">
                      <div className="flex items-center justify-center mb-4">
                        <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                        <span className="text-lg md:text-xl font-bold text-yellow-400">무승부!</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                          <Image
                            src="https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png"
                            alt="트랄라레로 트랄랄라"
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                            priority
                          />
                        </div>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                          <Image
                            src="https://i1.sndcdn.com/artworks-qJ5IFyKat8H70Vkz-tYUbnQ-t1080x1080.jpg"
                            alt="퉁퉁퉁퉁 사후라"
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-medium text-blue-400">트랄라레로 트랄랄라</span>
                        <span className="text-white">{characterAClicks} 클릭 ({Math.round(aPercentage)}%)</span>
                      </div>
                      <Progress value={aPercentage} className="h-2 bg-gray-700" 
                        indicatorClassName="bg-gradient-to-r from-blue-600 to-blue-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="font-medium text-red-400">퉁퉁퉁퉁 사후라</span>
                        <span className="text-white">{characterBClicks} 클릭 ({Math.round(bPercentage)}%)</span>
                      </div>
                      <Progress value={bPercentage} className="h-2 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-red-600 to-red-400" />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/a" className="w-full">
              <Button className="w-full h-16 md:h-20 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300">
                <span className="text-base md:text-xl">트랄라레로 트랄랄라 돕기</span>
              </Button>
            </Link>
            
            <Link href="/b" className="w-full">
              <Button className="w-full h-16 md:h-20 bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300">
                <span className="text-base md:text-xl">퉁퉁퉁퉁 사후라 돕기</span>
              </Button>
            </Link>
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
