import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import LoadingIcon from "../../../assets/icons/Loading";

import { buildCheckoutUrl } from "../../../utils/parseCheckoutUrl";
import { addRoomBookingToLocalStorage } from "../../../utils/reservation/addBooking";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";

type IBookRoomButtonProps = {
  roomType: IAvailableRoomType;
};

const BookRoomButton: React.FC<IBookRoomButtonProps> = ({ roomType }) => {
  const router = useRouter();
  const [isLoading, setsILoading] = React.useState<boolean>(false);
  const bookRoom = async (e) => {
    e.preventDefault();
    setsILoading(true);
    const reservation = {
      roomTypeId: roomType.id,
      roomID: null,
      checkIn: roomType.checkIn,
      checkOut: roomType.checkOut,
      people: roomType.people || 2,
      reservationID: "",
      hotelId: roomType.hotelId,
    };
    addRoomBookingToLocalStorage(reservation, (reservations) => {
      router.push(buildCheckoutUrl(reservations));
    });
  };
  return (
    <div>
      <Link href="/checkout">
        <a onClick={bookRoom}>Book this room</a>
      </Link>
      {isLoading && <LoadingIcon />}
    </div>
  );
};

export default BookRoomButton;
