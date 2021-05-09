import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";
import BookRoomCard from "../components/molecules/BookRoomCard";

import Navigation from "../components/organs/Navigation";
import { DATA, IRoom, IRoomType } from "../utils/db";
import { ValidationError } from "../utils/parseCheckoutUrl";
import {
  checkAvailabilities,
  IAvailableRoomType,
  ISearchQuery,
  validateSearchQuery,
} from "../utils/reservation/checkAvailabilities";

interface ISearchProps {
  error?: string;
  availableRoomTypes?: IAvailableRoomType[];
}

const Search: React.FC<ISearchProps> = ({ error, availableRoomTypes }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [firstRoomType, setFirstRoomType] = React.useState<IAvailableRoomType>(null);
  React.useEffect(() => {
    const first = "first" in router.query ? router.query["first"] : null;
    if (first) {
      const index = availableRoomTypes.findIndex((roomType) => roomType.id === first);
      console.log("index", index);
      if (index > -1) {
        console.log("availableRoomTypes.length", availableRoomTypes.length);
        setFirstRoomType(availableRoomTypes.splice(index, 1)[0]);
        console.log("availableRoomTypes.length", availableRoomTypes.length);
      }
    }
  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      Search page
      {"first" in router.query && (
        <>
          <div>
            {firstRoomType ? (
              <div>
                <BookRoomCard
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
              roomType={roomType}
              checkIn={router.query["checkIn"] as string}
              checkOut={router.query["checkOut"] as string}
              people={(router.query["people"] as unknown) as number}
            />
            {/* {roomType.availableRooms.map((room) => (
              <span>{room.id}, </span>
            ))} */}
          </div>
        ))}
      </div>
      <Navigation />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ISearchProps> = async ({
  req,
  query,
  locale,
}) => {
  try {
    validateSearchQuery((query as unknown) as ISearchQuery);
    const availableRoomTypes = await checkAvailabilities((query as unknown) as ISearchQuery);
    return {
      props: {
        availableRoomTypes,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (e) {
    console.error("Error in search", e);
    if (e instanceof ValidationError) {
      return {
        props: {
          error: e.message,
        },
      };
    }
    return {
      props: {
        error: "Something went wrong",
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

export default Search;
