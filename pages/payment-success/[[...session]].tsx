import React from "react";
import Link from "next/link";
import { Result } from "antd";

import { PageWrapper } from "../../components/atoms/Layout";

type IPaymentSuccessProps = {};

const PaymentSuccess: React.FC<IPaymentSuccessProps> = ({ ...props }) => {
  return (
    <PageWrapper>
      <Result
        status="success"
        title="Thank you for your payment!"
        subTitle="You will shortly receive a confirmation email. You can also always check the booking on your profile page :)"
        extra={[
          <Link href="/">
            <a>Home</a>
          </Link>,
          <Link href="/profile">
            <a>Profile page</a>
          </Link>,
        ]}
      />
      ,
    </PageWrapper>
  );
};

export default PaymentSuccess;
