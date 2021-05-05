/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
      id
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
      RoomBookings {
        items {
          reservationID
          roomID
          roomTypeId
          id
          checkIn
          checkOut
          people
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
      id
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
      RoomBookings {
        items {
          reservationID
          roomID
          roomTypeId
          id
          checkIn
          checkOut
          people
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createRoomBooking = /* GraphQL */ `
  mutation CreateRoomBooking(
    $input: CreateRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    createRoomBooking(input: $input, condition: $condition) {
      reservationID
      roomID
      roomTypeId
      id
      checkIn
      checkOut
      people
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteRoomBooking = /* GraphQL */ `
  mutation DeleteRoomBooking(
    $input: DeleteRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    deleteRoomBooking(input: $input, condition: $condition) {
      reservationID
      roomID
      roomTypeId
      id
      checkIn
      checkOut
      people
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
      id
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
      RoomBookings {
        items {
          reservationID
          roomID
          roomTypeId
          id
          checkIn
          checkOut
          people
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateRoomBooking = /* GraphQL */ `
  mutation UpdateRoomBooking(
    $input: UpdateRoomBookingInput!
    $condition: ModelRoomBookingConditionInput
  ) {
    updateRoomBooking(input: $input, condition: $condition) {
      reservationID
      roomID
      roomTypeId
      id
      checkIn
      checkOut
      people
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
