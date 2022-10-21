import { Price, Direction } from './types/types';

export const LIST_TIME_AB = ['18:00', '18:30', '18:45', '19:00', '19:15', '21:00'];
export const LIST_TIME_BA = ['18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'];

export const TRAVEL_TIME = 50;

export const TicketPrice: Price = {
  AB: 700,
  BA: 700,
  ABA: 1200,
};

export const TicketDirection: Direction = {
  AB: 'из A в B',
  BA: 'из B в A',
  ABA: 'из A в B и обратно в А',
};


