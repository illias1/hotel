import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { buildCheckoutUrl } from "../../../utils/parseCheckoutUrl";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import { buttonStyles } from "../../atoms/Button";

type IBookRoomButtonProps = {
  roomType: IAvailableRoomType;
};

export const StyledBookRoomButton = styled.a`
  ${buttonStyles}
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(91.97deg, #f8a170 14.73%, #ffcd61 97.52%);
  color: white;
  @media (max-width: 767px) {
    max-width: 150px;
  }
`;

const BookRoomButton: React.FC<IBookRoomButtonProps> = ({ roomType }) => {
  const reservation = {
    roomTypeId: roomType.id,
    checkIn: roomType.checkIn,
    checkOut: roomType.checkOut,
    people: roomType.people || 2,
  };
  return (
    <Link href={buildCheckoutUrl(reservation)}>
      <StyledBookRoomButton>Book</StyledBookRoomButton>
    </Link>
  );
};

export default BookRoomButton;
