import { DATA, IRoomType } from ".";

export const getAllRoomTypes = () =>
  Object.values(DATA).reduce(
    (accumulated, hotel) => [...accumulated, ...hotel.roomTypes],
    [] as IRoomType[]
  );

export const getRoomTypeById = (roomTypeId: string): IRoomType | undefined => {
  const allRoomTypesArray = getAllRoomTypes();

  return allRoomTypesArray.find((roomType) => roomType.id === roomTypeId);
};
