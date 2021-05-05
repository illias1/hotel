/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReservationInput = {
  id?: string | null,
  customerID: string,
  isPaid: boolean,
  note?: string | null,
};

export type ModelReservationConditionInput = {
  customerID?: ModelIDInput | null,
  isPaid?: ModelBooleanInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelReservationConditionInput | null > | null,
  or?: Array< ModelReservationConditionInput | null > | null,
  not?: ModelReservationConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Reservation = {
  __typename: "Reservation",
  id?: string,
  customerID?: string,
  isPaid?: boolean,
  note?: string | null,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
  RoomBookings?: ModelRoomBookingConnection,
};

export type ModelRoomBookingConnection = {
  __typename: "ModelRoomBookingConnection",
  items?:  Array<RoomBooking | null > | null,
  nextToken?: string | null,
};

export type RoomBooking = {
  __typename: "RoomBooking",
  reservationID?: string,
  roomID?: string,
  roomTypeId?: string,
  id?: string,
  checkIn?: string,
  checkOut?: string,
  people?: number,
  status?: BookingStatus | null,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  CANCELED = "CANCELED",
}


export type DeleteReservationInput = {
  id?: string | null,
};

export type CreateRoomBookingInput = {
  reservationID: string,
  roomID: string,
  roomTypeId: string,
  id?: string | null,
  checkIn: string,
  checkOut: string,
  people: number,
  status?: BookingStatus | null,
};

export type ModelRoomBookingConditionInput = {
  reservationID?: ModelIDInput | null,
  roomID?: ModelStringInput | null,
  roomTypeId?: ModelStringInput | null,
  checkIn?: ModelStringInput | null,
  checkOut?: ModelStringInput | null,
  people?: ModelIntInput | null,
  status?: ModelBookingStatusInput | null,
  and?: Array< ModelRoomBookingConditionInput | null > | null,
  or?: Array< ModelRoomBookingConditionInput | null > | null,
  not?: ModelRoomBookingConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBookingStatusInput = {
  eq?: BookingStatus | null,
  ne?: BookingStatus | null,
};

export type DeleteRoomBookingInput = {
  id?: string | null,
};

export type UpdateReservationInput = {
  id: string,
  customerID?: string | null,
  isPaid?: boolean | null,
  note?: string | null,
};

export type UpdateRoomBookingInput = {
  reservationID?: string | null,
  roomID?: string | null,
  roomTypeId?: string | null,
  id: string,
  checkIn?: string | null,
  checkOut?: string | null,
  people?: number | null,
  status?: BookingStatus | null,
};

export type ModelReservationFilterInput = {
  id?: ModelIDInput | null,
  customerID?: ModelIDInput | null,
  isPaid?: ModelBooleanInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelReservationFilterInput | null > | null,
  or?: Array< ModelReservationFilterInput | null > | null,
  not?: ModelReservationFilterInput | null,
};

export type ModelReservationConnection = {
  __typename: "ModelReservationConnection",
  items?:  Array<Reservation | null > | null,
  nextToken?: string | null,
};

export type ModelRoomBookingFilterInput = {
  reservationID?: ModelIDInput | null,
  roomID?: ModelStringInput | null,
  roomTypeId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  checkIn?: ModelStringInput | null,
  checkOut?: ModelStringInput | null,
  people?: ModelIntInput | null,
  status?: ModelBookingStatusInput | null,
  and?: Array< ModelRoomBookingFilterInput | null > | null,
  or?: Array< ModelRoomBookingFilterInput | null > | null,
  not?: ModelRoomBookingFilterInput | null,
};

export type CreateReservationMutationVariables = {
  input?: CreateReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type CreateReservationMutation = {
  createReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteReservationMutationVariables = {
  input?: DeleteReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type DeleteReservationMutation = {
  deleteReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateRoomBookingMutationVariables = {
  input?: CreateRoomBookingInput,
  condition?: ModelRoomBookingConditionInput | null,
};

export type CreateRoomBookingMutation = {
  createRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteRoomBookingMutationVariables = {
  input?: DeleteRoomBookingInput,
  condition?: ModelRoomBookingConditionInput | null,
};

export type DeleteRoomBookingMutation = {
  deleteRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateReservationMutationVariables = {
  input?: UpdateReservationInput,
  condition?: ModelReservationConditionInput | null,
};

export type UpdateReservationMutation = {
  updateReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateRoomBookingMutationVariables = {
  input?: UpdateRoomBookingInput,
  condition?: ModelRoomBookingConditionInput | null,
};

export type UpdateRoomBookingMutation = {
  updateRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetReservationQueryVariables = {
  id?: string,
};

export type GetReservationQuery = {
  getReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListReservationsQueryVariables = {
  filter?: ModelReservationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReservationsQuery = {
  listReservations?:  {
    __typename: "ModelReservationConnection",
    items?:  Array< {
      __typename: "Reservation",
      id: string,
      customerID: string,
      isPaid: boolean,
      note?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      RoomBookings?:  {
        __typename: "ModelRoomBookingConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetRoomBookingQueryVariables = {
  id?: string,
};

export type GetRoomBookingQuery = {
  getRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListRoomBookingsQueryVariables = {
  filter?: ModelRoomBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoomBookingsQuery = {
  listRoomBookings?:  {
    __typename: "ModelRoomBookingConnection",
    items?:  Array< {
      __typename: "RoomBooking",
      reservationID: string,
      roomID: string,
      roomTypeId: string,
      id: string,
      checkIn: string,
      checkOut: string,
      people: number,
      status?: BookingStatus | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReservationSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateReservationSubscription = {
  onCreateReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateReservationSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateReservationSubscription = {
  onUpdateReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteReservationSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteReservationSubscription = {
  onDeleteReservation?:  {
    __typename: "Reservation",
    id: string,
    customerID: string,
    isPaid: boolean,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    RoomBookings?:  {
      __typename: "ModelRoomBookingConnection",
      items?:  Array< {
        __typename: "RoomBooking",
        reservationID: string,
        roomID: string,
        roomTypeId: string,
        id: string,
        checkIn: string,
        checkOut: string,
        people: number,
        status?: BookingStatus | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateRoomBookingSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateRoomBookingSubscription = {
  onCreateRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateRoomBookingSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateRoomBookingSubscription = {
  onUpdateRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteRoomBookingSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteRoomBookingSubscription = {
  onDeleteRoomBooking?:  {
    __typename: "RoomBooking",
    reservationID: string,
    roomID: string,
    roomTypeId: string,
    id: string,
    checkIn: string,
    checkOut: string,
    people: number,
    status?: BookingStatus | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
