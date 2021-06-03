import { withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";
import { getRoomTypeById } from "../../utils/db/utils";
import { getCookieUser } from "../../utils/general";
import { parseCheckoutUrl, ValidationError } from "../../utils/parseCheckoutUrl";
import {
  checkAvailabilities,
  IAvailableRoomType,
} from "../../utils/reservation/checkAvailabilities";
import { ICheckoutProps } from "../checkout";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ICheckoutProps>) {
  if (req.method === "GET") {
    const query = req.query;
    try {
      const validatedUrlParams = parseCheckoutUrl(query);
      const availabilities = await checkAvailabilities(
        {
          people: String(validatedUrlParams.people),
          checkIn: validatedUrlParams.checkIn,
          checkOut: validatedUrlParams.checkOut,
        },
        process.env.STRIPE_SECRET_KEY,
        [validatedUrlParams.roomTypeId]
      );
      // const completeBookingInput: IBookingResultForCheckout[] = await Promise.all(
      //   validatedUrlParams.map(async (booking) => {
      //     return {
      //       booking: { roomType: getRoomTypeById(booking.room), ...booking },
      //       availableRoomType: availabilities.length > 0 ? availabilities[0] : null,
      //     };
      //   })
      // );

      return res.status(200).json({
        validationError: false,
        booking: availabilities.length ? availabilities[0] : null,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error.message);
        return res.status(200).end({
          validationError: true,
          booking: [],
        });
      }

      console.error("Unknown error at checkout server side props:", error);
      return res.status(500).json({
        unknownError: true,
        validationError: false,
        booking: null,
      });
    }
  } else {
    return res.status(500).end("Method Not Allowed");
  }
}
