import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useSWR from "swr";
import BookRoomCard from "../components/molecules/BookRoomCard";

import Navigation from "../components/organs/Navigation";
import { IAvailableRoomType } from "../utils/reservation/checkAvailabilities";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ISearchProps {
  error?: string;
  availableRoomTypes?: IAvailableRoomType[];
}

const Search: React.FC<ISearchProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, error } = useSWR<ISearchProps>("/api" + router.asPath, (...args) =>
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
  console.log("data", data);

  if (error) {
    console.error("Error in search", error);
    return <div>Something went wrong</div>;
  }
  if (!data) return <div>loading...</div>;
  if (data.error) return <div>{data.error}</div>;

  const { availableRoomTypes } = data;

  return (
    <>
      Search page
      {"first" in router.query && (
        <>
          <div>
            {firstRoomType ? (
              <div>
                <BookRoomCard
                  t={t}
                  roomType={firstRoomType}
                  checkIn={router.query["checkIn"] as string}
                  checkOut={router.query["checkOut"] as string}
                  people={(router.query["people"] as unknown) as number}
                />
              </div>
            ) : (
              "No availabilities for the room you searched"
            )}
          </div>
          <br />
        </>
      )}
      <div>
        {availableRoomTypes.map((roomType) => (
          <div key={roomType.id}>
            <BookRoomCard
              t={t}
              roomType={roomType}
              checkIn={router.query["checkIn"] as string}
              checkOut={router.query["checkOut"] as string}
              people={(router.query["people"] as unknown) as number}
            />
          </div>
        ))}
      </div>
      <Navigation />
    </>
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
