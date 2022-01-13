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
        <Input defaultValue={reusableData.email} prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item
        name="verificationCode"
        label={t("pages.authenticator.labels.verificationCode")}
        rules={[
          {
            required: true,
            message: t("errors.verificationCodeRequired"),
          },
        ]}
      >
        <Input prefix={<CodeOutlined />} placeholder="1234" />
      </Form.Item>
      <Button htmlType="submit">{t("pages.authenticator.confirmSignUp")}</Button>
    </StyledForm>
  );
};

export default ConfirmSignUp;
