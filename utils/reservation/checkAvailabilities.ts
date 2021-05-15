import {
  RoomBookingQuery,
  RoomBookingQueryResult,
  RoomBookingQueryVariables,
} from "../../src/generated/graphql";
import { BookingStatus, roomBookings } from "../../src/queries";
import { client } from "../api";
import { IRoom, IRoomType, IRoomTypeWithNumberPrice } from "../db";
import { getAllRoomsFromRoomTypesArray, getAllRoomTypes, getRoomTypeById } from "../db/utils";
import { validateDate, ValidationError } from "../parseCheckoutUrl";
import { getPrices } from "../payment";

export interface ISearchQuery {
  people: string;
  checkIn: string;
  checkOut: string;
}
export interface IAvailableRoomType extends IRoomTypeWithNumberPrice {
  availableRoom: IRoom;
  checkIn: string;
  checkOut: string;
  people: number;
}

export const validateSearchQuery = (query: ISearchQuery) => {
  if (!("people" in query && "checkIn" in query && "checkOut" in query)) {
    throw new ValidationError("Url is corrupted");
  }
  validateDate(query.checkOut);
  validateDate(query.checkIn);
  if (!isNormalInteger(query.people)) {
    throw new ValidationError("Number of people has to be an integer");
  }
};

export const checkAvailabilities = async (
  { people, checkIn, checkOut }: ISearchQuery,
  stripeKey: string,
  roomTypeIds?: string[]
): Promise<IAvailableRoomType[]> => {
  const peopleCount = Number(people);
  const validRoomTypes = getAllRoomTypes().filter((roomType) =>
    roomTypeIds ? roomTypeIds.includes(roomType.id) : roomType.peopleCount >= peopleCount
  );
  const rooms = getAllRoomsFromRoomTypesArray(validRoomTypes);
  const { data } = await client(process.env.ADMIN_SECRET).query<
    RoomBookingQuery,
    RoomBookingQueryVariables
  >({
    query: roomBookings,
    variables: {
      where: {
        status: {
          _eq: BookingStatus.CONFIRMED,
        },
        checkIn: {
          _lt: checkOut,
        },
        checkOut: {
          _gt: checkIn,
        },
        _or: validRoomTypes.map((roomType) => ({
          roomTypeId: {
            _eq: roomType.id,
          },
        })),
      },
      limit: 1000,
    },
  });
  const bookings = data.RoomBooking;

  console.log("bookings", bookings.length);

  const validRooms = rooms.filter((room) =>
    bookings.every((booking) => booking.roomID !== room.id)
  );
  const prices = await getPrices(stripeKey);

  const availableRoomTypes = {} as Record<string, IAvailableRoomType>;
  validRooms.forEach((room) => {
    const roomTypeId = room.roomTypeId;
    const roomType = getRoomTypeById(roomTypeId);
    availableRoomTypes[roomTypeId] = {
      ...roomType,
      availableRoom: room,
      people: peopleCount,
      checkIn: checkIn,
      checkOut: checkOut,
      priceRegularNumber: prices[roomType.priceRegular],
      priceWeekendNumber: prices[roomType.priceWeekend],
    };
  });
  return Object.values(availableRoomTypes).sort((a, b) => b.hotelId.localeCompare(a.hotelId));
};

const isNormalInteger = (str) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};
