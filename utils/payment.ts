import Stripe from "stripe";
import { IRoomType } from "./db";

import { getRoomTypeById } from "./db/utils";
import { ValidationError } from "./parseCheckoutUrl";

type ICheckoutLineItems = {
  price: string;
}[];

export const getCheckoutLineItems = async (roomTypeIds: string[]) => {
  const checkoutLineItems: ICheckoutLineItems = [];
  roomTypeIds.forEach(async (roomTypeId) => {
    const roomType = getRoomTypeById(roomTypeId);
    if (roomType) {
      const price = getTodayPrice(roomType);
      checkoutLineItems.push({
        price,
      });
    } else {
      throw new ValidationError("Reservation is corrupted");
    }
  });
  return checkoutLineItems;
};

const getTodayPrice = (roomType: IRoomType) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return [5, 6].includes(dayOfWeek) ? roomType.priceWeekend : roomType.priceRegular;
};
