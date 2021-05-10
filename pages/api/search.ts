import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "../../utils/parseCheckoutUrl";
import {
  checkAvailabilities,
  ISearchQuery,
  validateSearchQuery,
} from "../../utils/reservation/checkAvailabilities";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("received", req);
  if (req.method === "GET") {
    const query = req.query;
    try {
      validateSearchQuery((query as unknown) as ISearchQuery);
      const availableRoomTypes = await checkAvailabilities((query as unknown) as ISearchQuery);
      return res.status(200).json({ availableRoomTypes });
    } catch (e) {
      console.error("Error in search", e);
      if (e instanceof ValidationError) {
        return res.status(400).json({ error: e.message });
      }
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(500).end("Method Not Allowed");;
  }
}
