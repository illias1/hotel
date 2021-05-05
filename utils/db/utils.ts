import { DATA, IHotel, IRoomType } from ".";

export const getAllRoomTypes = () =>
  Object.values(DATA).reduce(
    (accumulated, hotel) => [...accumulated, ...hotel.roomTypes],
    [] as IRoomType[]
  );

export const getRoomTypeById = (roomTypeId: string): IRoomType | undefined => {
  const allRoomTypesArray = getAllRoomTypes();

  return allRoomTypesArray.find((roomType) => roomType.id === roomTypeId);
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
