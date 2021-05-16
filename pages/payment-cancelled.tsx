import React from "react";
import { PageWrapper } from "../components/atoms/Layout";
import { LOCAL_STORAGE_RESERVATION } from "../constants";

type IPaymentCancelledProps = {};

const PaymentCancelled: React.FC<IPaymentCancelledProps> = ({ ...props }) => {
  React.useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_RESERVATION);
  }, []);
  return <PageWrapper>Unfortunate your payment has been cancelled</PageWrapper>;
};

export default PaymentCancelled;
