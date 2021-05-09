import React from "react";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import StripeType from "stripe";
const Stripe = require("stripe");

import { DATA, IHotel, IHotelName, IHotelWithNumberPrice } from "../../../utils/db";
import { PATHS } from "../../../utils/paths";
import { useTranslation } from "next-i18next";
import Navigation from "../../../components/organs/Navigation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type IHotelProps = {
  hotel?: IHotelWithNumberPrice;
  error?: string;
};

const HotelPage: React.FC<IHotelProps> = ({ hotel, error }) => {
  const { t } = useTranslation();
  if (error) {
    return <div>Error happened</div>;
  }

  return (
    <div>
      {t(hotel.name)} page
      <p>{t(hotel.description)}</p>
      {hotel.roomTypes.map((roomType) => (
        <div key={roomType.id}>
          <Link href={PATHS.room(hotel.id, roomType.id)}>
            <a>
              {t(roomType.name)} ({roomType.id})
            </a>
          </Link>
          <div>
            {roomType.priceRegularNumber} - {roomType.priceWeekendNumber} Euro
          </div>
          <img src="https://via.placeholder.com/150" alt=""/>
        </div>
      ))}
      <Navigation />
    </div>
  );
};

export default HotelPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(DATA).map((key) => ({
    params: { id: key },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IHotelProps> = async ({ params, locale }) => {
  try {
    const id = params.id as IHotelName;
    const hotel = DATA[id];
    // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    // const stripeResponse: StripeType.ApiList<StripeType.Price> = await stripe.prices.list({
    //   limit: 100,
    // });
    // const prices = stripeResponse.data;
    const hotelWitNumberPrices: IHotelWithNumberPrice = {
      ...hotel,
      roomTypes: hotel.roomTypes.map((roomType) => ({
        ...roomType,
        // priceRegularNumber: prices.find((price) => price.id === roomType.priceRegular).unit_amount / 100,
        // priceWeekendNumber: prices.find((price) => price.id === roomType.priceWeekend).unit_amount / 100,
        priceRegularNumber: 50,
        priceWeekendNumber: 60,
      })),
    };
    console.log("augmented hotel", hotelWitNumberPrices);
    return {
      props: {
        hotel: hotelWitNumberPrices,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
