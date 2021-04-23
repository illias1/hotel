/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation($owner: String) {
    onCreateReservation(owner: $owner) {
      id
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
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation($owner: String) {
    onUpdateReservation(owner: $owner) {
      id
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
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation($owner: String) {
    onDeleteReservation(owner: $owner) {
      id
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
      customerID
      isPaid
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateRoomBooking = /* GraphQL */ `
  subscription OnCreateRoomBooking($owner: String) {
    onCreateRoomBooking(owner: $owner) {
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
export const onUpdateRoomBooking = /* GraphQL */ `
  subscription OnUpdateRoomBooking($owner: String) {
    onUpdateRoomBooking(owner: $owner) {
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
export const onDeleteRoomBooking = /* GraphQL */ `
  subscription OnDeleteRoomBooking($owner: String) {
    onDeleteRoomBooking(owner: $owner) {
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
