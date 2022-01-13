import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Col, Divider, Row } from "antd";

import { DATA, IHotelName, IRoomType } from "../../../../utils/db";
import { getHotelByRoomTypeId, getRoomTypeById } from "../../../../utils/db/utils";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StayInfoSelect from "../../../../components/molecules/StayInfoSelect";
import { houseRules, REVALIDATE_PERIOD } from "../../../../constants";
import { getPrices } from "../../../../utils/payment";
import { PageWrapper, Space } from "../../../../components/atoms/Layout";
import { H1, H4, H5, Label, LI } from "../../../../components/atoms/Typography";
import { Center, Flex, Section } from "../../../../components/atoms/Section";
import AttributeIcon from "../../../../assets/icons/Attribute";
import DownChevronIcon from "../../../../assets/icons/DownChevron";
import UpChevronIcon from "../../../../assets/icons/UpChevron";
import Map from "../../../../components/organs/Map";
import RoomBookArea from "../../../../components/organs/RoomBookArea";
import SocialShare from "../../../../components/molecules/SocialShare";
import Header from "../../../../components/molecules/Header";
import PhotoGallery from "../../../../components/molecules/Galery";
import IconTextList from "../../../../components/organs/IconsTextList";

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

export interface IAvailability {
  checkIn: string;
  checkOut: string;
  people: number;
}
type ICheckDates = {
  checkIn: string;
  checkOut: string;
};

const HotelPage: React.FC<IRoomProps> = ({ roomType, error, priceRegular, priceWeekend }) => {
  const [availability, setAvailability] = React.useState<IAvailability>(null);
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

  return (
    <PageWrapper isRoomPage={Boolean(availability)}>
      <Header text="Search">
        <SocialShare />
      </Header>
      <PhotoGallery photos={roomType.images} />
      <Space padding={24}>
        <Row justify="space-between">
          <Col flex={2} xs={24} md={14}>
            <Flex>
              <H1>{t(roomType.name)}</H1>
              <SocialShare />
            </Flex>
            <a href="#map">
              <Label style={{ cursor: "pointer" }}>
                {getHotelByRoomTypeId(roomType.id).address}
              </Label>
            </a>
            <Divider />
            <H4>Room type</H4>
            {roomType.peopleCount} guests - {roomType.bedRoomCount} bedrooms - {t(roomType.bedType)}{" "}
            -{roomType.bathCount} baths
            <Divider />
            <H4>Amenities</H4>
            <IconTextList
              t={t}
              list={amenities.map((name) => ({
                icon: <AttributeIcon name={name.split(".")[2]} />,
                name,
              }))}
            />
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
            <H4>House rules</H4>
            <IconTextList t={t} list={houseRules} />
            <Divider />
          </Col>
          <Col xs={0} md={8} flex={1} style={{ marginLeft: "8%" }}>
            <RoomBookArea
              roomType={{
                ...roomType,
                ...availability,
                availableRoom: null,
                priceRegularNumber: priceRegular,
                priceWeekendNumber: priceWeekend,
              }}
            />
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
