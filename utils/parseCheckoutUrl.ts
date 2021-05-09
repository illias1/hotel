import moment from "moment";

import { DATA, IHotelName } from "./db";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

type ICheckoutQueryInitialParams = Record<string, string>;
export interface ICheckoutQueryParams {
  [key: string]: string | number;
  roomCount: number;
}

const params = { room: "", people: "", hotel: "", checkOut: "", checkIn: "" };
export type ICheckoutBooking = {
  room: string;
  people: number;
  hotel: IHotelName;
  checkOut: string;
  checkIn: string;
};

export const parseCheckoutUrl = (query: any): ICheckoutBooking[] => {
  const typedQuery = query as ICheckoutQueryInitialParams;
  const finalDict: ICheckoutBooking[] = [];

  if (!("rooms" in typedQuery)) {
    throw new ValidationError(`'rooms' isn't in the url query!`);
  }
  const roomCount = Number(typedQuery.rooms);
  if (!Number.isInteger(roomCount)) {
    throw new ValidationError(`'rooms' isn't an integer!`);
  }
  for (let index = 1; index < roomCount + 1; index++) {
    const dynamicParams = { ...params };
    Object.keys(params).forEach((element) => (dynamicParams[element] = `${element}_${index}`));

    Object.values(dynamicParams).forEach((param) => {
      if (!(param in typedQuery)) {
        throw new ValidationError(`${param} isn't in the url query!`);
      }
    });

    const validatedPeople = Number(query[dynamicParams.people]);
    if (!Number.isInteger(validatedPeople)) {
      throw new ValidationError(`${validatedPeople} people param isn't an integer`);
    }

    const validatedHotel = query[dynamicParams.hotel];
    if (!Object.keys(DATA).includes(validatedHotel)) {
      throw new ValidationError(`Hotel isn't valid ${validatedHotel}`);
    }

    const validatedRoom = query[dynamicParams.room];
    if (
      !DATA[validatedHotel as IHotelName].roomTypes.map((room) => room.id).includes(validatedRoom)
    ) {
      throw new ValidationError(`Room ${validatedRoom} isn't valid for hotel ${validatedHotel}`);
    }

    const validateCheckOut = query[dynamicParams.checkOut];
    const validateCheckIn = query[dynamicParams.checkIn];
    validateDate(validateCheckIn);
    validateDate(validateCheckOut);
    finalDict.push({
      checkIn: validateCheckIn,
      checkOut: validateCheckOut,
      hotel: validatedHotel,
      people: validatedPeople,
      room: validatedRoom,
    });
    // finalDict[dynamicParams.checkIn] = validateCheckIn;
    // finalDict[dynamicParams.checkOut] = validateCheckOut;
    // finalDict[dynamicParams.hotel] = validatedHotel;
    // finalDict[dynamicParams.people] = validatedPeople;
    // finalDict[dynamicParams.room] = validatedRoom;
  }

  return finalDict;
};

export const validateDate = (dateString: string) => {
  if (!moment(dateString, "YYYY-MM-DD", true).isValid()) {
    throw new ValidationError(`${dateString} isn't a valid date`);
  }
};

export const getDynamicRoomTypeId = (index: number) => `room_${index}`;

export interface IBuildCheckoutUrlInput {
  roomTypeId: string;
  roomID: string;
  checkIn: string;
  checkOut: string;
  people: number;
  reservationID: string;
  hotelId: string;
}

export const buildCheckoutUrl = (reservation: IBuildCheckoutUrlInput[]) => {
  console.log("reservation", reservation);
  const finalDict: Record<string, string | number> = {};
  for (let index = 1; index < reservation.length + 1; index++) {
    const dynamicParams = { ...params };
    const roomBooking = reservation[index - 1];

    Object.keys(params).forEach((element) => (dynamicParams[element] = `${element}_${index}`));

    finalDict[dynamicParams.checkIn] = roomBooking.checkIn;
    finalDict[dynamicParams.checkOut] = roomBooking.checkOut;
    finalDict[dynamicParams.hotel] = roomBooking.hotelId;
    finalDict[dynamicParams.people] = roomBooking.people;
    finalDict[dynamicParams.room] = roomBooking.roomTypeId;
  }
  const rooms = reservation.length;
  const baseUrl = `/checkout?rooms=${rooms}`;
  return Object.entries(finalDict).reduce((url, [key, value]) => url + `&${key}=${value}`, baseUrl);
};
