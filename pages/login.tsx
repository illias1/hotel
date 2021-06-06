import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PageWrapper } from "../components/atoms/Layout";
import Authenticator from "../components/molecules/Authenticator";

type ILoginProps = {};

const Login: React.FC<ILoginProps> = ({ ...props }) => {
  const { t } = useTranslation("common");
  return (
    <PageWrapper>
      <Authenticator t={t} />
    </PageWrapper>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Login;
