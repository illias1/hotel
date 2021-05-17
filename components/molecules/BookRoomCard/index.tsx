import React from "react";
import { TFunction } from "next-i18next";
import Image from "next/image";
import styled from "styled-components";

import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import Link from "next/link";

import { displayPrice } from "../../../utils/general";
import BookRoomButton from "../BookRoomButton";
import { Space } from "../../atoms/Layout";
import { H4, H5, Label, LI, Paragraph } from "../../atoms/Typography";
import AttributeIcon from "../../../assets/icons/Attribute";

type IBookRoomCardProps = {
  roomType: IAvailableRoomType;
  checkIn: string;
  checkOut: string;
  people: number;
  t: TFunction;
};

export const RoomCardWrapper = styled.div`
  max-width: 338px;
  margin: 18px auto;
  cursor: pointer;

  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.05));
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 184px;
  position: relative;
`;

const BookRoomCard: React.FC<IBookRoomCardProps> = ({ roomType, checkIn, checkOut, people, t }) => {
  return (
    <Link
      href={`/hotels/${roomType.hotelId}/rooms/${roomType.id}?checkIn=${checkIn}&checkOut=${checkOut}&people=${people}`}
    >
      <RoomCardWrapper>
        <ImageWrapper>
          <Image src={roomType.images[0]} layout="fill" />
        </ImageWrapper>
        <Space padding={18}>
          <H4>{t(roomType.name)}</H4>
          {roomType.attributes.map((attribute) => (
            <LI key={attribute}>
              <AttributeIcon name={attribute.split(".")[2]} />
              <Label style={{ marginLeft: 10 }}>{t(attribute)}</Label>
            </LI>
          ))}
          <Space
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            margin="20px 0"
          >
            <H4>{displayPrice(roomType)}</H4>

            <BookRoomButton style={{ width: "60%" }} roomType={roomType} />
          </Space>
        </Space>
      </RoomCardWrapper>
    </Link>
  );
};

export default BookRoomCard;
