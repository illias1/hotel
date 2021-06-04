import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Row, Col } from "antd";

import BookRoomCard from "../components/molecules/BookRoomCard";
import { IAvailableRoomType } from "../utils/reservation/checkAvailabilities";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageWrapper, Space } from "../components/atoms/Layout";
import SomethingWentWrong from "../components/organs/Wrong";
import SearchSkeleton from "../components/organs/Skeletons";
import StayInfoSelect from "../components/molecules/StayInfoSelect";
import styled from "styled-components";
import { H5, Paragraph } from "../components/atoms/Typography";

interface ISearchProps {
  error?: string;
  availableRoomTypes?: IAvailableRoomType[];
}

export const SearchInfoSelect = styled(Space)`
  max-width: 338px;
  margin: 28px auto;
`;

const Search: React.FC<ISearchProps> = () => {
  const router = useRouter();
  const isRoot = router.asPath === "/search";
  const { t } = useTranslation();
  const { data, error } = useSWR<ISearchProps>(isRoot ? null : `/api${router.asPath}`, (...args) =>
    // @ts-ignore
    fetch(...args).then((res) => res.json())
  );
  const [firstRoomType, setFirstRoomType] = React.useState<IAvailableRoomType>(null);
  React.useEffect(() => {
    const first = "first" in router.query ? router.query["first"] : null;
    if (first && data && "availableRoomTypes" in data) {
      const index = availableRoomTypes.findIndex((roomType) => roomType.id === first);
      if (index > -1) {
        setFirstRoomType(availableRoomTypes.splice(index, 1)[0]);
      }
    }
  }, [data]);

  if (isRoot) {
    return (
      <PageWrapper>
        <SearchInfoSelect>
          <StayInfoSelect />
        </SearchInfoSelect>
      </PageWrapper>
    );
  }

  if (error) {
    console.error("Error in search", error);
    return <SomethingWentWrong />;
  }
  if (!data) return <SearchSkeleton />;
  if (data.error) return <SomethingWentWrong message={data.error} />;

  const { availableRoomTypes } = data;

  return (
    <PageWrapper>
      <SearchInfoSelect>
        <StayInfoSelect />
      </SearchInfoSelect>
      {"first" in router.query && (
        <Space margin={18}>
          <div>
            {firstRoomType ? (
              <div>
                <BookRoomCard
                  t={t}
                  roomType={firstRoomType}
                  checkIn={router.query["checkIn"] as string}
                  checkOut={router.query["checkOut"] as string}
                  people={router.query["people"] as unknown as number}
                />
              </div>
            ) : (
              <>
                <H5>No availabilities for the room you searched</H5>
                <Paragraph>You may also like:</Paragraph>
              </>
            )}
          </div>
          <br />
        </Space>
      )}
      <Row>
        {availableRoomTypes.map((roomType) => (
          <Col xs={24} md={12} xl={8} key={roomType.id}>
            <BookRoomCard
              t={t}
              roomType={roomType}
              checkIn={router.query["checkIn"] as string}
              checkOut={router.query["checkOut"] as string}
              people={router.query["people"] as unknown as number}
            />
          </Col>
        ))}
      </Row>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Search;
