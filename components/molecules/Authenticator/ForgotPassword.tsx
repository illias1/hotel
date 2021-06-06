import React from "react";
import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";
import { TFunction } from "next-i18next";

type IForgotPasswordProps = {
  t: TFunction;
  reusableData: IReusableAuthenticatorData;
  handleSubmit: (data: any) => void;
};

export interface IForgotPasswordFormResult {
  email: string;
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ handleSubmit, reusableData, t }) => {
  return (
    <StyledForm
      initialValues={{ email: reusableData.email }}
      layout="horizontal"
      name="forgotPassword"
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
      <Button type="submit">{t("pages.authenticator.forgotPassword")}</Button>
    </StyledForm>
  );
};

export default ForgotPassword;
