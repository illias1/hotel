import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  date: any;
  timestamp: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "Reservation" */
export type Reservation = {
  __typename?: 'Reservation';
  /** An array relationship */
  RoomBookings: Array<RoomBooking>;
  /** An aggregate relationship */
  RoomBookings_aggregate: RoomBooking_Aggregate;
  createdAt: Scalars['timestamp'];
  customerID: Scalars['String'];
  id: Scalars['bigint'];
  isPaid: Scalars['Boolean'];
  note: Scalars['String'];
  updatedAt: Scalars['timestamp'];
};


/** columns and relationships of "Reservation" */
export type ReservationRoomBookingsArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};


/** columns and relationships of "Reservation" */
export type ReservationRoomBookings_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};

/** aggregated selection of "Reservation" */
export type Reservation_Aggregate = {
  __typename?: 'Reservation_aggregate';
  aggregate?: Maybe<Reservation_Aggregate_Fields>;
  nodes: Array<Reservation>;
};

/** aggregate fields of "Reservation" */
export type Reservation_Aggregate_Fields = {
  __typename?: 'Reservation_aggregate_fields';
  avg?: Maybe<Reservation_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Reservation_Max_Fields>;
  min?: Maybe<Reservation_Min_Fields>;
  stddev?: Maybe<Reservation_Stddev_Fields>;
  stddev_pop?: Maybe<Reservation_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Reservation_Stddev_Samp_Fields>;
  sum?: Maybe<Reservation_Sum_Fields>;
  var_pop?: Maybe<Reservation_Var_Pop_Fields>;
  var_samp?: Maybe<Reservation_Var_Samp_Fields>;
  variance?: Maybe<Reservation_Variance_Fields>;
};


