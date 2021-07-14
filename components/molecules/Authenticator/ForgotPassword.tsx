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
        <Button htmlType="submit">{t("pages.authenticator.forgotPassword")}</Button>
        <Space margin="20px 0 0 0">
          <Button link onClick={() => setAuthenticationState("signIn")}>
            Back to login
          </Button>
        </Space>
      </StyledForm>
    </>
  );
};

export default ForgotPassword;
