import React from "react";
import { Grid } from "antd";

import { displayPrice } from "../../../utils/general";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import BookRoomButton from "../../molecules/BookRoomButton";
import { NavigationContainer } from "../Navigation";
import styled from "styled-components";
import { H4, H5 } from "../../atoms/Typography";
import StayInfoSelect from "../../molecules/StayInfoSelect";

const { useBreakpoint } = Grid;

type IRoomPageNavigationProps = {
  roomType: IAvailableRoomType;
};

const VerticalContainer = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  position: sticky;
  top: 40px;
`;

const RoomBookArea: React.FC<IRoomPageNavigationProps> = ({ roomType }) => {
  const screens = useBreakpoint();
  return screens.md ? (
    <VerticalContainer>
      <H4>{displayPrice(roomType)}</H4>
      <H5>
        {roomType.checkIn} - {roomType.checkOut}
      </H5>
      <BookRoomButton roomType={roomType} />
    </VerticalContainer>
  ) : (
    <NavigationContainer>
      <div>
        <div>
          {roomType.checkIn} - {roomType.checkOut}
        </div>
        {displayPrice(roomType)}
      </div>
      <BookRoomButton roomType={roomType} />
    </NavigationContainer>
  );
};

export default RoomBookArea;
