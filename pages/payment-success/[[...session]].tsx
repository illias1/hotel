import React from "react";
import { PageWrapper } from "../../components/atoms/Layout";

type IPaymentSuccessProps = {};

const PaymentSuccess: React.FC<IPaymentSuccessProps> = ({ ...props }) => {
  return <PageWrapper>Thank you for your payment!</PageWrapper>;
};

export default PaymentSuccess;
