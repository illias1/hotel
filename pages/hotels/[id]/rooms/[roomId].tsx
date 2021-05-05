import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { API } from "aws-amplify";
import { DatePicker } from "antd";

import StripeType from "stripe";
const Stripe = require("stripe");

import { DATA, IHotelName, IRoomType } from "../../../../utils/db";
import { CreateRoomBookingInput } from "../../../../src/API";
import { LOCAL_STORAGE_RESERVATION } from "../../../../constants";
import { StyledRangePicker } from "../../../../components/atoms/RangePicker";
import { buildCheckoutUrl } from "../../../../utils/parseCheckoutUrl";
import { getRoomTypeById } from "../../../../utils/db/utils";
import { addRoomBookingToLocalStorage } from "../../../../utils/reservation/addBooking";
import Navigation from "../../../../components/organs/Navigation";

type IRoomProps = {
  roomType?: IRoomType;
  price?: number;
  availabilities?: any;
  error?: string;
};
type IRoomPath = {
  roomId: string;
  id: string;
  hotelId: IHotelName;
};

type ICheckDates = {
  checkIn: string;
  checkOut: string;
};
const initialCheckDates: ICheckDates = {
  checkIn: "",
  checkOut: "",
};

const HotelPage: React.FC<IRoomProps> = ({ availabilities, roomType, error, price }) => {
  const [checkDates, setCheckDates] = React.useState<ICheckDates>(initialCheckDates);
  const [bookingForm, setBookingForm] = React.useState<any>({});
  const router = useRouter();

  const bookRoom = async () => {
    const reservation = {
      roomTypeId: roomType.id,
      roomID: availabilities,
      checkIn: checkDates.checkIn,
      checkOut: checkDates.checkOut,
      people: bookingForm.people || 2,
      reservationID: "",
      hotelId: roomType.hotelId,
    };
    addRoomBookingToLocalStorage(reservation, (reservations) => {
      router.push(buildCheckoutUrl(reservations));
    });
  };
  console.log("router", router);
  if (error) {
    return <div>Error happened {error}</div>;
  }

  return (
    <>
      <p>
        <span>hotel </span>
        <Link href={router.pathname}>
          <a>{router.query.id}</a>
        </Link>
      </p>
      <div>Room type page: {roomType.name}</div>
      <ul>
        {roomType.attributes.map((attr) => (
          <li key={attr}>{attr}</li>
        ))}
      </ul>
      <button onClick={bookRoom}>Book this room</button>
      <StyledRangePicker
        // placeholder={t("input.date.placeholder")}
        suffixIcon=""
        onChange={(_, [checkIn, checkOut]) => setCheckDates({ checkIn, checkOut })}
      />
      <div>price</div>
      <div>{price} euro?</div>
      <Navigation />
    </>
  );
};

export default HotelPage;

export const getStaticPaths: GetStaticPaths<IRoomPath> = async () => {
  const paths = [];
  const hotels = Object.values(DATA);
  hotels.forEach((hotel) => {
    hotel.roomTypes.forEach((roomType) => {
      paths.push({
        params: { roomId: roomType.id, id: hotel.id },
      });
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IRoomProps, IRoomPath> = async ({ params }) => {
  try {
    const roomType = getRoomTypeById(params.roomId);
    console.log("params", params);
    // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    // const stripePrice = (await stripe.prices.retrieve(roomType.priceRegular)) as StripeType.Price;
    return {
      props: { roomType, price: 23 },
    };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
