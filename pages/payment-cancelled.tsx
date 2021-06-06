import React from "react";
import { PageWrapper } from "../components/atoms/Layout";

type IPaymentCancelledProps = {};

const PaymentCancelled: React.FC<IPaymentCancelledProps> = ({ ...props }) => {
  return <PageWrapper>Unfortunate your payment has been cancelled</PageWrapper>;
};

export default PaymentCancelled;
