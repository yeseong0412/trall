'use client';

import { useEffect, useState } from 'react';
import { ClickEvent as ClickEventType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ClickEventProps {
  event: ClickEventType;
  onAnimationComplete: (id: string) => void;
}

export function ClickEvent({ event, onAnimationComplete }: ClickEventProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Remove the event after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onAnimationComplete(event.id);
      }, 100); // Small additional delay to ensure smooth removal
    }, 1500); // Match this with CSS animation duration

    return () => clearTimeout(timer);
  }, [event.id, onAnimationComplete]);



  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none animate-float z-10 font-bold whitespace-nowrap",
        event.scale > 1 && "text-lg md:text-xl"
      )}
      style={{
        left: `${event.x}px`,
        top: `${event.y}px`,
        color: event.color,
        transform: `scale(${event.scale}) rotate(${event.rotation}deg)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {event.text}
    </div>
  );
}