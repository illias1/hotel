/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
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
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerID
        isPaid
        note
        createdAt
        updatedAt
        owner
        RoomBookings {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getRoomBooking = /* GraphQL */ `
  query GetRoomBooking($id: ID!) {
    getRoomBooking(id: $id) {
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
export const listRoomBookings = /* GraphQL */ `
  query ListRoomBookings(
    $filter: ModelRoomBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
