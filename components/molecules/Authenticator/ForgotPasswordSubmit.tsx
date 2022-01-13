import React from "react";
import { TFunction } from "next-i18next";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined, CodeOutlined } from "@ant-design/icons";

import { IAuthenticationState, IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";
import { Space } from "../../atoms/Layout";
import EmailIFormItem from "./components/EmailIFormItem";

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
      <EmailIFormItem t={t} />
      <Form.Item
        name="newPassword"
        label={t("pages.authenticator.labels.newPassword")}
        help={t("pages.authenticator.help.password")}
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
        label={t("pages.authenticator.labels.verificationCode")}
        rules={[
          {
            required: true,
            message: "Please input the verification code!",
          },
        ]}
      >
        <Input prefix={<CodeOutlined />} placeholder="1234" />
      </Form.Item>
      <Button htmlType="submit">{t("pages.authenticator.ForgotPasswordSubmit")}</Button>
      <Space margin="20px 0 0 0">
        <Button link onClick={() => setAuthenticationState("signIn")}>
          Back to login
        </Button>
      </Space>
    </StyledForm>
  );
};

export default ForgotPasswordSubmit;
