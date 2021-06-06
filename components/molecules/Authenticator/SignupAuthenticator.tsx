import React, { useState } from "react";
import { Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { IAmplifyError, IAuthenticationState, StyledForm } from ".";
import Button from "../../atoms/Button";
import { TFunction } from "next-i18next";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type IAuthenticatorUIProps = {
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
  handleSubmit: (data: any) => void;
  error: IAmplifyError["code"];
  t: TFunction;
};

export interface ISignupFormResult {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const SignupAuthenticator: React.FC<IAuthenticatorUIProps> = ({
  setAuthenticationState,
  handleSubmit,
  error,
  t,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <StyledForm
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleSubmit}
      initialValues={{
        prefix: "86",
      }}
      scrollToFirstError
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
        name="name"
        label="Your name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
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
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("The two passwords that you entered do not match!"));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="+34234234234" />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="/terms">terms</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="submit">Register</Button>
      </Form.Item>
      {error === "UsernameExistsException" && (
        <>
          {t("pages.authenticator.emailNotVerified")}
          <button>{t("pages.authenticator.sendAgain")}</button>
        </>
      )}
      Or
      <Button onClick={() => setAuthenticationState("signIn")} link>
        Login!
      </Button>
    </StyledForm>
  );
};

export default SignupAuthenticator;
