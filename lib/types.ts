export type Character = 'A' | 'B';

export interface ClickEvent {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  scale: number;
  rotation: number;
}

export interface GameState {
  clicks: number;
  events: ClickEvent[];
}