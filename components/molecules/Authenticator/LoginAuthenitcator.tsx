import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { IAuthenticationState, StyledForm } from ".";

type IAuthenticatorUIProps = {
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
  handleSubmit: (data: any) => void;
};

export interface ILoginFormResult {
  email: string;
  password: string;
}

const LoginAuthenticator: React.FC<IAuthenticatorUIProps> = ({
  setAuthenticationState,
  handleSubmit,
}) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <StyledForm
      name="normal_login"
      className="login-form"
      layout="horizontal"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="link" onClick={() => setAuthenticationState("forgotPassword")}>
          Forgot password
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      Or
      <Button onClick={() => setAuthenticationState("signUp")} type="link">
        register now!
      </Button>
    </StyledForm>
  );
};

export default LoginAuthenticator;
