export const PATHS = {
  home: "/",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  hotels: "/hotels",
  checkout: "/checkout",
  checkout_second: "/checkout/guests",
  rooms: (hotel: string) => `/hotels/${hotel}/rooms`,
  room: (hotel: string, room: string) => `/hotels/${hotel}/rooms/${room}`,
};
