import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { DATA, IHotelName, IRoomType } from "../../../utils/db";

type IRoomProps = {
  roomType?: IRoomType;
  error?: string;
};
type IRoomPath = {
  id: string;
  hotelId: IHotelName;
};

const HotelPage: React.FC<IRoomProps> = ({ roomType, error }) => {
  if (error) {
    return <div>Error happened</div>;
  }

  return <div>Room type page: {roomType.name}</div>;
};

export default HotelPage;

export const getStaticPaths: GetStaticPaths<IRoomPath> = async () => {
  const paths = [];
  const hotels = Object.values(DATA);
  hotels.forEach((hotel) => {
    hotel.roomTypes.forEach((roomType) => {
      paths.push({
        params: { id: roomType.id, hotelId: hotel.id },
      });
    });
  });
  console.log("paths", paths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IRoomProps, IRoomPath> = async ({ params }) => {
  try {
    const hotel = DATA[params.hotelId];
    return { props: { roomType: hotel.roomTypes.find((roomType) => roomType.id == params.id) } };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
