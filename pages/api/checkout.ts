import { withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";
import { getRoomTypeById } from "../../utils/db/utils";
import { getCookieUser } from "../../utils/general";
import { parseCheckoutUrl, ValidationError } from "../../utils/parseCheckoutUrl";
import { checkAvailabilities } from "../../utils/reservation/checkAvailabilities";
import { IBookingResultForCheckout } from "../checkout";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("received", req);
  if (req.method === "GET") {
    const query = req.query;

    const { Auth } = withSSRContext({ req });

    try {
      const validatedUrlParams = parseCheckoutUrl(query);
      const completeBookingInput: IBookingResultForCheckout[] = await Promise.all(
        validatedUrlParams.map(async (booking) => {
          const availabilities = await checkAvailabilities(
            {
              people: String(booking.people),
              checkIn: booking.checkIn,
              checkOut: booking.checkOut,
            },
            process.env.STRIPE_SECRET_KEY,
            [booking.room]
          );
          return {
            booking: { roomType: getRoomTypeById(booking.room), ...booking },
            availableRoomType: availabilities.length > 0 ? availabilities[0] : null,
          };
        })
      );
      let user = null;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch {}

      return res.status(200).json({
        validationError: false,
        bookings: completeBookingInput,
        cookieUser: getCookieUser(user),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error.message);
        return res.status(200).end({
          validationError: true,
          bookings: [],
        });
      }

      console.error("Unknown error at checkout server side props:", error);
      return res.status(500).json({
        unknownError: true,
        validationError: false,
        bookings: [],
      });
    }
  } else {
    return res.status(500).end("Method Not Allowed");
  }
}
