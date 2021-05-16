import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signOut } from "../components/molecules/Authenticator/utils";

import { PATHS } from "../utils/paths";
import { PageWrapper } from "../components/atoms/Layout";

export default function Home() {
  const router = useRouter();
  return (
    <PageWrapper>
      <button onClick={() => signOut(() => router.push(PATHS.home))}>Log out </button>
    </PageWrapper>
  );
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
