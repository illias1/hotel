import { NextApiRequest, NextApiResponse } from "next";
import { withSSRContext } from "aws-amplify";
import Stripe from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { Auth } = withSSRContext({ req });
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) {
        return res.status(405).end("You are not authenticated");
      }

      const { attributes } = user;
      let stripeCustomerId = attributes["custom:stripeId"];
      if (stripeCustomerId) {
        return res.status(200).json({ stripeId: stripeCustomerId });
      }

      const phone = attributes["custom:phone"];
      const { email, name } = attributes;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" });
      const stripeCustomer = await stripe.customers.create({
        email,
        name,
        phone,
      });

      await Auth.updateUserAttributes(user, {
        "custom:stripeId": stripeCustomer.id,
      });

      return res.status(200).json({ stripeId: stripeCustomer.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
