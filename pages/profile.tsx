import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signOut } from "../components/molecules/Authenticator/utils";

import Navigation from "../components/organs/Navigation";
import { PATHS } from "../utils/paths";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <button onClick={() => signOut(() => router.push(PATHS.home))}>Log out </button>
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
