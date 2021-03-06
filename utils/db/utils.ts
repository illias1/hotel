import { DATA, IHotel, IRoom, IRoomType } from ".";

export const getAllRoomTypes = () =>
  Object.values(DATA).reduce(
    (accumulated, hotel) => [...accumulated, ...hotel.roomTypes],
    [] as []
  );

export const getRoomTypeById = (roomTypeId: string) => {
  const allRoomTypesArray = getAllRoomTypes();

  return allRoomTypesArray.find((roomType) => roomType.id === roomTypeId);
};

export const getRoomTypeByPriceId = (stripePriceId: string) => {
  const allRoomTypesArray = getAllRoomTypes();

  return allRoomTypesArray.find(
    ({ priceRegular, priceWeekend }) =>
      priceRegular === stripePriceId || priceWeekend === stripePriceId
  );
};

export const getHotelByRoomTypeId = (roomTypeId: string): IHotel => {
  let hotelWanted: IHotel;
  Object.values(DATA).forEach((hotel) => {
    const roomType = hotel.roomTypes.find((roomType) => roomType.id === roomTypeId);
    if (roomType) {
      hotelWanted = hotel;
    }
  });
  return hotelWanted;
};

export const getAllRoomsFromRoomTypesArray = (roomTypes: IRoomType[]): IRoom[] => {
  const rooms = [];
  roomTypes.forEach((roomType) => {
    roomType.rooms.forEach((room) => rooms.push(room));
  });
  return rooms;
};
