'use client';

import { useState, useEffect } from 'react';
import { Character, ClickEvent, GameState } from '@/lib/types';

const CLICK_MESSAGES = [
  '클릭!', '좋아요!', '계속 해봐요!', '더 빨리!', '대단해요!',
  '와우!', '굉장해요!', '멋져요!', '최고예요!', '믿을 수 없어요!',
  '환상적이에요!', '완벽해요!', '훌륭해요!', '빛나요!', '대박이에요!'
];

const MILESTONE_MESSAGES = [
  '시작했어요!',
  '잘하고 있어요!',
  '멈추지 마세요!',
  '불타오르네요!',
  '막을 수 없어요!',
  '전설이에요!',
  '신과 같아요!',
  '놀라워요!',
  '특별해요!',
  '한계를 넘어서요!'
];

const getRandomColor = () => {
  const colors = [
    '#F43F5E', '#EC4899', '#8B5CF6', '#6366F1', 
    '#3B82F6', '#0EA5E9', '#06B6D4', '#10B981', 
    '#84CC16', '#EAB308', '#F59E0B', '#F97316'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function useGameState(character: Character) {
  const [gameState, setGameState] = useState<GameState>({
    clicks: 0,
    events: []
  });
  
  useEffect(() => {
    const storedClicks = localStorage.getItem(`character${character}Clicks`);
    if (storedClicks) {
      setGameState(prevState => ({
        ...prevState,
        clicks: parseInt(storedClicks, 10)
      }));
    }
  }, [character]);
  
  useEffect(() => {
    localStorage.setItem(`character${character}Clicks`, gameState.clicks.toString());
  }, [gameState.clicks, character]);
  
  const handleClick = (x: number, y: number) => {
    const newClickCount = gameState.clicks + 1;
    const isMilestone = newClickCount % 5 === 0;
    
    const newEvent: ClickEvent = {
      id: Math.random().toString(36).substring(2, 9),
      text: isMilestone 
        ? MILESTONE_MESSAGES[Math.min(Math.floor(newClickCount / 5), MILESTONE_MESSAGES.length - 1)]
        : CLICK_MESSAGES[Math.floor(Math.random() * CLICK_MESSAGES.length)],
      x,
      y,
      color: getRandomColor(),
      scale: isMilestone ? 1.5 : 1,
      rotation: Math.random() * 20 - 10,
    };
    
    setGameState(prevState => ({
      clicks: newClickCount,
      events: [...prevState.events, newEvent].slice(-10)
    }));
    
    if (isMilestone && typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--confetti-time', '5s');
      setTimeout(() => {
        document.documentElement.style.setProperty('--confetti-time', '0s');
      }, 5000);
    }
  };
  
  const removeEvent = (eventId: string) => {
    setGameState(prevState => ({
      ...prevState,
      events: prevState.events.filter(event => event.id !== eventId)
    }));
  };
  
  return {
    gameState,
    handleClick,
    removeEvent
  };
}