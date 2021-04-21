export const PATHS = {
  home: "/",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  hotels: "/hotels",
  rooms: (hotel: string) => `/hotels/${hotel}/rooms`,
  room: (hotel: string, room: string) => `/hotels/${hotel}/rooms/${room}`,
};
