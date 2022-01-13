import React from "react";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { IAuthenticationState, IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";
import { TFunction } from "next-i18next";
import { Space } from "../../atoms/Layout";

type IForgotPasswordProps = {
  t: TFunction;
  reusableData: IReusableAuthenticatorData;
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
  handleSubmit: (data: any) => void;
};

export interface IForgotPasswordFormResult {
  email: string;
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({
  handleSubmit,
  reusableData,
  t,
  setAuthenticationState,
}) => {
  return (
    <>
      <StyledForm
        initialValues={{ email: reusableData.email }}
        layout="horizontal"
        name="forgotPassword"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          label={t("pages.authenticator.labels.email")}
          rules={[
            {
              type: "email",
              message: t("errors.invalidEmail"),
            },
            {
              required: true,
              message: t("errors.emailRequired"),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Button htmlType="submit">{t("pages.authenticator.forgotPassword")}</Button>
        <Space margin="20px 0 0 0">
          <Button link onClick={() => setAuthenticationState("signIn")}>
            {t("pages.authenticator.backToLogin")}
          </Button>
        </Space>
      </StyledForm>
    </>
  );
};

export default ForgotPassword;
