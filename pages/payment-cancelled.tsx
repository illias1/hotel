import React from "react";
import { Result } from "antd";
import Link from "next/link";

import { PageWrapper } from "../components/atoms/Layout";

type IPaymentCancelledProps = {};

const PaymentCancelled: React.FC<IPaymentCancelledProps> = ({ ...props }) => {
  return (
    <PageWrapper>
      <Result
        status="error"
        title="Unfortunately, your payment failed"
        subTitle="Please check your card has enough funds and you submitted the correct information."
        extra={[
          <Link href="/">
            <a>Home</a>
          </Link>,
          <Link href="/">
            <a>Back to checkout</a>
          </Link>,
        ]}
      ></Result>
    </PageWrapper>
  );
};

export default PaymentCancelled;
