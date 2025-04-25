'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Character } from '@/lib/types';
import { ClickEvent } from './ClickEvent';
import { useGameState } from '@/hooks/useGameState';
import { Button } from './ui/button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { AdSpace } from './AdSpace';
import Image from 'next/image';
import { updateClickCount, subscribeToClicks } from '@/lib/firebase';

interface CharacterGameProps {
  character: Character;
}

export function CharacterGame({ character }: CharacterGameProps) {
  const characterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { gameState, handleClick, removeEvent } = useGameState(character);
  const [isAnimating, setIsAnimating] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [opponentClicks, setOpponentClicks] = useState(0);
  const opponent = character === 'A' ? 'B' : 'A';

  useEffect(() => {
    // 현재 캐릭터의 클릭 수 구독
    const unsubscribeCurrent = subscribeToClicks(character, (count) => {
      console.log('Firebase update received:', count);
      setTotalClicks(count);
      if (count !== gameState.clicks) {
        handleClick(0, 0, count);
      }
    });

    // 상대 캐릭터의 클릭 수 구독
    const unsubscribeOpponent = subscribeToClicks(opponent, (count) => {
      setOpponentClicks(count);
    });

    return () => {
      unsubscribeCurrent();
      unsubscribeOpponent();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [character, opponent]);

  const updateFirebase = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      const newClicks = gameState.clicks;
      console.log('Updating Firebase with clicks:', newClicks);
      updateClickCount(character, newClicks)
        .then(() => console.log('Firebase update successful'))
        .catch(error => console.error('Firebase update failed:', error));
    }, 1000);
  };

  const characterInfo = {
    A: {
      name: '트랄라레로 트랄랄라',
      image: 'https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png',
      bgColor: 'from-blue-600 to-blue-400',
      textColor: 'text-blue-400',
      hoverColor: 'from-blue-500 to-blue-300',
      glowColor: 'blue',
    },
    B: {
      name: '퉁퉁퉁퉁 사후라',
      image: 'https://i1.sndcdn.com/artworks-qJ5IFyKat8H70Vkz-tYUbnQ-t1080x1080.jpg',
      bgColor: 'from-red-600 to-red-400',
      textColor: 'text-red-400',
      hoverColor: 'from-red-500 to-red-300',
      glowColor: 'red',
    }
  };

  const style = characterInfo[character];

  const handleCharacterClick = (e: React.MouseEvent) => {
    if (!characterRef.current) return;

    const rect = characterRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    handleClick(x, y);
    updateFirebase();
  };

  const handleCharacterSwitch = () => {
    // 다른 캐릭터로 전환하기 전에 현재 클릭 수를 Firebase에 저장
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    console.log('Saving clicks before switch:', gameState.clicks);
    updateClickCount(character, gameState.clicks)
      .then(() => console.log('Firebase update before switch successful'))
      .catch(error => console.error('Firebase update before switch failed:', error));
  };

  const opponentName = characterInfo[opponent].name;

  return (
      <div
          className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
          ref={containerRef}
      >
        <style jsx global>{`
          @keyframes confettiRain {
            0% { transform: translate(0, 0); opacity: 1; }
            100% { transform: translate(20px, 100vh); opacity: 0; }
          }
        `}</style>

        <header className="flex justify-between items-center p-4 bg-gray-800/80 backdrop-blur-sm z-10">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
          <span className="text-xl font-bold mr-2">
            <span className={style.textColor}>{style.name}</span>
          </span>

            <div className="px-3 py-1 bg-gray-700/50 rounded-full">
              {gameState.clicks} 클릭 (전체: {totalClicks})
            </div>
          </div>

          <div className="flex space-x-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                대시보드
              </Button>
            </Link>
          </div>
        </header>

        <div className="hidden md:flex h-full">
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <AdSpace position="side" />
            </div>

            <div className="w-full flex flex-col items-center justify-center py-8 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 py-2 px-6 bg-black/50 backdrop-blur-sm rounded-b-lg shadow-lg">
                <div className="flex items-center space-x-2">
                <span className={`text-xl font-bold ${character === 'A' ? 'text-blue-400' : 'text-gray-400'}`}>
                  트랄라레로 트랄랄라
                </span>
                  <span className="text-xl font-bold">VS</span>
                  <span className={`text-xl font-bold ${character === 'B' ? 'text-red-400' : 'text-gray-400'}`}>
                  퉁퉁퉁퉁 사후라
                </span>
                </div>
              </div>

              {gameState.events.map(event => (
                  <ClickEvent
                      key={event.id}
                      event={event}
                      onAnimationComplete={removeEvent}
                  />
              ))}

              <div
                  ref={characterRef}
                  className={`
                w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center
                bg-gradient-to-br ${style.bgColor} shadow-2xl
                cursor-pointer select-none overflow-hidden
                transition-all duration-300 mt-16
                ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
              `}
                  style={{
                    boxShadow: isAnimating ? `0 0 60px ${style.glowColor}` : 'none',
                  }}
                  onClick={handleCharacterClick}
              >
                <Image
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    priority
                />
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-2">총 클릭 수</h2>
                <div className="text-5xl font-bold mb-4">{gameState.clicks}</div>
                <div className="text-lg text-gray-400">
                  {opponent === 'A' ? '트랄라레로' : '퉁퉁퉁퉁'} 클릭 수: {opponentClicks}
                </div>

                {gameState.clicks > 0 && gameState.clicks % 5 === 0 && (
                    <div className="text-xl font-semibold animate-pulse my-4" style={{ color: style.glowColor }}>
                      {character === 'A' ? '트랄라레로 트랄랄라가 이기고 있어요!' : '퉁퉁퉁퉁 사후라가 따라잡고 있어요!'}
                    </div>
                )}
              </div>

              <div className="mt-8">
                <Link href={`/${opponent.toLowerCase()}`} onClick={handleCharacterSwitch}>
                  <Button variant="outline" className="border-gray-600">
                    {opponentName}으로 변경
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <AdSpace position="side" />
            </div>
          </div>
        </div>

        <div className="md:hidden flex-1 flex flex-col">
          <AdSpace position="top" />

          <div className="flex-1 flex flex-col items-center justify-center relative py-8 px-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 py-2 px-6 bg-black/50 backdrop-blur-sm rounded-b-lg shadow-lg">
              <div className="flex items-center space-x-2">
              <span className={`text-xl font-bold ${character === 'A' ? 'text-blue-400' : 'text-gray-400'}`}>
                트랄라레로 트랄랄라
              </span>
                <span className="text-xl font-bold">VS</span>
                <span className={`text-xl font-bold ${character === 'B' ? 'text-red-400' : 'text-gray-400'}`}>
                퉁퉁퉁퉁 사후라
              </span>
              </div>
            </div>

            {gameState.events.map(event => (
                <ClickEvent
                    key={event.id}
                    event={event}
                    onAnimationComplete={removeEvent}
                />
            ))}

            <div
                ref={characterRef}
                className={`
              w-40 h-40 rounded-full flex items-center justify-center
              bg-gradient-to-br ${style.bgColor} shadow-2xl
              cursor-pointer select-none overflow-hidden
              transition-all duration-300 mt-16
              ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
            `}
                style={{
                  boxShadow: isAnimating ? `0 0 60px ${style.glowColor}` : 'none',
                }}
                onClick={handleCharacterClick}
            >
              <Image
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                  priority
              />
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold mb-2">총 클릭 수</h2>
              <div className="text-5xl font-bold mb-4">{gameState.clicks}</div>
              <div className="text-lg text-gray-400">
                {opponent === 'A' ? '트랄라레로' : '퉁퉁퉁퉁'} 클릭 수: {opponentClicks}
              </div>

              {gameState.clicks > 0 && gameState.clicks % 5 === 0 && (
                  <div className="text-xl font-semibold animate-pulse my-4" style={{ color: style.glowColor }}>
                    {character === 'A' ? '트랄라레로 트랄랄라가 이기고 있어요!' : '퉁퉁퉁퉁 사후라가 따라잡고 있어요!'}
                  </div>
              )}
            </div>

            <div className="mt-8">
              <Link href={`/${opponent.toLowerCase()}`} onClick={handleCharacterSwitch}>
                <Button variant="outline" className="border-gray-600">
                  {opponentName}으로 변경
                </Button>
              </Link>
            </div>
          </div>

          <AdSpace position="bottom" />
        </div>
      </div>
  );
}
