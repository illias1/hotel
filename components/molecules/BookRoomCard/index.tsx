import React from "react";
import { TFunction } from "next-i18next";
import Image from "next/image";

import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import Link from "next/link";

import { displayPrice } from "../../../utils/general";
import BookRoomButton from "../BookRoomButton";

type IBookRoomCardProps = {
  roomType: IAvailableRoomType;
  checkIn: string;
  checkOut: string;
  people: number;
  t: TFunction;
};

const BookRoomCard: React.FC<IBookRoomCardProps> = ({ roomType, checkIn, checkOut, people, t }) => {
  return (
    <div style={{ margin: 10 }}>
      <div>{displayPrice(roomType)}</div>
      <Link
        href={`/hotels/${roomType.hotelId}/rooms/${roomType.id}?checkIn=${checkIn}&checkOut=${checkOut}&people=${people}`}
      >
        <a>
          {roomType.hotelId} - {t(roomType.name)} ({roomType.id}):
        </a>
      </Link>
      {roomType.images.map((url, i) => (
        <Image key={i} width={100} height={100} src={url} alt={`Image ${i} for ${roomType.id}`} />
      ))}
      <BookRoomButton roomType={roomType} />
    </div>
  );
};

export default BookRoomCard;
