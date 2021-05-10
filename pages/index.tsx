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

import Authenticator from "../components/molecules/Authenticator";
import { Mayormapiframe } from "../assets/maps/mayor";
import { useTranslation } from "next-i18next";
import { client } from "../utils/api";
import Map from "../components/organs/Map";

Amplify.configure({ ...awsExports, ssr: true });

type IHomeProps = {
  hotels: typeof DATA;
};

const Home: React.FC<IHomeProps> = ({ hotels }) => {
  const { t } = useTranslation();
  console.log("data", DATA);
  return (
    <>
      <HomeTitle />
      <StayInfoSelect />
      {Object.values(hotels).map((hotel) => (
        <div key={hotel.id}>
          <Link href={`/hotels/${hotel.id}`}>
            <a>{t(hotel.name)}</a>
          </Link>
        </div>
      ))}
      <Map />
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
