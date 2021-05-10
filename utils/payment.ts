import React from "react";
import { LOCAL_STORAGE_RESERVATION } from "../constants";
import { IRoomType } from "./db";

import { getRoomTypeById } from "./db/utils";
import { ValidationError } from "./parseCheckoutUrl";
import { IAvailableRoomType } from "./reservation/checkAvailabilities";

type ICheckoutLineItems = {
  price: string;
  quantity: number;
}[];

export const getCheckoutLineItems = (bookings: IAvailableRoomType[]) => {
  const checkoutLineItems: ICheckoutLineItems = [];
  bookings.forEach(({ checkIn, checkOut, id }) => {
    const roomType = getRoomTypeById(id);
    if (roomType) {
      const dates = getDatesBetweenDates(new Date(checkIn), new Date(checkOut));

      if (dates.length > 3) {
        checkoutLineItems.push({
          price: roomType.priceRegular,
          quantity: dates.length,
        });
      } else {
        const pricesCounted = Counter(dates.map((date) => getDayPrice(date, roomType)));
        Object.entries(pricesCounted).forEach(([price, quantity]) => {
          checkoutLineItems.push({ price, quantity });
        });
      }
    } else {
      throw new ValidationError("Reservation is corrupted");
    }
  });
  return checkoutLineItems;
};

const getDatesBetweenDates = (startDate: Date, endDate: Date) => {
  let dates = [] as Date[];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

const getDayPrice = (date: Date, roomType: IRoomType) => {
  const dayOfWeek = date.getDay();
  return [5, 6].includes(dayOfWeek) ? roomType.priceWeekend : roomType.priceRegular;
};

const Counter = (array: string[]): Record<string, number> => {
  var count = {};
  array.forEach((val) => (count[val] = (count[val] || 0) + 1));
  return count;
};
