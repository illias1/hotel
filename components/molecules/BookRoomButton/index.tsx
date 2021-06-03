import React from "react";
import Link from "next/link";

import { buildCheckoutUrl } from "../../../utils/parseCheckoutUrl";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";

type IBookRoomButtonProps = {
  roomType: IAvailableRoomType;
};

const BookRoomButton: React.FC<IBookRoomButtonProps> = ({ roomType }) => {
  const reservation = {
    roomTypeId: roomType.id,
    checkIn: roomType.checkIn,
    checkOut: roomType.checkOut,
    people: roomType.people || 2,
  };
  return (
    <Link href={buildCheckoutUrl(reservation)}>
      <a>Book</a>
    </Link>
  );
};

export default BookRoomButton;
