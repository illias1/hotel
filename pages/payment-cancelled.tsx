import React from "react";
import { LOCAL_STORAGE_RESERVATION } from "../constants";

type IPaymentCancelledProps = {};

const PaymentCancelled: React.FC<IPaymentCancelledProps> = ({ ...props }) => {
  React.useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_RESERVATION);
  }, []);
  return <div>Unfortunate your payment has been cancelled</div>;
};

export default PaymentCancelled;
