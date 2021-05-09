import { gql } from "@apollo/client";

export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export const reservations = gql`
  query reservations($where: Reservation_bool_exp) {
    Reservation(where: $where) {
      id
      isPaid
      note
      customerID
    }
  }
`;

export const roomBookings = gql`
  query RoomBooking($where: RoomBooking_bool_exp, $limit: Int) {
    RoomBooking(where: $where, limit: $limit) {
      id
      roomID
      roomTypeId
      checkIn
      checkOut
      people
      reservation
    }
  }
`;

export const createRoomBooking = gql`
  mutation createRoomBookings($objects: [RoomBooking_insert_input!]!) {
    insert_RoomBooking(objects: $objects) {
      returning {
        id
        roomID
        roomTypeId
        checkIn
        checkOut
        people
        reservation
        status
      }
    }
  }
`;
export const updateRoomBooking = gql`
  mutation updateRoomBooking($set: RoomBooking_set_input, $where: RoomBooking_bool_exp!) {
    update_RoomBooking(_set: $set, where: $where) {
      returning {
        id
        roomTypeId
        checkIn
        checkOut
      }
    }
  }
`;
export const createReservation = gql`
  mutation createReservation($object: Reservation_insert_input!) {
    insert_Reservation_one(object: $object) {
      id
      isPaid
      note
      customerID
    }
  }
`;
export const updateReservation = gql`
  mutation updateReservation(
    $_set: Reservation_set_input
    $pk_columns: Reservation_pk_columns_input!
  ) {
    update_Reservation_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
      isPaid
      RoomBookings {
        id
        checkIn
        checkOut
        roomTypeId
      }
    }
  }
`;
