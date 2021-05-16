import React from "react";

import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DATA } from "../utils/db";

import Navigation from "../components/organs/Navigation";
import StayInfoSelect from "../components/molecules/StayInfoSelect";
import HomeHeader from "../components/organs/HomeHeader";

import Amplify from "aws-amplify";
import awsExports from "../src/aws-exports";

import { useTranslation } from "next-i18next";
import Map from "../components/organs/Map";
import Head from "../components/atoms/Head";
import HomeSection from "../HomeSection";
import { Section } from "../components/atoms/Section";
import { PageWrapper } from "../components/atoms/Layout";

Amplify.configure({ ...awsExports, ssr: true });

type IHomeProps = {
  hotels: typeof DATA;
};

const Home: React.FC<IHomeProps> = ({ hotels }) => {
  const { t } = useTranslation();
  console.log("data", DATA);
  return (
    <PageWrapper>
      <Head />
      <HomeHeader />
      <Section>
        <h2>We have 3 hotels in center of Calpe ....</h2>
      </Section>
      <Map />
      {Object.values(hotels).map((hotel) => (
        <HomeSection key={hotel.id} t={t} hotel={hotel} />
      ))}
      <Navigation />
    </PageWrapper>
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
