import moment from "moment";

import { DATA, IHotelName } from "./db";
import { getRoomTypeById } from "./db/utils";

export interface ICheckOutUrlParams {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  people: number;
}
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const params = { roomTypeId: "", people: "", checkOut: "", checkIn: "" };

export const parseCheckoutUrl = (query: any): ICheckOutUrlParams => {
  Object.keys(params).forEach((param) => {
    if (!(param in query)) {
      throw new ValidationError(`${param} isn't in the url query!`);
    }
  });
  const typedQuery = query as ICheckOutUrlParams;

  const validatedPeople = Number(typedQuery.people);
  if (!Number.isInteger(validatedPeople)) {
    throw new ValidationError(`${validatedPeople} people param isn't an integer`);
  }

  const validatedRoomTypeId = typedQuery.roomTypeId;
  if (!getRoomTypeById(validatedRoomTypeId)) {
    throw new ValidationError(`Room ${validatedRoomTypeId} isn't valid`);
  }
  const validateCheckOut = typedQuery.checkOut;
  const validateCheckIn = typedQuery.checkIn;
  validateDate(validateCheckIn);
  validateDate(validateCheckOut);
  return {
    checkOut: validateCheckOut,
    checkIn: validateCheckIn,
    people: validatedPeople,
    roomTypeId: validatedRoomTypeId,
  };
};

export const validateDate = (dateString: string) => {
  if (!moment(dateString, "YYYY-MM-DD", true).isValid()) {
    throw new ValidationError(`${dateString} isn't a valid date`);
  }
};

export const getDynamicRoomTypeId = (index: number) => `room_${index}`;

export const buildCheckoutUrl = ({ roomTypeId, checkIn, checkOut, people }: ICheckOutUrlParams) => {
  return `/checkout?people=${people}&checkIn=${checkIn}&checkOut=${checkOut}&roomTypeId=${roomTypeId}`;
};
