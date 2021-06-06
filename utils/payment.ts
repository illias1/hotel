var cache = require("memory-cache");
import Stripe from "stripe";

import { PRICES_CACHE_TIMEOUT } from "../constants";
import { DATA, IRoomType } from "./db";

import { getAllRoomTypes, getRoomTypeById, getRoomTypeByPriceId } from "./db/utils";
import { ValidationError } from "./parseCheckoutUrl";
import { IAvailableRoomType } from "./reservation/checkAvailabilities";

export type ICheckoutLineItems = {
  price: string;
  quantity: number;
}[];

export const getCheckoutLineItems = ({
  id,
  checkIn,
  checkOut,
}: Pick<IAvailableRoomType, "checkIn" | "checkOut" | "id">): ICheckoutLineItems => {
  const checkoutLineItems: ICheckoutLineItems = [];
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

export const getPrices = async (stripeKey: string) => {
  const prices: Record<string, number> = {};
  let allPricesCached = true;
  getAllRoomTypes().forEach((roomType) => {
    const priceRegular = cache.get(roomType.priceRegular);
    const priceWeekend = cache.get(roomType.priceWeekend);
    console.log("priceWeekend retrieved from cache", priceWeekend);
    if (!(priceWeekend || priceRegular)) {
      allPricesCached = false;
    }
    prices[roomType.priceRegular] = priceRegular;
    prices[roomType.priceWeekend] = priceWeekend;
  });
  if (allPricesCached) {
    console.log("Retrieved all prices from cache");
    return prices;
  }
  console.log("Called stripe to get prices");
  const stripe = new Stripe(stripeKey, { apiVersion: "2020-08-27" });
  const stripeResponse: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
    limit: 100,
  });
  stripeResponse.data.forEach((stripePrice) => {
    prices[stripePrice.id] = stripePrice.unit_amount / 100;
    cache.put(stripePrice.id, stripePrice.unit_amount / 100, PRICES_CACHE_TIMEOUT);
    const roomType = getRoomTypeByPriceId(stripePrice.id);
    const priceType =
      roomType.priceRegular === stripePrice.id ? "priceRegularNumber" : "priceWeekendNumber";
    roomType[priceType] = stripePrice.unit_amount / 100;
  });

  return prices;
};
