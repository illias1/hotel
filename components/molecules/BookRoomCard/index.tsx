import React from "react";
import { TFunction } from "next-i18next";
import styled from "styled-components";
import { Row, Col, Tag } from "antd";
import { useRouter } from "next/router";

import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import Link from "next/link";

import { displayPrice } from "../../../utils/general";
import { Space } from "../../atoms/Layout";
import { H4, Label, LI } from "../../atoms/Typography";
import AttributeIcon from "../../../assets/icons/Attribute";
import PhotoGallery from "../Gallery";
import { Flex } from "../../atoms/Section";
import { getHotelByRoomTypeId } from "../../../utils/db/utils";
import { IHotelName } from "../../../utils/db";

type IBookRoomCardProps = {
  roomType: IAvailableRoomType;
  checkIn: string;
  checkOut: string;
  people: number;
  t: TFunction;
};

const getHotelColor = (hotel: IHotelName) => {
  switch (hotel) {
    case "galeon":
      return "brown";
    case "ifach":
      return "blue";
    case "mayor":
      return "green";
  }
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
  const hotel = getHotelByRoomTypeId(roomType.id);
  const router = useRouter();
  const href = `/hotels/${roomType.hotelId}/rooms/${roomType.id}?checkIn=${checkIn}&checkOut=${checkOut}&people=${people}`;
  return (
    <RoomCardWrapper>
      <PhotoGallery
        onClick={() => {
          router.push(href);
        }}
        images={roomType.images.map((url) => ({ url }))}
      />
      {/* <ImageWrapper>
          <Image src={roomType.images[0]} layout="fill" />
        </ImageWrapper> */}
      <Link href={href}>
        <Space padding={18}>
          <H4>{t(roomType.name)}</H4>
          <Row>
            {roomType.attributes.map((attribute) => (
              <Col span={12}>
                <LI key={attribute}>
                  <AttributeIcon name={attribute.split(".")[2]} />
                  <Label style={{ marginLeft: 10 }}>{t(attribute)}</Label>
                </LI>
              </Col>
            ))}
          </Row>
          <Space margin="20px 0">
            <Flex>
              <H4>{displayPrice(roomType)}</H4>
              <Tag color={getHotelColor(hotel.id)}>{t(hotel.name)}</Tag>
            </Flex>
          </Space>
        </Space>
      </Link>
    </RoomCardWrapper>
  );
};

export default BookRoomCard;