/** aggregate fields of "Reservation" */
export type Reservation_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Reservation_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Reservation_Avg_Fields = {
  __typename?: 'Reservation_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Reservation". All fields are combined with a logical 'AND'. */
export type Reservation_Bool_Exp = {
  RoomBookings?: Maybe<RoomBooking_Bool_Exp>;
  _and?: Maybe<Array<Reservation_Bool_Exp>>;
  _not?: Maybe<Reservation_Bool_Exp>;
  _or?: Maybe<Array<Reservation_Bool_Exp>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  customerID?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  isPaid?: Maybe<Boolean_Comparison_Exp>;
  note?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "Reservation" */
export enum Reservation_Constraint {
  /** unique or primary key constraint */
  ReservationPkey = 'Reservation_pkey'
}

/** input type for incrementing numeric columns in table "Reservation" */
export type Reservation_Inc_Input = {
  id?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "Reservation" */
export type Reservation_Insert_Input = {
  RoomBookings?: Maybe<RoomBooking_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars['timestamp']>;
  customerID?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  isPaid?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Reservation_Max_Fields = {
  __typename?: 'Reservation_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  customerID?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Reservation_Min_Fields = {
  __typename?: 'Reservation_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  customerID?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "Reservation" */
export type Reservation_Mutation_Response = {
  __typename?: 'Reservation_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Reservation>;
};

/** input type for inserting object relation for remote table "Reservation" */
export type Reservation_Obj_Rel_Insert_Input = {
  data: Reservation_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Reservation_On_Conflict>;
};

/** on conflict condition type for table "Reservation" */
export type Reservation_On_Conflict = {
  constraint: Reservation_Constraint;
  update_columns: Array<Reservation_Update_Column>;
  where?: Maybe<Reservation_Bool_Exp>;
};

/** Ordering options when selecting data from "Reservation". */
export type Reservation_Order_By = {
  RoomBookings_aggregate?: Maybe<RoomBooking_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  customerID?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isPaid?: Maybe<Order_By>;
  note?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: Reservation */
export type Reservation_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "Reservation" */
export enum Reservation_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CustomerId = 'customerID',
  /** column name */
  Id = 'id',
  /** column name */
  IsPaid = 'isPaid',
  /** column name */
  Note = 'note',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Reservation" */
export type Reservation_Set_Input = {
  createdAt?: Maybe<Scalars['timestamp']>;
  customerID?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  isPaid?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Reservation_Stddev_Fields = {
  __typename?: 'Reservation_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Reservation_Stddev_Pop_Fields = {
  __typename?: 'Reservation_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Reservation_Stddev_Samp_Fields = {
  __typename?: 'Reservation_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Reservation_Sum_Fields = {
  __typename?: 'Reservation_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "Reservation" */
export enum Reservation_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CustomerId = 'customerID',
  /** column name */
  Id = 'id',
  /** column name */
  IsPaid = 'isPaid',
  /** column name */
  Note = 'note',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Reservation_Var_Pop_Fields = {
  __typename?: 'Reservation_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Reservation_Var_Samp_Fields = {
  __typename?: 'Reservation_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Reservation_Variance_Fields = {
  __typename?: 'Reservation_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "RoomBooking" */
export type RoomBooking = {
  __typename?: 'RoomBooking';
  /** An object relationship */
  Reservation: Reservation;
  checkIn: Scalars['date'];
  checkOut: Scalars['date'];
  createdAt: Scalars['timestamp'];
  id: Scalars['Int'];
  people: Scalars['Int'];
  reservation: Scalars['bigint'];
  roomID: Scalars['String'];
  roomTypeId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamp'];
};

/** aggregated selection of "RoomBooking" */
export type RoomBooking_Aggregate = {
  __typename?: 'RoomBooking_aggregate';
  aggregate?: Maybe<RoomBooking_Aggregate_Fields>;
  nodes: Array<RoomBooking>;
};

/** aggregate fields of "RoomBooking" */
export type RoomBooking_Aggregate_Fields = {
  __typename?: 'RoomBooking_aggregate_fields';
  avg?: Maybe<RoomBooking_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<RoomBooking_Max_Fields>;
  min?: Maybe<RoomBooking_Min_Fields>;
  stddev?: Maybe<RoomBooking_Stddev_Fields>;
  stddev_pop?: Maybe<RoomBooking_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<RoomBooking_Stddev_Samp_Fields>;
  sum?: Maybe<RoomBooking_Sum_Fields>;
  var_pop?: Maybe<RoomBooking_Var_Pop_Fields>;
  var_samp?: Maybe<RoomBooking_Var_Samp_Fields>;
  variance?: Maybe<RoomBooking_Variance_Fields>;
};


/** aggregate fields of "RoomBooking" */
export type RoomBooking_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<RoomBooking_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "RoomBooking" */
export type RoomBooking_Aggregate_Order_By = {
  avg?: Maybe<RoomBooking_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<RoomBooking_Max_Order_By>;
  min?: Maybe<RoomBooking_Min_Order_By>;
  stddev?: Maybe<RoomBooking_Stddev_Order_By>;
  stddev_pop?: Maybe<RoomBooking_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<RoomBooking_Stddev_Samp_Order_By>;
  sum?: Maybe<RoomBooking_Sum_Order_By>;
  var_pop?: Maybe<RoomBooking_Var_Pop_Order_By>;
  var_samp?: Maybe<RoomBooking_Var_Samp_Order_By>;
  variance?: Maybe<RoomBooking_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "RoomBooking" */
export type RoomBooking_Arr_Rel_Insert_Input = {
  data: Array<RoomBooking_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<RoomBooking_On_Conflict>;
};

/** aggregate avg on columns */
export type RoomBooking_Avg_Fields = {
  __typename?: 'RoomBooking_avg_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "RoomBooking" */
export type RoomBooking_Avg_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "RoomBooking". All fields are combined with a logical 'AND'. */
export type RoomBooking_Bool_Exp = {
  Reservation?: Maybe<Reservation_Bool_Exp>;
  _and?: Maybe<Array<RoomBooking_Bool_Exp>>;
  _not?: Maybe<RoomBooking_Bool_Exp>;
  _or?: Maybe<Array<RoomBooking_Bool_Exp>>;
  checkIn?: Maybe<Date_Comparison_Exp>;
  checkOut?: Maybe<Date_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  people?: Maybe<Int_Comparison_Exp>;
  reservation?: Maybe<Bigint_Comparison_Exp>;
  roomID?: Maybe<String_Comparison_Exp>;
  roomTypeId?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "RoomBooking" */
export enum RoomBooking_Constraint {
  /** unique or primary key constraint */
  RoomBookingPkey = 'RoomBooking_pkey'
}

/** input type for incrementing numeric columns in table "RoomBooking" */
export type RoomBooking_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
};

/** input type for inserting data into table "RoomBooking" */
export type RoomBooking_Insert_Input = {
  Reservation?: Maybe<Reservation_Obj_Rel_Insert_Input>;
  checkIn?: Maybe<Scalars['date']>;
  checkOut?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
  roomID?: Maybe<Scalars['String']>;
  roomTypeId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type RoomBooking_Max_Fields = {
  __typename?: 'RoomBooking_max_fields';
  checkIn?: Maybe<Scalars['date']>;
  checkOut?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
  roomID?: Maybe<Scalars['String']>;
  roomTypeId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "RoomBooking" */
export type RoomBooking_Max_Order_By = {
  checkIn?: Maybe<Order_By>;
  checkOut?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
  roomID?: Maybe<Order_By>;
  roomTypeId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type RoomBooking_Min_Fields = {
  __typename?: 'RoomBooking_min_fields';
  checkIn?: Maybe<Scalars['date']>;
  checkOut?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
  roomID?: Maybe<Scalars['String']>;
  roomTypeId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "RoomBooking" */
export type RoomBooking_Min_Order_By = {
  checkIn?: Maybe<Order_By>;
  checkOut?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
  roomID?: Maybe<Order_By>;
  roomTypeId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** response of any mutation on the table "RoomBooking" */
export type RoomBooking_Mutation_Response = {
  __typename?: 'RoomBooking_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<RoomBooking>;
};

/** on conflict condition type for table "RoomBooking" */
export type RoomBooking_On_Conflict = {
  constraint: RoomBooking_Constraint;
  update_columns: Array<RoomBooking_Update_Column>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};

/** Ordering options when selecting data from "RoomBooking". */
export type RoomBooking_Order_By = {
  Reservation?: Maybe<Reservation_Order_By>;
  checkIn?: Maybe<Order_By>;
  checkOut?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
  roomID?: Maybe<Order_By>;
  roomTypeId?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: RoomBooking */
export type RoomBooking_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "RoomBooking" */
export enum RoomBooking_Select_Column {
  /** column name */
  CheckIn = 'checkIn',
  /** column name */
  CheckOut = 'checkOut',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  People = 'people',
  /** column name */
  Reservation = 'reservation',
  /** column name */
  RoomId = 'roomID',
  /** column name */
  RoomTypeId = 'roomTypeId',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "RoomBooking" */
export type RoomBooking_Set_Input = {
  checkIn?: Maybe<Scalars['date']>;
  checkOut?: Maybe<Scalars['date']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
  roomID?: Maybe<Scalars['String']>;
  roomTypeId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type RoomBooking_Stddev_Fields = {
  __typename?: 'RoomBooking_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "RoomBooking" */
export type RoomBooking_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type RoomBooking_Stddev_Pop_Fields = {
  __typename?: 'RoomBooking_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "RoomBooking" */
export type RoomBooking_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type RoomBooking_Stddev_Samp_Fields = {
  __typename?: 'RoomBooking_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "RoomBooking" */
export type RoomBooking_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type RoomBooking_Sum_Fields = {
  __typename?: 'RoomBooking_sum_fields';
  id?: Maybe<Scalars['Int']>;
  people?: Maybe<Scalars['Int']>;
  reservation?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "RoomBooking" */
export type RoomBooking_Sum_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** update columns of table "RoomBooking" */
export enum RoomBooking_Update_Column {
  /** column name */
  CheckIn = 'checkIn',
  /** column name */
  CheckOut = 'checkOut',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  People = 'people',
  /** column name */
  Reservation = 'reservation',
  /** column name */
  RoomId = 'roomID',
  /** column name */
  RoomTypeId = 'roomTypeId',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type RoomBooking_Var_Pop_Fields = {
  __typename?: 'RoomBooking_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "RoomBooking" */
export type RoomBooking_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type RoomBooking_Var_Samp_Fields = {
  __typename?: 'RoomBooking_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "RoomBooking" */
export type RoomBooking_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type RoomBooking_Variance_Fields = {
  __typename?: 'RoomBooking_variance_fields';
  id?: Maybe<Scalars['Float']>;
  people?: Maybe<Scalars['Float']>;
  reservation?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "RoomBooking" */
export type RoomBooking_Variance_Order_By = {
  id?: Maybe<Order_By>;
  people?: Maybe<Order_By>;
  reservation?: Maybe<Order_By>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};


/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};


/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Reservation" */
  delete_Reservation?: Maybe<Reservation_Mutation_Response>;
  /** delete single row from the table: "Reservation" */
  delete_Reservation_by_pk?: Maybe<Reservation>;
  /** delete data from the table: "RoomBooking" */
  delete_RoomBooking?: Maybe<RoomBooking_Mutation_Response>;
  /** delete single row from the table: "RoomBooking" */
  delete_RoomBooking_by_pk?: Maybe<RoomBooking>;
  /** insert data into the table: "Reservation" */
  insert_Reservation?: Maybe<Reservation_Mutation_Response>;
  /** insert a single row into the table: "Reservation" */
  insert_Reservation_one?: Maybe<Reservation>;
  /** insert data into the table: "RoomBooking" */
  insert_RoomBooking?: Maybe<RoomBooking_Mutation_Response>;
  /** insert a single row into the table: "RoomBooking" */
  insert_RoomBooking_one?: Maybe<RoomBooking>;
  /** update data of the table: "Reservation" */
  update_Reservation?: Maybe<Reservation_Mutation_Response>;
  /** update single row of the table: "Reservation" */
  update_Reservation_by_pk?: Maybe<Reservation>;
  /** update data of the table: "RoomBooking" */
  update_RoomBooking?: Maybe<RoomBooking_Mutation_Response>;
  /** update single row of the table: "RoomBooking" */
  update_RoomBooking_by_pk?: Maybe<RoomBooking>;
};


/** mutation root */
export type Mutation_RootDelete_ReservationArgs = {
  where: Reservation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reservation_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_RoomBookingArgs = {
  where: RoomBooking_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_RoomBooking_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_ReservationArgs = {
  objects: Array<Reservation_Insert_Input>;
  on_conflict?: Maybe<Reservation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reservation_OneArgs = {
  object: Reservation_Insert_Input;
  on_conflict?: Maybe<Reservation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoomBookingArgs = {
  objects: Array<RoomBooking_Insert_Input>;
  on_conflict?: Maybe<RoomBooking_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoomBooking_OneArgs = {
  object: RoomBooking_Insert_Input;
  on_conflict?: Maybe<RoomBooking_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ReservationArgs = {
  _inc?: Maybe<Reservation_Inc_Input>;
  _set?: Maybe<Reservation_Set_Input>;
  where: Reservation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reservation_By_PkArgs = {
  _inc?: Maybe<Reservation_Inc_Input>;
  _set?: Maybe<Reservation_Set_Input>;
  pk_columns: Reservation_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RoomBookingArgs = {
  _inc?: Maybe<RoomBooking_Inc_Input>;
  _set?: Maybe<RoomBooking_Set_Input>;
  where: RoomBooking_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_RoomBooking_By_PkArgs = {
  _inc?: Maybe<RoomBooking_Inc_Input>;
  _set?: Maybe<RoomBooking_Set_Input>;
  pk_columns: RoomBooking_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Reservation" */
  Reservation: Array<Reservation>;
  /** fetch aggregated fields from the table: "Reservation" */
  Reservation_aggregate: Reservation_Aggregate;
  /** fetch data from the table: "Reservation" using primary key columns */
  Reservation_by_pk?: Maybe<Reservation>;
  /** fetch data from the table: "RoomBooking" */
  RoomBooking: Array<RoomBooking>;
  /** fetch aggregated fields from the table: "RoomBooking" */
  RoomBooking_aggregate: RoomBooking_Aggregate;
  /** fetch data from the table: "RoomBooking" using primary key columns */
  RoomBooking_by_pk?: Maybe<RoomBooking>;
};


export type Query_RootReservationArgs = {
  distinct_on?: Maybe<Array<Reservation_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Reservation_Order_By>>;
  where?: Maybe<Reservation_Bool_Exp>;
};


export type Query_RootReservation_AggregateArgs = {
  distinct_on?: Maybe<Array<Reservation_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Reservation_Order_By>>;
  where?: Maybe<Reservation_Bool_Exp>;
};


export type Query_RootReservation_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootRoomBookingArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};


export type Query_RootRoomBooking_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};


export type Query_RootRoomBooking_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Reservation" */
  Reservation: Array<Reservation>;
  /** fetch aggregated fields from the table: "Reservation" */
  Reservation_aggregate: Reservation_Aggregate;
  /** fetch data from the table: "Reservation" using primary key columns */
  Reservation_by_pk?: Maybe<Reservation>;
  /** fetch data from the table: "RoomBooking" */
  RoomBooking: Array<RoomBooking>;
  /** fetch aggregated fields from the table: "RoomBooking" */
  RoomBooking_aggregate: RoomBooking_Aggregate;
  /** fetch data from the table: "RoomBooking" using primary key columns */
  RoomBooking_by_pk?: Maybe<RoomBooking>;
};


export type Subscription_RootReservationArgs = {
  distinct_on?: Maybe<Array<Reservation_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Reservation_Order_By>>;
  where?: Maybe<Reservation_Bool_Exp>;
};


export type Subscription_RootReservation_AggregateArgs = {
  distinct_on?: Maybe<Array<Reservation_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Reservation_Order_By>>;
  where?: Maybe<Reservation_Bool_Exp>;
};


export type Subscription_RootReservation_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootRoomBookingArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};


export type Subscription_RootRoomBooking_AggregateArgs = {
  distinct_on?: Maybe<Array<RoomBooking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoomBooking_Order_By>>;
  where?: Maybe<RoomBooking_Bool_Exp>;
};


export type Subscription_RootRoomBooking_By_PkArgs = {
  id: Scalars['Int'];
};


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};

export type ReservationsQueryVariables = Exact<{
  where?: Maybe<Reservation_Bool_Exp>;
}>;


export type ReservationsQuery = (
  { __typename?: 'query_root' }
  & { Reservation: Array<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'isPaid' | 'note' | 'customerID'>
  )> }
);

export type RoomBookingQueryVariables = Exact<{
  where?: Maybe<RoomBooking_Bool_Exp>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type RoomBookingQuery = (
  { __typename?: 'query_root' }
  & { RoomBooking: Array<(
    { __typename?: 'RoomBooking' }
    & Pick<RoomBooking, 'id' | 'roomID' | 'roomTypeId' | 'checkIn' | 'checkOut' | 'people' | 'reservation'>
  )> }
);

export type CreateRoomBookingsMutationVariables = Exact<{
  objects: Array<RoomBooking_Insert_Input> | RoomBooking_Insert_Input;
}>;


export type CreateRoomBookingsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_RoomBooking?: Maybe<(
    { __typename?: 'RoomBooking_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RoomBooking' }
      & Pick<RoomBooking, 'id' | 'roomID' | 'roomTypeId' | 'checkIn' | 'checkOut' | 'people' | 'reservation' | 'status'>
    )> }
  )> }
);

export type UpdateRoomBookingMutationVariables = Exact<{
  set?: Maybe<RoomBooking_Set_Input>;
  where: RoomBooking_Bool_Exp;
}>;


export type UpdateRoomBookingMutation = (
  { __typename?: 'mutation_root' }
  & { update_RoomBooking?: Maybe<(
    { __typename?: 'RoomBooking_mutation_response' }
    & { returning: Array<(
      { __typename?: 'RoomBooking' }
      & Pick<RoomBooking, 'id' | 'roomTypeId' | 'checkIn' | 'checkOut'>
    )> }
  )> }
);

export type CreateReservationMutationVariables = Exact<{
  object: Reservation_Insert_Input;
}>;


export type CreateReservationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_Reservation_one?: Maybe<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'isPaid' | 'note' | 'customerID'>
  )> }
);

export type UpdateReservationMutationVariables = Exact<{
  _set?: Maybe<Reservation_Set_Input>;
  pk_columns: Reservation_Pk_Columns_Input;
}>;


export type UpdateReservationMutation = (
  { __typename?: 'mutation_root' }
  & { update_Reservation_by_pk?: Maybe<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'isPaid'>
    & { RoomBookings: Array<(
      { __typename?: 'RoomBooking' }
      & Pick<RoomBooking, 'id' | 'checkIn' | 'checkOut' | 'roomTypeId'>
    )> }
  )> }
);


export const ReservationsDocument = gql`
    query reservations($where: Reservation_bool_exp) {
  Reservation(where: $where) {
    id
    isPaid
    note
    customerID
  }
}
    `;

/**
 * __useReservationsQuery__
 *
 * To run a query within a React component, call `useReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReservationsQuery(baseOptions?: Apollo.QueryHookOptions<ReservationsQuery, ReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationsQuery, ReservationsQueryVariables>(ReservationsDocument, options);
      }
export function useReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationsQuery, ReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationsQuery, ReservationsQueryVariables>(ReservationsDocument, options);
        }
export type ReservationsQueryHookResult = ReturnType<typeof useReservationsQuery>;
export type ReservationsLazyQueryHookResult = ReturnType<typeof useReservationsLazyQuery>;
export type ReservationsQueryResult = Apollo.QueryResult<ReservationsQuery, ReservationsQueryVariables>;
export const RoomBookingDocument = gql`
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

/**
 * __useRoomBookingQuery__
 *
 * To run a query within a React component, call `useRoomBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomBookingQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRoomBookingQuery(baseOptions?: Apollo.QueryHookOptions<RoomBookingQuery, RoomBookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomBookingQuery, RoomBookingQueryVariables>(RoomBookingDocument, options);
      }
export function useRoomBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomBookingQuery, RoomBookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomBookingQuery, RoomBookingQueryVariables>(RoomBookingDocument, options);
        }
export type RoomBookingQueryHookResult = ReturnType<typeof useRoomBookingQuery>;
export type RoomBookingLazyQueryHookResult = ReturnType<typeof useRoomBookingLazyQuery>;
export type RoomBookingQueryResult = Apollo.QueryResult<RoomBookingQuery, RoomBookingQueryVariables>;
export const CreateRoomBookingsDocument = gql`
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
export type CreateRoomBookingsMutationFn = Apollo.MutationFunction<CreateRoomBookingsMutation, CreateRoomBookingsMutationVariables>;

/**
 * __useCreateRoomBookingsMutation__
 *
 * To run a mutation, you first call `useCreateRoomBookingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomBookingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomBookingsMutation, { data, loading, error }] = useCreateRoomBookingsMutation({
 *   variables: {
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useCreateRoomBookingsMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomBookingsMutation, CreateRoomBookingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomBookingsMutation, CreateRoomBookingsMutationVariables>(CreateRoomBookingsDocument, options);
      }
export type CreateRoomBookingsMutationHookResult = ReturnType<typeof useCreateRoomBookingsMutation>;
export type CreateRoomBookingsMutationResult = Apollo.MutationResult<CreateRoomBookingsMutation>;
export type CreateRoomBookingsMutationOptions = Apollo.BaseMutationOptions<CreateRoomBookingsMutation, CreateRoomBookingsMutationVariables>;
export const UpdateRoomBookingDocument = gql`
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
export type UpdateRoomBookingMutationFn = Apollo.MutationFunction<UpdateRoomBookingMutation, UpdateRoomBookingMutationVariables>;

/**
 * __useUpdateRoomBookingMutation__
 *
 * To run a mutation, you first call `useUpdateRoomBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoomBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoomBookingMutation, { data, loading, error }] = useUpdateRoomBookingMutation({
 *   variables: {
 *      set: // value for 'set'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateRoomBookingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoomBookingMutation, UpdateRoomBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoomBookingMutation, UpdateRoomBookingMutationVariables>(UpdateRoomBookingDocument, options);
      }
export type UpdateRoomBookingMutationHookResult = ReturnType<typeof useUpdateRoomBookingMutation>;
export type UpdateRoomBookingMutationResult = Apollo.MutationResult<UpdateRoomBookingMutation>;
export type UpdateRoomBookingMutationOptions = Apollo.BaseMutationOptions<UpdateRoomBookingMutation, UpdateRoomBookingMutationVariables>;
export const CreateReservationDocument = gql`
    mutation createReservation($object: Reservation_insert_input!) {
  insert_Reservation_one(object: $object) {
    id
    isPaid
    note
    customerID
  }
}
    `;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const UpdateReservationDocument = gql`
    mutation updateReservation($_set: Reservation_set_input, $pk_columns: Reservation_pk_columns_input!) {
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
export type UpdateReservationMutationFn = Apollo.MutationFunction<UpdateReservationMutation, UpdateReservationMutationVariables>;

/**
 * __useUpdateReservationMutation__
 *
 * To run a mutation, you first call `useUpdateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationMutation, { data, loading, error }] = useUpdateReservationMutation({
 *   variables: {
 *      _set: // value for '_set'
 *      pk_columns: // value for 'pk_columns'
 *   },
 * });
 */
export function useUpdateReservationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReservationMutation, UpdateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReservationMutation, UpdateReservationMutationVariables>(UpdateReservationDocument, options);
      }
export type UpdateReservationMutationHookResult = ReturnType<typeof useUpdateReservationMutation>;
export type UpdateReservationMutationResult = Apollo.MutationResult<UpdateReservationMutation>;
export type UpdateReservationMutationOptions = Apollo.BaseMutationOptions<UpdateReservationMutation, UpdateReservationMutationVariables>;