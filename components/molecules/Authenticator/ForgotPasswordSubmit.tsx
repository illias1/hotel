import React from "react";
import { TFunction } from "next-i18next";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined, CodeOutlined } from "@ant-design/icons";

import { IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";

type IForgotPasswordSubmitProps = {
  t: TFunction;
  reusableData: IReusableAuthenticatorData;
  handleSubmit: (data: any) => void;
};

export interface IForgotPasswordSubmitFormResult {
  email: string;
  newPassword: string;
  forgotPasswordVerificationCode: string;
}

const ForgotPasswordSubmit: React.FC<IForgotPasswordSubmitProps> = ({
  handleSubmit,
  reusableData,
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
        name="password"
        label="New password"
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
    </StyledForm>
  );
};

export default ForgotPasswordSubmit;
