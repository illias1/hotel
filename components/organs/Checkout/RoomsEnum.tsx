import React from "react";
import Image from "next/image";

import { IBookingResultForCheckout } from "../../../pages/checkout";
import { Flex } from "../../atoms/Section";
import { TFunction } from "next-i18next";
import styled from "styled-components";

type IRoomsEnumProps = {
  editableBookings: IBookingResultForCheckout[];
  removeBooking: (index: number) => void;
  t: TFunction;
};

const CheckoutImage = styled(Image)`
  border-radius: 10px;
`;

const RoomsEnum: React.FC<IRoomsEnumProps> = ({ editableBookings, removeBooking, t }) => {
  return (
    <div>
      {editableBookings.map(({ booking, availableRoomType }, index) => {
        if (!availableRoomType) {
          return <div>{t(booking.roomType.name)} is not available anymore</div>;
        }
        const { checkIn, checkOut, id, name, images, hotelId } = availableRoomType;
        return (
          <Flex align="center" style={{ padding: "5px 24px" }} key={`${index}-${id}`}>
            <CheckoutImage
              width={106}
              height={106}
              src={images[0]}
              alt={`Image for room ${name} in hotel ${hotelId}`}
            />
            <div>{t(name)}</div>
            {checkIn} - {checkOut}
            <button onClick={() => removeBooking(index)}>Remove</button>
          </Flex>
        );
      })}
    </div>
  );
};

export default RoomsEnum;
