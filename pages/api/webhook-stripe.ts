import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
const { CognitoIdentity } = require("@aws-sdk/client-cognito-identity");
import StripeType from "stripe";
var postmark = require("postmark");

import { BookingStatus, updateReservation, updateRoomBooking } from "../../src/queries";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../utils/db/utils";
import {
  UpdateReservationMutation,
  UpdateReservationMutationVariables,
  UpdateRoomBookingMutation,
  UpdateRoomBookingMutationVariables,
} from "../../src/generated/graphql";
import { client } from "../../utils/api";

var cognitoidentityserviceprovider = new CognitoIdentity();
// Send an email:
var postmarkClient = new postmark.ServerClient("eddb415f-94ce-4632-8431-649f3da8d6f9");

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

      console.log("reservation in stripe webhook", reservationId);
      // internal

      const { data, errors } = await client(process.env.ADMIN_SECRET).query<
        UpdateReservationMutation,
        UpdateReservationMutationVariables
      >({
        query: updateReservation,
        variables: {
          pk_columns: { id: reservationId },
          _set: {
            isPaid: true,
          },
        },
      });
      if (errors) {
        console.error("Errors in stripe webhook", errors);
      }
      const bookings = data.update_Reservation_by_pk.RoomBookings;

      const roomBookingsUpdate = await client(process.env.ADMIN_SECRET).query<
        UpdateRoomBookingMutation,
        UpdateRoomBookingMutationVariables
      >({
        query: updateRoomBooking,
        variables: {
          where: {
            _or: bookings.map((booking) => ({
              id: { _eq: booking.id },
            })),
          },
          set: {
            status: BookingStatus.CONFIRMED,
          },
        },
      });
      if (roomBookingsUpdate.errors) {
        console.error("Errors in stripe webhook", roomBookingsUpdate.errors);
      }

      // client facing
      await postmarkClient.sendEmailWithTemplate({
        TemplateId: 23219224,
        From: "hello@illias.biz",
        To: customerEmail,
        TemplateModel: {
          name: "TO SEE IF NEEDED",
          receipt_id: reservationId,
          date: new Date().toLocaleDateString(),
          receipt_details: bookings.map((booking) => ({
            description_hotel: getHotelByRoomTypeId(booking.roomTypeId).name,
            description_room: getRoomTypeById(booking.roomTypeId).name,
            description_dates: `${booking.checkIn} - ${booking.checkOut}`,
            amount: "TO MODIFY",
          })),
          total: `${session.amount_total / 100}`,
        },
      });
    } catch (err) {
      console.error("Error in stripe webhook", err);
    }
    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
