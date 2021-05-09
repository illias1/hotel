import { getAllRoomTypes, getRoomTypeById } from "./utils";

const stripe = require("stripe")("sk_test_qqV0U8JCS72OtxyF1pZWedjO00voYa8lKn");

const WEEK_DAY = "Рабочий день";
const WEEKEND = "Пт, Сб";
const roomTypeIds = getAllRoomTypes().map((roomType) => roomType.id);

test("Room types ids and prices integral with Stripe", async () => {
  const products = await stripe.products.list({
    limit: 30,
  });

  expect(products.data.length).toBe(13);

  await products.data.forEach(async (product) => {
    try {
      const roomTypeId = product.metadata.roomTypeId;
      expect(roomTypeIds).toContain(roomTypeId);

      const roomType = getRoomTypeById(roomTypeId);

      expect(roomType).toHaveProperty("priceRegular");
      expect(roomType).toHaveProperty("priceWeekend");

      const prices = await stripe.prices.list({
        limit: 3,
        product: product.id,
      });

      expect(prices.data).toHaveLength(2);

      await prices.data.forEach((price) => {
        try {
          expect(price).toHaveProperty("id");
          expect(price).toHaveProperty("nickname");
          expect([WEEKEND, WEEK_DAY]).toContain(price.nickname);

          if (price.nickname === WEEK_DAY) {
            expect(roomType.priceRegular).toEqual(price.id);
          } else if (price.nickname == WEEKEND) {
            expect(roomType.priceWeekend).toEqual(price.id);
          }
        } catch (insidePriceError) {
          console.warn("insidePriceError", insidePriceError);
        }
      });
    } catch (insideProductError) {
      console.warn("insideProductError", insideProductError);
    }
  });
});
