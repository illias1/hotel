import React from 'react'
import { TFunction } from 'next-i18next'
import { Form, Input } from 'antd'
import { MailOutlined } from "@ant-design/icons";

type IEmailIFormItemProps = {
  t: TFunction,
  name?: string
}

const EmailIFormItem: React.FC<IEmailIFormItemProps> = ({ t, name="email" }) => {
  return (
    <Form.Item
      name={name}
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
      <Input prefix={<MailOutlined />} />
    </Form.Item>
  )
}

export default EmailIFormItem