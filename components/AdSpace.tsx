'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
  position: 'top' | 'bottom' | 'side';
}

export function AdSpace({ position }: AdSpaceProps) {
  const [minimized, setMinimized] = useState(false);
  
  // Sample ad content - in a real app, this would be replaced with actual ad code
  const adContent = (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <p className="text-sm text-gray-400 mb-2">Advertisement</p>
      <div className="w-full h-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Your Ad Here</span>
      </div>
    </div>
  );
  
  if (minimized) {
    return (
      <div className={cn(
        "bg-gray-800/50 border border-gray-700 rounded-lg mb-4",
        position === 'side' && "w-16 flex-shrink-0"
      )}>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full h-8" 
          onClick={() => setMinimized(false)}
        >
          Show Ad
        </Button>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "bg-gray-800/50 border border-gray-700 rounded-lg mb-4 relative overflow-hidden",
      position === 'side' && "w-60 flex-shrink-0"
    )}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-1 right-1 h-6 w-6 p-0" 
        onClick={() => setMinimized(true)}
      >
        <X className="h-4 w-4" />
      </Button>
      {adContent}
    </div>
  );
}