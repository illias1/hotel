import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Divider, Row } from "antd";

import { DATA, IHotelName, IRoomType } from "../../../../utils/db";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../../../utils/db/utils";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StayInfoSelect from "../../../../components/molecules/StayInfoSelect";
import { REVALIDATE_PERIOD } from "../../../../constants";
import { displayPrice } from "../../../../utils/general";
import { getPrices } from "../../../../utils/payment";
import Image from "next/image";
import BookRoomButton from "../../../../components/molecules/BookRoomButton";
import { PageWrapper, Space } from "../../../../components/atoms/Layout";
import PhotoGallery from "../../../../components/molecules/Gallery";
import { H1, H4, Label, LI } from "../../../../components/atoms/Typography";
import { Center, Flex, Section } from "../../../../components/atoms/Section";
import AttributeIcon from "../../../../assets/icons/Attribute";
import DownChevronIcon from "../../../../assets/icons/DownChevron";
import UpChevronIcon from "../../../../assets/icons/UpChevron";
import Map from "../../../../components/organs/Map";
import ExternalLinkIcon from "../../../../assets/icons/ExternalLink";

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
  const [amenities, setAmenities] = React.useState<string[]>(roomType.attributes.slice(0, 4));
  const router = useRouter();
  const { t } = useTranslation();
  if (error) {
    return <div>Error happened {error}</div>;
  }

  return (
    <PageWrapper>
      <PhotoGallery images={roomType.images.map((url) => ({ url }))} />
      <Space padding={24}>
        <H1>{t(roomType.name)}</H1>
        <Label>{getHotelByRoomTypeId(roomType.id).address}</Label> <ExternalLinkIcon />
        <Divider />
        <H4>Amenities</H4>
        <div>
          {amenities.map((attribute) => (
            <LI key={attribute}>
              <Flex>
                {t(attribute)}
                <AttributeIcon name={attribute.split(".")[2]} />
              </Flex>
            </LI>
          ))}
        </div>
        {amenities.length == 4 ? (
          <Center onClick={() => setAmenities(roomType.attributes)}>
            <DownChevronIcon />
          </Center>
        ) : (
          <Center onClick={() => setAmenities(roomType.attributes.slice(0, 4))}>
            <UpChevronIcon />
          </Center>
        )}
        <Divider />
        <H4>Location</H4>
        <Map height={300} location={roomType.hotelId} />

        <Divider />

        {"checkIn" in router.query && "checkOut" in router.query && "people" in router.query && (
          <div>
            {router.query["checkIn"]} - {router.query["checkOut"]}
          </div>
        )}
        <StayInfoSelect maxPeople={roomType.peopleCount} first={roomType.id} />
        <BookRoomButton
          roomType={{
            ...roomType,
            people: router.query["people"] as unknown as number,
            checkIn: router.query["checkIn"] as string,
            checkOut: router.query["checkOut"] as string,
            availableRoom: null,
            priceRegularNumber: priceRegular,
            priceWeekendNumber: priceWeekend,
          }}
        />
        <div>price</div>
        <div>{displayPrice(null, priceRegular, priceWeekend)} euro?</div>
      </Space>
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
