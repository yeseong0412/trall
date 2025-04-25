export type Character = 'A' | 'B';

export interface ClickEvent {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  scale: number;
  rotation: number;
  timestamp: number;
}

export interface GameState {
  clicks: number;
  events: ClickEvent[];
}