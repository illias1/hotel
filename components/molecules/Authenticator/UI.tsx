import React from "react";

import { useTranslation } from "next-i18next";

import { IAmplifyError, IAuthenticationInputData, IAuthenticationState } from "./index";

type IAuthenticatorUIProps = {
  error: IAmplifyError["code"];
  inputData: IAuthenticationInputData;
  authenticationState: IAuthenticationState;
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
  handleChange: (e: any) => void;
  confirmSignUp: () => Promise<void>;
  handleForgotPassword: () => Promise<void>;
  handleForgotPasswordSubmit: () => Promise<void>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
};

const AuthenticatorUI: React.FC<IAuthenticatorUIProps> = ({
  error,
  inputData,
  authenticationState,
  setAuthenticationState,
  handleChange,
  signIn,
  signUp,
  confirmSignUp,
  children,
}) => {
  const { t } = useTranslation();

  if (authenticationState === "loading") {
    return <div>Loading ...</div>;
  }

  if (authenticationState === "signUp") {
    return (
      <div>
        <button onClick={() => setAuthenticationState("signIn")}>
          {t("pages.authenticator.signInInstead")}
        </button>
        <input
          value={inputData.email}
          name="email"
          placeholder={t("input.email.placeholder")}
          onChange={handleChange}
        />
        <input
          value={inputData.name}
          name="name"
          placeholder={t("input.name.placeholder")}
          onChange={handleChange}
        />
        <input
          value={inputData["custom:phone"]}
          name="custom:phone"
          placeholder={t("input.phone.placeholder")}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder={t("input.password.placeholder")}
          type="password"
          onChange={handleChange}
        />
        <button onClick={signUp}>{t("pages.authenticator.signUp")}</button>
        {error === "UsernameExistsException" && (
          <>
            {t("pages.authenticator.emailNotVerified")}
            <button>{t("pages.authenticator.sendAgain")}</button>
          </>
        )}
      </div>
    );
  }

  if (authenticationState === "confirmSignUp") {
    return (
      <div>
        <input
          value={inputData.email}
          name="email"
          placeholder={t("input.email.placeholder")}
          onChange={handleChange}
        />
        <input value={inputData.verificationCode} name="verificationCode" onChange={handleChange} />
        <button onClick={confirmSignUp}>{t("pages.authenticator.confirmSignUp")}</button>
      </div>
    );
  }
  if (authenticationState === "confirmedSignUp") {
    return <div>{t("pages.authenticator.codeVerified")}</div>;
  }

  if (authenticationState === "signIn") {
    return (
      <div>
        <button onClick={() => setAuthenticationState("signUp")}>
          {t("pages.authenticator.signUpInstead")}
        </button>
        <button onClick={() => setAuthenticationState("forgotPassword")}>
          {t("pages.authenticator.forgotPassword")}
        </button>
        <input
          value={inputData.email}
          name="email"
          placeholder={t("input.email.placeholder")}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder={t("input.password.placeholder")}
          onChange={handleChange}
        />
        <button onClick={signIn}>{t("pages.authenticator.signIn")}</button>
      </div>
    );
  }
  if (authenticationState === "forgotPassword") {
    return (
      <div>
        <button onClick={() => setAuthenticationState("signUp")}>Handle forgot password</button>
      </div>
    );
  }

  if (authenticationState === "signedIn") {
    return <>{children}</>;
  }
};

export default AuthenticatorUI;
