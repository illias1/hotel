import { LOCAL_STORAGE_RESERVATION } from "../../constants";
import { IBuildCheckoutUrlInput } from "../parseCheckoutUrl";

export const addRoomBookingToLocalStorage = (
  roomBooking: IBuildCheckoutUrlInput,
  callback: (roomBookings: IBuildCheckoutUrlInput[]) => void
) => {
  const reservations =
    (JSON.parse(localStorage.getItem(LOCAL_STORAGE_RESERVATION)) as IBuildCheckoutUrlInput[]) || [];
  reservations.push(roomBooking);
  localStorage.setItem(LOCAL_STORAGE_RESERVATION, JSON.stringify(reservations));
  callback(reservations);
};
