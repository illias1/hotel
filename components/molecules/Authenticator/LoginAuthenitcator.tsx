import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { IAuthenticationState, IReusableAuthenticatorData, StyledForm } from ".";
import Button from "../../atoms/Button";

type IAuthenticatorUIProps = {
  setAuthenticationState: React.Dispatch<React.SetStateAction<IAuthenticationState>>;
  handleSubmit: (data: any) => void;
  reusableData: IReusableAuthenticatorData;
};

export interface ILoginFormResult {
  email: string;
  password: string;
}

const LoginAuthenticator: React.FC<IAuthenticatorUIProps> = ({
  setAuthenticationState,
  handleSubmit,
  reusableData,
}) => {
  return (
    <StyledForm
      initialValues={{ email: reusableData.email }}
      name="normal_login"
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
        <Button htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      <Button link onClick={() => setAuthenticationState("forgotPassword")}>
        Forgot password
      </Button>
      <br />
      <br />
      <Button onClick={() => setAuthenticationState("signUp")} link>
        Register now!
      </Button>
    </StyledForm>
  );
};

export default LoginAuthenticator;
