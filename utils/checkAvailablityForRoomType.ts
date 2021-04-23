import { CreateRoomBookingInput } from "../src/API";
import callGraphQL from "./api";
import { ICheckoutBooking } from "./parseCheckoutUrl";

export const checkAvailabilityForRoomType = (booking: ICheckoutBooking): CreateRoomBookingInput => {
  return {
    ...booking,
    reservationID: "",
    roomID: "TO DETERMINE AVAILABILITY",
    roomTypeId: booking.room,
  };
};
