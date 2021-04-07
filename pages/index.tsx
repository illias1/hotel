import Link from "next/link";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Navigation from "../components/Navigation";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Button>Button</Button>
      <Button secondary>Button</Button>

      <Input />

      <h1>{t("test")}</h1>
      <Link href="/" locale="fr">
        <a>To /fr/another</a>
      </Link>
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
