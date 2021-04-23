import React from "react";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

import { DATA, IHotel, IHotelName } from "../../utils/db";
import { PATHS } from "../../utils/paths";

type IHotelProps = {
  hotel?: IHotel;
  error?: string;
};

const HotelPage: React.FC<IHotelProps> = ({ hotel, error }) => {
  if (error) {
    return <div>Error happened</div>;
  }

  return (
    <div>
      {hotel.name} page
      {hotel.roomTypes.map((roomType) => (
        <div key={roomType.id}>
          {roomType.name}
          <Link href={PATHS.room(hotel.id, roomType.id)}>
            <a>{roomType.id}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HotelPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(DATA).map((key) => ({
    params: { id: key },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IHotelProps> = async ({ params }) => {
  try {
    const id = params.id as IHotelName;
    const hotel = DATA[id];
    return { props: { hotel } };
  } catch (err) {
    return { props: { error: err.message } };
  }
};
