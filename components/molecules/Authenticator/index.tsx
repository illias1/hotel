import React from "react";
import { Auth } from "aws-amplify";
import AuthenticatorUI from "./UI";

export type IAmplifyError = {
  name: string;
  message: string;
  code: "UsernameExistsException";
};
export type IAuthenticationInputData = {
  email: string;
  name: string;
  "custom:phone": string;
  password: string;
  newPassword: string;
  verificationCode: string;
  forgotPasswordVerificationCode: string;
};
const initialAuthenticationData: IAuthenticationInputData = {
  email: "",
  name: "",
  "custom:phone": "",
  password: "",
  newPassword: "",
  verificationCode: "",
  forgotPasswordVerificationCode: "",
};
export type IAuthenticationState =
  | "loading"
  | "signUp"
  | "confirmSignUp"
  | "confirmedSignUp"
  | "signIn"
  | "signedIn"
  | "forgotPassword"
  | "forgotPasswordSubmit";

const Authenticator: React.FC = ({ children }) => {
  const [inputData, setInputData] = React.useState<IAuthenticationInputData>(
    initialAuthenticationData
  );
  const [authenticationState, setAuthenticationState] = React.useState<IAuthenticationState>(
    "signUp"
  );
  const [error, setError] = React.useState<IAmplifyError["code"] | undefined>(undefined);

  React.useEffect(() => {
    onAppLoad();
  }, []);

  const onAppLoad = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("user:", user);
      if (user) {
        setAuthenticationState("signedIn");
      } else {
        setAuthenticationState("signUp");
      }
    } catch (userRetrievalError) {
      console.warn("userRetrievalError", userRetrievalError);
    }
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: inputData.email,
        password: inputData.password,
        attributes: {
          email: inputData.email,
          name: inputData.name,
          "custom:phone": inputData["custom:phone"],
        },
      });
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setAuthenticationState("confirmSignUp");
    } catch (err) {
      const { code } = err as IAmplifyError;
      if (code === "UsernameExistsException") {
        setError("UsernameExistsException");
      }
      console.error({ err });
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(inputData.email, inputData.verificationCode);
      setAuthenticationState("confirmedSignUp");
      signIn();
    } catch (err) {
      console.error({ err });
    }
  };

  const signIn = async () => {
    try {
      await Auth.signIn(inputData.email, inputData.password);
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setAuthenticationState("signedIn");
    } catch (err) {
      console.error({ err });
    }
  };

  const handleForgotPassword = async () => {
    try {
      await Auth.forgotPassword(inputData.email);
      setAuthenticationState("forgotPasswordSubmit");
    } catch (err) {
      console.error({ err });
    }
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPasswordSubmit(
        inputData.email,
        inputData.forgotPasswordVerificationCode,
        inputData.newPassword
      );
      setAuthenticationState("signIn");
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <AuthenticatorUI
      inputData={inputData}
      error={error}
      handleChange={onChange}
      setAuthenticationState={setAuthenticationState}
      authenticationState={authenticationState}
      confirmSignUp={confirmSignUp}
      signIn={signIn}
      signUp={signUp}
      handleForgotPassword={handleForgotPassword}
      handleForgotPasswordSubmit={handleForgotPasswordSubmit}
    >
      {children}
    </AuthenticatorUI>
  );
};

export default Authenticator;
