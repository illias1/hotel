import { withSSRContext } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

import StripeType from "stripe";
const Stripe = require("stripe");

import { GetReservationQuery, GetReservationQueryVariables } from "../../src/API";
import { getReservation } from "../../src/graphql/queries";

import callGraphQL from "../../utils/api";
import { DATA } from "../../utils/db";
import { ValidationError } from "../../utils/parseCheckoutUrl";
import { getCheckoutLineItems } from "../../utils/payment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { API, Auth } = withSSRContext({ req });

    const reservationID: string = req.body;
    console.log("reservation", reservationID);
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) {
        throw new Error("You are not authenticated");
      }

      const { attributes } = user;
      const stripeCustomerId = attributes["custom:stripeId"];
      if (!stripeCustomerId) {
        throw new Error("Stripe customer id does not exist");
      }

      const { data } = await API.graphql({
        query: getReservation,
        variables: {
          id: reservationID,
        },
      });

      const reservation = data.getReservation;
      console.log("reservation", reservation);
      const roomTypeIds = reservation.RoomBookings.items.map(({ roomTypeId }) => roomTypeId);
      console.log("roomTypeIds", roomTypeIds);
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      const APP_URL = process.env.DOMAIN;
      const lineItems = await getCheckoutLineItems(roomTypeIds);
      console.log("line items", lineItems);

      // // Create Checkout Sessions from body params.
      const params: StripeType.Checkout.SessionCreateParams = {
        success_url: `${APP_URL}payment-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}payment-canceled/`,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems.map((price) => ({ ...price, quantity: 1 })),
        customer: stripeCustomerId,
      };
      const checkoutSession: StripeType.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );
      console.log("sesssion", checkoutSession);
      res.status(200).json(checkoutSession);
    } catch (err) {
      console.error("Error from stripe", err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
