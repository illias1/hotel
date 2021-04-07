import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Navigation from "../components/organs/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
