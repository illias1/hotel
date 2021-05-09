import assert from "assert";

import { withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe as StripeType } from "stripe";

// import Stripe from "stripe";
import {
  CreateReservationMutation,
  CreateReservationMutationVariables,
  CreateRoomBookingsMutation,
  CreateRoomBookingsMutationVariables,
} from "../../src/generated/graphql";
import { BookingStatus, createReservation, createRoomBooking } from "../../src/queries";
const Stripe = require("stripe");

import { client } from "../../utils/api";
import { DATA } from "../../utils/db";
import { ValidationError } from "../../utils/parseCheckoutUrl";
import { getCheckoutLineItems } from "../../utils/payment";
import { IAvailableRoomType } from "../../utils/reservation/checkAvailabilities";

export interface ISessionReservation {
  note: string;
  bookings: IAvailableRoomType[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { Auth } = withSSRContext({ req });

      const requestedReservation = JSON.parse(req.body) as ISessionReservation;
      const bookings = requestedReservation.bookings;
      const APP_URL = process.env.DOMAIN;
      const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

      assert(APP_URL && STRIPE_SECRET, "Environment variables undefined");
      assert(
        Array.isArray(bookings) &&
          bookings.every(
            (el) => "availableRooms" in el && "id" in el && "checkIn" in el && "checkOut" in el
          ),
        "body is malformed"
      );
      assert("note" in requestedReservation, "body is malformed");

      const user = await Auth.currentAuthenticatedUser();
      if (!user) {
        return res.status(405).end("You are not authenticated");
      }

      const stripe = Stripe(STRIPE_SECRET);

      const { attributes } = user;
      const { email, name } = attributes;
      const phone = attributes["custom:phone"];
      let stripeCustomerId = attributes["custom:stripeId"];

      if (!stripeCustomerId) {
        console.log("Entered customer creation");
        const stripeCustomer = (await stripe.customers.create({
          email,
          name,
          phone,
        })) as StripeType.Customer;
        await Auth.updateUserAttributes(user, {
          "custom:stripeId": stripeCustomer.id,
        });
        stripeCustomerId = stripeCustomer.id;
      }

      const { data } = await client(process.env.ADMIN_SECRET).mutate<
        CreateReservationMutation,
        CreateReservationMutationVariables
      >({
        mutation: createReservation,
        variables: {
          object: {
            customerID: attributes.sub,
            isPaid: false,
            note: requestedReservation.note,
          },
        },
      });
      const reservationId = data.insert_Reservation_one.id;
      console.log("reservation data", data);

      const bookingsCreatedResponse = await client(process.env.ADMIN_SECRET).mutate<
        CreateRoomBookingsMutation,
        CreateRoomBookingsMutationVariables
      >({
        mutation: createRoomBooking,
        variables: {
          objects: bookings.map((booking) => ({
            checkOut: booking.checkOut,
            checkIn: booking.checkIn,
            reservation: reservationId,
            roomTypeId: booking.id,
            roomID: booking.availableRooms[0].id,
            people: booking.people,
            status: BookingStatus.PENDING,
          })),
        },
      });
      console.log("bookingsCreatedResponse", bookingsCreatedResponse.data);

      const lineItems = await getCheckoutLineItems(bookings);
      console.log("line items", lineItems);

      // // Create Checkout Sessions from bookings params.
      const params: StripeType.Checkout.SessionCreateParams = {
        success_url: `${APP_URL}/payment-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/payment-canceled/`,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        customer: stripeCustomerId,
        client_reference_id: reservationId,
      };
      const checkoutSession: StripeType.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );
      console.log("session", checkoutSession);
      // const checkoutSession = {};
      res.status(200).json(checkoutSession);
    } catch (err) {
      console.error("Error from stripe-session", err);
      res.status(500).end("Something went wrong");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
