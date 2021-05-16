import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { DATA, IHotelName, IRoomType } from "../../../../utils/db";
import { getRoomTypeById } from "../../../../utils/db/utils";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StayInfoSelect from "../../../../components/molecules/StayInfoSelect";
import { REVALIDATE_PERIOD } from "../../../../constants";
import { displayPrice } from "../../../../utils/general";
import { getPrices } from "../../../../utils/payment";
import Image from "next/image";
import BookRoomButton from "../../../../components/molecules/BookRoomButton";
import { PageWrapper } from "../../../../components/atoms/Layout";

type IRoomProps = {
  roomType?: IRoomType;
  priceRegular?: number;
  priceWeekend?: number;
  error?: string;
};
type IRoomPath = {
  roomId: string;
  id: string;
  hotelId: IHotelName;
};

type ICheckDates = {
  checkIn: string;
  checkOut: string;
};
const initialCheckDates: ICheckDates = {
  checkIn: "",
  checkOut: "",
};

const HotelPage: React.FC<IRoomProps> = ({ roomType, error, priceRegular, priceWeekend }) => {
  const [checkDates, setCheckDates] = React.useState<ICheckDates>(initialCheckDates);
  const [bookingForm, setBookingForm] = React.useState<any>({});
  const router = useRouter();
  const { t } = useTranslation();
  if (error) {
    return <div>Error happened {error}</div>;
  }

  return (
    <PageWrapper>
      <p>
        <span>hotel </span>
        <Link href={`/hotels/${router.query.id}`}>
          <a>{router.query.id}</a>
        </Link>
      </p>
      <div>Room type page: {roomType.name}</div>
      {roomType.images.map((url, index) => (
        <Image
          key={index}
          width={300}
          height={300}
          src={url}
          alt={`Image ${index} for room ${roomType.name}`}
        />
      ))}
      <ul>
        {roomType.attributes.map((attr) => (
          <li key={attr}>{t(attr)}</li>
        ))}
      </ul>
      {"checkIn" in router.query && "checkOut" in router.query && "people" in router.query && (
        <div>
          <div>
            The room is available for {router.query["checkIn"]} - {router.query["checkOut"]}
          </div>
          <BookRoomButton
            roomType={{
              ...roomType,
              people: (router.query["people"] as unknown) as number,
              checkIn: router.query["checkIn"] as string,
              checkOut: router.query["checkOut"] as string,
              availableRoom: null,
              priceRegularNumber: priceRegular,
              priceWeekendNumber: priceWeekend,
            }}
          />
        </div>
      )}
      <StayInfoSelect maxPeople={roomType.peopleCount} first={roomType.id} />
      <div>price</div>
      <div>{displayPrice(null, priceRegular, priceWeekend)} euro?</div>
    </PageWrapper>
  );
};

export default HotelPage;

export const getStaticPaths: GetStaticPaths<IRoomPath> = async () => {
  const paths = [];
  const hotels = Object.values(DATA);
  hotels.forEach((hotel) => {
    hotel.roomTypes.forEach((roomType) => {
      paths.push({
        params: { roomId: roomType.id, id: hotel.id },
      });
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IRoomProps, IRoomPath> = async ({ params, locale }) => {
  try {
    const roomType = getRoomTypeById(params.roomId);
    const prices = await getPrices(process.env.STRIPE_SECRET_KEY);
    return {
      props: {
        roomType,
        priceWeekend: prices[roomType.priceWeekend],
        priceRegular: prices[roomType.priceRegular],
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: REVALIDATE_PERIOD,
    };
  } catch (err) {
    return {
      props: { error: err.message, ...(await serverSideTranslations(locale, ["common"])) },
      revalidate: REVALIDATE_PERIOD,
    };
  }
};
