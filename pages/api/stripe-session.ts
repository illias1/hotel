import assert from "assert";

import { graphqlOperation, withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

import StripeType from "stripe";
const Stripe = require("stripe");

import {
  BookingStatus,
  CreateReservationMutation,
  CreateReservationMutationVariables,
  CreateRoomBookingInput,
  CreateRoomBookingMutation,
  CreateRoomBookingMutationVariables,
} from "../../src/API";
import { createReservation, createRoomBooking } from "../../src/graphql/mutations";

import callGraphQL from "../../utils/api";
import { DATA } from "../../utils/db";
import { ValidationError } from "../../utils/parseCheckoutUrl";
import { getCheckoutLineItems } from "../../utils/payment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { API, Auth } = withSSRContext({ req });

      const bookings = JSON.parse(req.body) as CreateRoomBookingInput[];
      const APP_URL = process.env.DOMAIN;
      const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

      assert(APP_URL && STRIPE_SECRET, "Environment variables undefined");
      assert(
        Array.isArray(bookings) &&
          bookings.every(
            (el) => "roomID" in el && "roomTypeId" in el && "checkIn" in el && "checkOut" in el
          ),
        "body is malformed"
      );

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
        stripeCustomerId = stripeCustomer.id
      }

      const { data } = await API.graphql(
        graphqlOperation(createReservation, {
          input: {
            customerID: attributes.sub,
            isPaid: false,
            note: "",
          },
        })
      );
      console.log('data (reservation)', data)
      const reservation = data.createReservation as CreateReservationMutation['createReservation'];
      console.log("reservation", reservation);
      bookings.forEach(async (booking) => {
        const { data } = await API.graphql(
          graphqlOperation(createRoomBooking, {
            input: {
              checkOut: booking.checkOut,
              checkIn: booking.checkIn,
              reservationID: reservation.id,
              roomTypeId: booking.roomTypeId,
              roomID: booking.roomID,
              people: booking?.people,
              status: BookingStatus.PENDING,
            },
          })
        );
        console.log("created booking", data.createRoomBooking.id);
      });

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
        client_reference_id: reservation.id,
      };
      const checkoutSession: StripeType.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );
      console.log("sesssion", checkoutSession);
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
