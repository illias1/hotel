import React from "react";
import { useTranslation } from "next-i18next";

import { Button, Modal } from "antd";

import { H2 } from "../../atoms/Typography";
import { ICheckoutProps } from "../../../pages/checkout";
import { SESSION } from "../../../constants";

type IGuestsProps = {};

const Guests: React.FC<ICheckoutProps> = ({
  bookings,
  validationError,
  cookieUser,
  unknownError,
  ...props
}) => {
  const { t } = useTranslation();
  
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!cookieUser) {
    return <div>You are not authenticated</div>;
  }
  return (
    <div>
      <Modal title="Doing some magic" visible={isModalVisible} onCancel={handleCancel}>
        <div>
          {paymentStages.map((stage) => (
            <div key={stage}>{stage}</div>
          ))}
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </Modal>
      <H2>Guest information</H2>
      <div>isAuthenticated: {JSON.stringify(cookieUser)}</div>
      <input type="text" name="name" placeholder={cookieUser.name || "name"} />
      <input type="text" name="phone" placeholder={cookieUser.phone || "phone"} />
      <input type="text" name="email" placeholder={cookieUser.email || "email"} />
      <input type="select" name="country" placeholder="Country" />
      <input type="text" name="note" placeholder="note" />
      
      {JSON.stringify(bookings)}
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default Guests;
