import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { addRoomBookingToLocalStorage } from "../../../utils/reservation/addBooking";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import { buildCheckoutUrl } from "../../../utils/parseCheckoutUrl";
import Link from "next/link";
import LoadingIcon from "../../../assets/icons/Loading";

type IBookRoomCardProps = {
  roomType: IAvailableRoomType;
  checkIn: string;
  checkOut: string;
  people: number;
};

const BookRoomCard: React.FC<IBookRoomCardProps> = ({ roomType, checkIn, checkOut, people }) => {
  const router = useRouter();
  const [isLoading, setsILoading] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const bookRoom = async (e) => {
    e.preventDefault();
    setsILoading(true);
    const reservation = {
      roomTypeId: roomType.id,
      roomID: roomType.availableRooms[0].id,
      checkIn: checkIn,
      checkOut: checkOut,
      people: people || 2,
      reservationID: "",
      hotelId: roomType.hotelId,
    };
    addRoomBookingToLocalStorage(reservation, (reservations) => {
      router.push(buildCheckoutUrl(reservations));
    });
  };
  return (
    <div>
      {roomType.hotelId} - {t(roomType.name)} ({roomType.id}):
      <Link href="/checkout">
        <a onClick={bookRoom}>Book this room</a>
      </Link>
      {isLoading && <LoadingIcon />}
    </div>
  );
};

export default BookRoomCard;
