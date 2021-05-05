import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import Amplify, { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
const { CognitoIdentity } = require("@aws-sdk/client-cognito-identity");
import StripeType from "stripe";
var postmark = require("postmark");

import callGraphQL from "../../utils/api";
import {
  BookingStatus,
  GetReservationQuery,
  GetReservationQueryVariables,
  UpdateReservationMutation,
  UpdateReservationMutationVariables,
  UpdateRoomBookingMutation,
  UpdateRoomBookingMutationVariables,
} from "../../src/API";
import { getReservation } from "../../src/graphql/queries";
import { updateReservation, updateRoomBooking } from "../../src/graphql/mutations";

import awsExports from "../../src/aws-exports";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../utils/db/utils";

Amplify.configure({ ...awsExports, ssr: true });

var cognitoidentityserviceprovider = new CognitoIdentity();
// Send an email:
var client = new postmark.ServerClient("eddb415f-94ce-4632-8431-649f3da8d6f9");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // const { API } = withSSRContext({ req });
    try {
      const event: StripeType.Event = req.body;
      console.log("webhook received", req.body);
      assert(
        "type" in event && event.type == "checkout.session.completed",
        `Stripe unexpected event type : ${JSON.stringify(event)}`
      );

      const session = event.data.object as StripeType.Checkout.Session;
      const reservationId = session.client_reference_id;
      const customerEmail = session.customer_details.email;
      assert(reservationId, `Reservation id not received: ${JSON.stringify(event)}`);

      // internal
      const reservation = await callGraphQL<GetReservationQuery, GetReservationQueryVariables>(
        getReservation,
        { id: reservationId },
        GRAPHQL_AUTH_MODE.API_KEY
      );
      const bookings = reservation.data.getReservation.RoomBookings.items;

      // const updatedReservation = await callGraphQL<
      //   UpdateReservationMutation,
      //   UpdateReservationMutationVariables
      // >(
      //   updateReservation,
      //   { input: { id: reservationId, isPaid: true } },
      //   GRAPHQL_AUTH_MODE.API_KEY
      // );

      // reservation.data.getReservation.RoomBookings.items.forEach(async (booking) => {
      //   const updatedBooking = await callGraphQL<
      //     UpdateRoomBookingMutation,
      //     UpdateRoomBookingMutationVariables
      //   >(
      //     updateRoomBooking,
      //     { input: { id: booking.id, status: BookingStatus.CONFIRMED } },
      //     GRAPHQL_AUTH_MODE.API_KEY
      //   );
      // });

      // client facing
      // await client.sendEmailWithTemplate({
      //   TemplateId: 23219224,
      //   From: "hello@illias.biz",
      //   To: customerEmail,
      //   TemplateModel: {
      //     name: "TO SEE IF NEEDED",
      //     receipt_id: reservationId,
      //     date: new Date().toLocaleDateString(),
      //     receipt_details: bookings.map((booking) => ({
      //       description_hotel: getHotelByRoomTypeId(booking.roomTypeId).name,
      //       description_room: getRoomTypeById(booking.roomTypeId).name,
      //       description_dates: `${booking.checkIn} - ${booking.checkOut}`,
      //       amount: "TO MODIFY",
      //     })),
      //     total: `${session.amount_total / 100}`,
      //   },
      // });
    } catch (err) {
      console.error("Error in stripe webhook", err);
    }
    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
