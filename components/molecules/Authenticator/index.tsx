import React from "react";
import { Auth } from "aws-amplify";
import AuthenticatorUI from "./UI";
import LoginAuthenticator, { ILoginFormResult } from "./LoginAuthenitcator";
import SignupAuthenticator, { ISignupFormResult } from "./SignupAuthenticator";
import { TFunction } from "next-i18next";
import ConfirmSignUp, { IConfirmSignUpFormResult } from "./ConfirmSignUp";
import ForgotPassword, { IForgotPasswordFormResult } from "./ForgotPassword";
import ForgotPasswordSubmit, { IForgotPasswordSubmitFormResult } from "./ForgotPasswordSubmit";
import styled from "styled-components";
import Form from "antd/lib/form/Form";

type IAuthenticator = {
  loginCallback?: (user: any) => void;
  t: TFunction;
};
export type IAmplifyError = {
  name: string;
  message: string;
  code: "UsernameExistsException";
};

type IFormResult =
  | ILoginFormResult
  | ISignupFormResult
  | IConfirmSignUpFormResult
  | IForgotPasswordFormResult
  | IForgotPasswordSubmitFormResult;

export interface IReusableAuthenticatorData {
  email: string;
  password: string;
}

export type IAuthenticationState =
  | "loading"
  | "signUp"
  | "confirmSignUp"
  | "signIn"
  | "signedIn"
  | "forgotPassword"
  | "forgotPasswordSubmit";

const Authenticator: React.FC<IAuthenticator> = ({ children, loginCallback, t }) => {
  const [authenticationState, setAuthenticationState] =
    React.useState<IAuthenticationState>("forgotPasswordSubmit");
  const [error, setError] = React.useState<IAmplifyError["code"] | undefined>(undefined);
  const [reusableData, setReusableData] = React.useState<IReusableAuthenticatorData>({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    onAppLoad();
  }, []);

  const onAppLoad = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("user:", user);
      if (user) {
        setAuthenticationState("signedIn");
        loginCallback(user);
      } else {
        setAuthenticationState("signUp");
      }
    } catch (userRetrievalError) {
      console.warn("userRetrievalError", userRetrievalError);
    }
  };

  const handleSubmit = async (data: IFormResult) => {
    console.log("data", data);
    if ("email" in data) {
      setReusableData((prev) => ({ ...prev, email: data.email }));
    }
    if ("password" in data) {
      setReusableData((prev) => ({ ...prev, password: data.password }));
    }
    try {
      switch (authenticationState) {
        case "signIn":
          const loginData = data as ILoginFormResult;
          signIn(loginData);
        case "signUp":
          const signupData = data as ISignupFormResult;
          signUp(signupData);
        case "confirmSignUp":
          const confirmSignUpData = data as IConfirmSignUpFormResult;
          confirmSignUp(confirmSignUpData);
        case "forgotPassword":
          const forgotPasswordData = data as IForgotPasswordFormResult;
          handleForgotPassword(forgotPasswordData);
        case "forgotPasswordSubmit":
          const forgotPasswordSubmitData = data as IForgotPasswordSubmitFormResult;
          handleForgotPasswordSubmit(forgotPasswordSubmitData);
        default:
          break;
      }
    } catch (authenticationError) {
      if ("code" in authenticationError) {
        const { code } = authenticationError as IAmplifyError;
        if (code === "UsernameExistsException") {
          setError("UsernameExistsException");
          return;
        }
      }
      console.error({ authenticationError });
    }
  };

  const signIn = async (inputData: ILoginFormResult) => {
    const user = await Auth.signIn(inputData.email, inputData.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    setAuthenticationState("signedIn");
    loginCallback(user);
  };

  const signUp = async (signupData: ISignupFormResult) => {
    await Auth.signUp({
      username: signupData.email,
      password: signupData.password,
      attributes: {
        email: signupData.email,
        name: signupData.name,
        "custom:phone": signupData.phone,
      },
    });
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    setAuthenticationState("confirmSignUp");
  };

  const confirmSignUp = async (inputData: IConfirmSignUpFormResult) => {
    await Auth.confirmSignUp(inputData.email, inputData.verificationCode);
    setAuthenticationState("signIn");
    signIn(reusableData);
  };

  const handleForgotPassword = async ({ email }: IForgotPasswordFormResult) => {
    await Auth.forgotPassword(email);
    setAuthenticationState("forgotPasswordSubmit");
  };

  const handleForgotPasswordSubmit = async (
    forgotPasswordSubmit: IForgotPasswordSubmitFormResult
  ) => {
    await Auth.forgotPasswordSubmit(
      forgotPasswordSubmit.email,
      forgotPasswordSubmit.newPassword,
      forgotPasswordSubmit.forgotPasswordVerificationCode
    );
    setAuthenticationState("signIn");
  };

  // UI

  if (authenticationState === "loading") {
    return <div>Loading ...</div>;
  }

  if (authenticationState === "signedIn") {
    return <>{children}</>;
  }

  switch (authenticationState) {
    case "signIn":
      return (
        <LoginAuthenticator
          handleSubmit={handleSubmit}
          setAuthenticationState={setAuthenticationState}
        />
      );
    case "signUp":
      return (
        <SignupAuthenticator
          error={error}
          handleSubmit={handleSubmit}
          setAuthenticationState={setAuthenticationState}
        />
      );
    case "confirmSignUp":
      return <ConfirmSignUp reusableData={reusableData} t={t} handleSubmit={handleSubmit} />;
    case "forgotPassword":
      return <ForgotPassword t={t} reusableData={reusableData} handleSubmit={handleSubmit} />;
    case "forgotPasswordSubmit":
      return <ForgotPasswordSubmit reusableData={reusableData} t={t} handleSubmit={handleSubmit} />;
    default:
      break;
  }
};

export const StyledForm = styled(Form)`
  padding: 20px;
`;

export default Authenticator;
