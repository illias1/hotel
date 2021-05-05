import React from "react";
import Authenticator from "../components/molecules/Authenticator";

type ILoginProps = {};

const Login: React.FC<ILoginProps> = ({ ...props }) => {
  return (
    <div>
      <Authenticator />
    </div>
  );
};

export default Login;
