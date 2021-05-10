import assert from "assert";

import Amplify, { withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url";

import Stripe from "stripe";
import {
  CreateReservationMutation,
  CreateReservationMutationVariables,
  CreateRoomBookingsMutation,
  CreateRoomBookingsMutationVariables,
} from "../../src/generated/graphql";
import { BookingStatus, createReservation, createRoomBooking } from "../../src/queries";

import { client } from "../../utils/api";
import { DATA } from "../../utils/db";
import { ValidationError } from "../../utils/parseCheckoutUrl";
import { getCheckoutLineItems } from "../../utils/payment";
import { IAvailableRoomType } from "../../utils/reservation/checkAvailabilities";

import awsconfig from "../../src/aws-exports";
Amplify.configure(awsconfig);

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
      const { origin } = absoluteUrl(req);
      const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

      assert(origin && STRIPE_SECRET, "Environment variables undefined");
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

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });

      const { attributes } = user;
      const { email, name } = attributes;
      const phone = attributes["custom:phone"];
      let stripeCustomerId = attributes["custom:stripeId"];

      if (!stripeCustomerId) {
        console.log("Entered customer creation");
        const stripeCustomer = await stripe.customers.create({
          email,
          name,
          phone,
        });
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

      const lineItems = await getCheckoutLineItems(bookings);
      console.log("line items", lineItems);

      // // Create Checkout Sessions from bookings params.
      const params: Stripe.Checkout.SessionCreateParams = {
        success_url: `${origin}/payment-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-canceled/`,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        customer: stripeCustomerId,
        client_reference_id: reservationId,
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);
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
