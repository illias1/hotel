import React from "react";
import { PageWrapper } from "../components/atoms/Layout";
import Authenticator from "../components/molecules/Authenticator";

type ILoginProps = {};

const Login: React.FC<ILoginProps> = ({ ...props }) => {
  return (
    <PageWrapper>
      <Authenticator />
    </PageWrapper>
  );
};

export default Login;
