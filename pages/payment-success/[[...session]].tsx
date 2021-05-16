import React from "react";
import { PageWrapper } from "../../components/atoms/Layout";
import { LOCAL_STORAGE_RESERVATION } from "../../constants";

type IPaymentSuccessProps = {};

const PaymentSuccess: React.FC<IPaymentSuccessProps> = ({ ...props }) => {
  React.useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_RESERVATION);
  }, []);
  return <PageWrapper>Thank you for your payment!</PageWrapper>;
};

export default PaymentSuccess;
