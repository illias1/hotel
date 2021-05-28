import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Col, Divider, Row } from "antd";

import { DATA, IHotelName, IRoomType } from "../../../../utils/db";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../../../utils/db/utils";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StayInfoSelect from "../../../../components/molecules/StayInfoSelect";
import { REVALIDATE_PERIOD } from "../../../../constants";
import { displayPrice } from "../../../../utils/general";
import { getPrices } from "../../../../utils/payment";
import { PageWrapper, Space } from "../../../../components/atoms/Layout";
import PhotoGallery from "../../../../components/molecules/Gallery";
import { H1, H4, H5, Label, LI } from "../../../../components/atoms/Typography";
import { Center, Flex, Section } from "../../../../components/atoms/Section";
import AttributeIcon from "../../../../assets/icons/Attribute";
import DownChevronIcon from "../../../../assets/icons/DownChevron";
import UpChevronIcon from "../../../../assets/icons/UpChevron";
import Map from "../../../../components/organs/Map";
import ExternalLinkIcon from "../../../../assets/icons/ExternalLink";
import RoomBookArea from "../../../../components/organs/RoomBookArea";
import SocialShare from "../../../../components/molecules/SocialShare";

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

interface IAvailability {
  checkIn: string;
  checkOut: string;
  people: number;
}
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
  const [availability, setAvailability] = React.useState<IAvailability>(null);
  const [bookingForm, setBookingForm] = React.useState<any>({});
  const [amenities, setAmenities] = React.useState<string[]>(roomType.attributes.slice(0, 4));
  const router = useRouter();
  const { t } = useTranslation();
  if (error) {
    return <div>Error happened {error}</div>;
  }
  React.useEffect(() => {
    if ("checkIn" in router.query && "checkOut" in router.query && "people" in router.query) {
      setAvailability({
        checkIn: router.query["checkIn"] as string,
        checkOut: router.query["checkOut"] as string,
        people: Number(router.query["people"]),
      });
    }
  }, [router.query]);
  console.log("avail", availability);

  return (
    <PageWrapper isRoomPage={Boolean(availability)}>
      <PhotoGallery images={roomType.images.map((url) => ({ url }))} />
      <Space padding={24}>
        <Row justify="space-around" style={{ maxWidth: 1000, margin: "auto" }}>
          <Col xs={24} md={14}>
            <Flex>
              <H1>{t(roomType.name)}</H1>
              <SocialShare />
            </Flex>
            <Label>{getHotelByRoomTypeId(roomType.id).address}</Label>
            <ExternalLinkIcon />
            <Divider />
            <H5>Room type</H5>
            {roomType.peopleCount} guests - {roomType.bedRoomCount} bedrooms - {t(roomType.bedType)}{" "}
            -{roomType.bathCount} baths
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
            <H5>Choose another dates?</H5>
            <StayInfoSelect maxPeople={roomType.peopleCount} first={roomType.id} />
          </Col>
          <Col>
            {Boolean(availability) && (
              <RoomBookArea
                roomType={{
                  ...roomType,
                  ...availability,
                  availableRoom: null,
                  priceRegularNumber: priceRegular,
                  priceWeekendNumber: priceWeekend,
                }}
              />
            )}
          </Col>
        </Row>
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
