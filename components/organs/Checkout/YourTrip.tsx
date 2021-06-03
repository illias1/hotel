import React from "react";

import { Flex } from "../../atoms/Section";
import { TFunction } from "next-i18next";
import styled from "styled-components";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import { Space } from "../../atoms/Layout";
import { H3, Paragraph } from "../../atoms/Typography";

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
      <Flex align="center">
        <div>
          Dates
          <Paragraph>
            {checkIn} - {checkOut}
          </Paragraph>
        </div>
        Edit
      </Flex>
      <Flex align="center">
        <div>
          Guests
          <Paragraph>{people}</Paragraph>
        </div>
        Edit
      </Flex>
    </Space>
  );
};

export default YourTrip;
