import React from "react";
import { Form, Input } from "antd";
import { CodeOutlined, MailOutlined } from "@ant-design/icons";

import { TFunction } from "next-i18next";
import Button from "../../atoms/Button";
import { IReusableAuthenticatorData, StyledForm } from ".";

type IConfirmSignUpProps = {
  handleSubmit: (data: any) => void;
  reusableData: IReusableAuthenticatorData;
  t: TFunction;
};

export interface IConfirmSignUpFormResult {
  email: string;
  verificationCode: string;
}

const ConfirmSignUp: React.FC<IConfirmSignUpProps> = ({ handleSubmit, t, reusableData }) => {
  return (
    <StyledForm name="confirmSignUp" layout="horizontal" onFinish={handleSubmit}>
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
        <Input defaultValue={reusableData.email} prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        name="verificationCode"
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
      <Button type="submit">{t("pages.authenticator.confirmSignUp")}</Button>
    </StyledForm>
  );
};

export default ConfirmSignUp;
