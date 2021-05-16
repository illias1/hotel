import { IRoomTypeWithNumberPrice } from "./db";

export const getCookieUser = (user: any) => {
  if (!user) {
    return null;
  }
  return "username" in user
    ? {
        username: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
        phone: user.attributes["custom:phone"],
        stripeId: user.attributes["custom:stripeId"],
      }
    : null;
};

export const displayPrice = (
  roomType?: IRoomTypeWithNumberPrice,
  inputPriceRegular?: number,
  inputPriceWeekend?: number
) => {
  let priceRegular = inputPriceRegular;
  let priceWeekend = inputPriceWeekend;
  if (roomType) {
    priceRegular = roomType.priceRegularNumber;
    priceWeekend = roomType.priceWeekendNumber;
  }
  if (priceRegular == priceWeekend) {
    return `${priceWeekend} €`;
  }
  return `${priceRegular} - ${priceWeekend} €`;
};
