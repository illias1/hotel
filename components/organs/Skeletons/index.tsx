import React from "react";
import { Skeleton } from "antd";
import { ImageWrapper, RoomCardWrapper } from "../../molecules/BookRoomCard";
import { Space } from "../../atoms/Layout";
import { SelectsWrapper } from "../../molecules/StayInfoSelect/components";
import StayInfoSelect from "../../molecules/StayInfoSelect";
import { SearchInfoSelect } from "../../../pages/search";

type ISkeletonProps = {};

const a = [1, 1, 1];

const SearchSkeleton: React.FC<ISkeletonProps> = ({ ...props }) => {
  return (
    <>
      <SearchInfoSelect>
        <StayInfoSelect />
      </SearchInfoSelect>
      {a.map(() => (
        <RoomCardWrapper>
          <ImageWrapper style={{ background: "grey" }} />
          <Space padding={18}>
            <Skeleton active />
            <Space
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              margin="20px 0"
            >
              <Skeleton.Button active shape="circle" />
              <Skeleton.Button active />
            </Space>
          </Space>
        </RoomCardWrapper>
      ))}
    </>
  );
};

export default SearchSkeleton;
