import React from "react";
import { LOCAL_STORAGE_RESERVATION } from "../../constants";

type IPaymentSuccessProps = {};

const PaymentSuccess: React.FC<IPaymentSuccessProps> = ({ ...props }) => {
  React.useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_RESERVATION);
  }, []);
  return <div>Thank you for your payment!</div>;
};

export default PaymentSuccess;
