import { ifach } from "./ifach";
import { galeon } from "./galeon";
import { mayor } from "./mayor";

export type IHotelName = "galeon" | "ifach" | "mayor";
export type IRoom = {
  id: string;
  name: string;
};
export interface IIncompleteRoomType {
  id: string;
  name: string;

  priceRegular: string;
  priceWeekend: string;
  deposit?: number;
  cleaningFee?: number;

  peopleCount: number;
  rooms: IRoom[];
  attributes: string[];
  images: string[];
  bedType:
    | "Double bed"
    | "Single bed"
    | "4 Single beds"
    | "4 Single beds, 1 Sofa bed"
    | "Bunk"
    | "2 single and 1 sofa-bed"
    | "2 bunk beds"
    | "2 Single beds"
    | "1 Bunk bed, 2 Single beds"
    | "1 Double bed, 1 Bunk bed"
    | "1 Double bed, 1 Bunk bed, 1 Single bed";
}

export interface IRoomType extends IIncompleteRoomType {
  hotelId: IHotelName;
}

export type IHotel = {
  id: IHotelName;
  name: string;
  address: string;
  images: string[];
  roomTypes: IRoomType[];
  description: string;
};
export interface IIncompleteHotel {
  id: IHotelName;
  name: string;
  address: string;
  images: string[];
  roomTypes: IIncompleteRoomType[];
  description: string;
}

const deeperLevelFiller = (hotel: IIncompleteHotel): IHotel => ({
  ...hotel,
  roomTypes: hotel.roomTypes.map((roomType) => ({ ...roomType, hotelId: hotel.id })),
});

export const DATA: Record<IHotelName, IHotel> = {
  ifach: deeperLevelFiller(ifach),
  galeon: deeperLevelFiller(galeon),
  mayor: deeperLevelFiller(mayor),
};
