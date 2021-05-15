import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DATA } from "../utils/db";

import Navigation from "../components/organs/Navigation";
import StayInfoSelect from "../components/organs/StayInfoSelect";
import HomeTitle from "../components/molecules/HomeTitle";

import Amplify from "aws-amplify";
import awsExports from "../src/aws-exports";

import { useTranslation } from "next-i18next";
import Map from "../components/organs/Map";
import Head from "../components/atoms/Head";
import Image from "next/image";

Amplify.configure({ ...awsExports, ssr: true });

type IHomeProps = {
  hotels: typeof DATA;
};

const Home: React.FC<IHomeProps> = ({ hotels }) => {
  const { t } = useTranslation();
  console.log("data", DATA);
  return (
    <>
      <Head />
      <HomeTitle />
      <StayInfoSelect />
      We have 3 hotels in center of Calpe ....
      <Map />
      {Object.values(hotels).map((hotel) => (
        <div key={hotel.id}>
          {t(hotel.name)}
          {hotel.images.map((url, index) => (
            <Image
              width={300}
              height={300}
              src={url}
              alt={`Image ${index} for hotel ${t(hotel.name)}`}
            />
          ))}
        </div>
      ))}
      <Navigation />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      hotels: DATA,
    },
  };
};
export default Home;
