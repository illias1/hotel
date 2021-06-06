import React from "react";
import { TFunction } from "next-i18next";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined, CodeOutlined } from "@ant-design/icons";

import { IAuthenticationState, IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";
import { Space } from "../../atoms/Layout";

type IForgotPasswordSubmitProps = {
  t: TFunction;
  reusableData: IReusableAuthenticatorData;
  handleSubmit: (data: any) => void;
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
};

export interface IForgotPasswordSubmitFormResult {
  email: string;
  newPassword: string;
  forgotPasswordVerificationCode: string;
}

const ForgotPasswordSubmit: React.FC<IForgotPasswordSubmitProps> = ({
  handleSubmit,
  reusableData,
  setAuthenticationState,
  t,
}) => {
  return (
    <StyledForm
      initialValues={{ email: reusableData.email }}
      layout="horizontal"
      name="ForgotPasswordSubmit"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        help="Should have at least 6 characters"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="forgotPasswordVerificationCode"
        label="Verification code"
        rules={[
          {
            required: true,
            message: "Please input the verification code!",
          },
        ]}
      >
        <Input prefix={<CodeOutlined />} placeholder="1234" />
      </Form.Item>
      <Button type="submit">{t("pages.authenticator.ForgotPasswordSubmit")}</Button>
      <Space margin="20px 0 0 0">
        <Button link onClick={() => setAuthenticationState("signIn")}>
          Back to login
        </Button>
      </Space>
    </StyledForm>
  );
};

export default ForgotPasswordSubmit;
