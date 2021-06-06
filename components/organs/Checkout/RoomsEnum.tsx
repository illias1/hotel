import React from "react";
import Image from "next/image";

import { Flex } from "../../atoms/Section";
import { TFunction } from "next-i18next";
import styled from "styled-components";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import { Space } from "../../atoms/Layout";
import { SmallText, Text } from "../../atoms/Typography";

type IRoomsEnumProps = {
  availableRoomType: IAvailableRoomType;
  t: TFunction;
};

const RoomDescriptionContainer = styled.div`
  flex: 1;
  padding-left: 24px;
`;

const CheckoutImage = styled.img`
  border-radius: 10px;
  object-fit: cover;
`;

const RoomsEnum: React.FC<IRoomsEnumProps> = ({ availableRoomType, t }) => {
  if (!availableRoomType) {
    return <div>{t(availableRoomType.name)} is not available anymore</div>;
  }
  const { checkIn, checkOut, id, name, images, hotelId, bedRoomCount, bathCount } =
    availableRoomType;
  return (
    <Space margin="5px 24px">
      <Flex align="center">
        <CheckoutImage
          width={106}
          height={106}
          src={images[0]}
          alt={`Image for room ${name} in hotel ${hotelId}`}
        />
        <RoomDescriptionContainer>
          <div>{t(name)}</div>
          <SmallText>{bedRoomCount} bedroom(s)</SmallText>
          <SmallText>{bathCount} bath-room(s)</SmallText>
        </RoomDescriptionContainer>
      </Flex>
    </Space>
  );
};

export default RoomsEnum;
