import { LOCAL_STORAGE_RESERVATION } from "../../constants";
import { CreateRoomBookingInput } from "../../src/API";

export const addRoomBookingToLocalStorage = (
  roomBooking: CreateRoomBookingInput,
  callback: (roomBookings: CreateRoomBookingInput[]) => void
) => {
  const reservations =
    (JSON.parse(localStorage.getItem(LOCAL_STORAGE_RESERVATION)) as CreateRoomBookingInput[]) || [];
  reservations.push(roomBooking);
  localStorage.setItem(LOCAL_STORAGE_RESERVATION, JSON.stringify(reservations));
  callback(reservations);
};
