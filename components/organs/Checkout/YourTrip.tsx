import React from "react";

import { Flex } from "../../atoms/Section";
import { TFunction } from "next-i18next";
import styled from "styled-components";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import { Space } from "../../atoms/Layout";
import { H3, Paragraph, Text } from "../../atoms/Typography";

type IYourTripProps = {
  availableRoomType: IAvailableRoomType;
  t: TFunction;
};

const RoomDescriptionContainer = styled.div`
  flex: 1;
  padding-left: 24px;
`;

const YourTrip: React.FC<IYourTripProps> = ({ availableRoomType, t }) => {
  const { checkIn, checkOut, name, people } = availableRoomType;

  if (!availableRoomType) {
    return <div>{t(name)} is not available anymore</div>;
  }
  return (
    <Space margin="5px 24px">
      <H3>Your trip</H3>
      <Space margin="20px 0 10px 0">
        <Flex align="center">
          <Text primary>Dates</Text>
          <Text primary>Guests</Text>
        </Flex>
      </Space>
      <Flex align="center">
        <Text>
          {checkIn} - {checkOut}
        </Text>
        <Text>{people}</Text>
      </Flex>
    </Space>
  );
};

export default YourTrip;
