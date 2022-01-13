import React from "react";
import { Grid, Spin, Typography } from "antd";

import { displayPrice } from "../../../utils/general";
import { IAvailableRoomType } from "../../../utils/reservation/checkAvailabilities";
import BookRoomButton from "../../molecules/BookRoomButton";
import { NavigationContainer } from "../Navigation";
import styled from "styled-components";
import { H4, H5 } from "../../atoms/Typography";
import StayInfoSelect from "../../molecules/StayInfoSelect";
import { Flex } from "../../atoms/Section";
import { ICheckoutProps } from "../../../pages/checkout";
import { buildCheckoutUrl } from "../../../utils/parseCheckoutUrl";
import useSWR from "swr";
import { IAvailability } from "../../../pages/hotels/[id]/rooms/[roomId]";

const { useBreakpoint } = Grid;

type IRoomPageNavigationProps = {
  roomType: IAvailableRoomType;
  availability: IAvailability;
};

const VerticalContainer = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  position: sticky;
  top: 40px;
`;

const RoomBookArea: React.FC<IRoomPageNavigationProps> = ({ roomType, availability }) => {
  const screens = useBreakpoint();

  const { data, error } = useSWR<ICheckoutProps>(
    Boolean(availability)
      ? `/api${buildCheckoutUrl({ roomTypeId: roomType.id, ...availability })}`
      : null,
    (...args) =>
      // @ts-ignore
      fetch(...args).then((res) => res.json())
  );

  if (!availability) {
    return (
      <>
        <H5>Check availability</H5>
        <StayInfoSelect first={roomType.id}  />
      </>
    );
  }
  console.log("data", data);
  console.log("error", error);
  if (!data) {
    return screens.md ? (
      <VerticalContainer>
        <Flex justify="center">
          <Spin />
        </Flex>
      </VerticalContainer>
    ) : (
      <NavigationContainer>
        <Flex justify="center">
          <Spin />
        </Flex>
      </NavigationContainer>
    );
  }

  if (error || (data && data.unknownError) || (data && data.validationError)) {
    return screens.md ? (
      <VerticalContainer>Something went wrong</VerticalContainer>
    ) : (
      <NavigationContainer>Something went wrong</NavigationContainer>
    );
  }

  return screens.md ? (
    <VerticalContainer>
      {Boolean(data.booking) ? (
        <>
          <H4>{displayPrice(roomType)}</H4>
          <H5>
            {roomType.checkIn} - {roomType.checkOut}
          </H5>
          <BookRoomButton roomType={roomType} />
        </>
      ) : (
        <Flex justify="center">
          <H5>
            Not available at {roomType.checkIn} - {roomType.checkOut}
          </H5>
        </Flex>
      )}
      <StayInfoSelect />
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
