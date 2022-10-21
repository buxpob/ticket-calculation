export type Data = {
  price: number,
  totalPrice: number,
  direction: string,
  countTickets: number,
  isOpenModal: boolean,
  timeToGo: string,
  timeAgo: string,
  listTimeAgo: string[],
};

export type Direction = {
  AB: string,
  BA: string,
  ABA: string,
};

export type Price = {
  AB: number,
  BA: number,
  ABA: number,
};
