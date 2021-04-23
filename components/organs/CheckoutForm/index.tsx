import React from "react";
import { H2 } from "../../atoms/Typography";

type ICheckoutFormProps = {};

const CheckoutForm: React.FC<ICheckoutFormProps> = ({ ...props }) => {
  return (
    <div>
      <H2>Guest information</H2>
      <input type="text" name="name" placeholder="name" />
      <input type="text" name="phone" placeholder="phone" />
      <input type="text" name="email" placeholder="email" />
      <input type="select" name="country" placeholder="Country" />
      <input type="text" name="note" placeholder="note" />
    </div>
  );
};

export default CheckoutForm;
