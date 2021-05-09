import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
var postmark = require("postmark");
var TelegramBot = require("telegrambot");
import Stripe from "stripe";

import { BookingStatus, updateReservation, updateRoomBooking } from "../../src/queries";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../utils/db/utils";
import {
  UpdateReservationMutation,
  UpdateReservationMutationVariables,
  UpdateRoomBookingMutation,
  UpdateRoomBookingMutationVariables,
} from "../../src/generated/graphql";
import { client } from "../../utils/api";

// Send an email:

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      var postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
      var api = new TelegramBot(process.env.TELEGRAM_API_KEY);

      const event: Stripe.Event = req.body;
      console.log("webhook received", req.body);
      if (event && event.type == "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const reservationId = session.client_reference_id;
        const customerEmail = session.customer_details.email;
        assert(reservationId, `Reservation id not received: ${JSON.stringify(event)}`);

        console.log("reservation in stripe webhook", reservationId);
        // internal

        const { data, errors } = await client(process.env.ADMIN_SECRET).mutate<
          UpdateReservationMutation,
          UpdateReservationMutationVariables
        >({
          mutation: updateReservation,
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
        const note = data.update_Reservation_by_pk.note;

        api.sendMessage(
          {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `Резервирование ${reservationId}: email клиента: ${customerEmail}, ${
              note ? `дополнительная просьба: ${note},` : ""
            } ${bookings.reduce(
              (prev, curr) =>
                `${prev}check in: ${curr.checkIn}, check out: ${curr.checkOut}, room: ${curr.roomTypeId} \n`,
              ""
            )} `,
          },
          function (err, message) {
            if (err) {
              console.error("Error sending telegram message, reservation id", reservationId);
            }
            console.log("Telegram message: ", message);
          }
        );

        const roomBookingsUpdate = await client(process.env.ADMIN_SECRET).mutate<
          UpdateRoomBookingMutation,
          UpdateRoomBookingMutationVariables
        >({
          mutation: updateRoomBooking,
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
      }
    } catch (err) {
      console.error("Error in stripe webhook", err);
    }
    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
