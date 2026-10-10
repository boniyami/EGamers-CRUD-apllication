import { Device } from './device';
import { Game } from './game';

export interface Player {
  playerId: number;
  playerName: string;
  regDate?: Date | string;
  regFee?: number;
  isActive?: boolean;
  deviceId?: number;
  imageUrl?: string;
  device?: Device;
  games?: Game[];
}
