import { ifach } from "./ifach";
import { galeon } from "./galeon";
import { mayor } from "./mayor";

export type IHotelName = "galeon" | "ifach" | "mayor";
export interface IIncompleteRoom {
  id: string;
  name: string;
}
export interface IRoom extends IIncompleteRoom {
  roomTypeId: string;
}
export interface IIncompleteRoomType {
  id: string;

  priceRegular: string;
  priceWeekend: string;
  deposit?: number;
  cleaningFee?: number;

  peopleCount: number;
  rooms: IIncompleteRoom[];
  attributes: string[];
  images: string[];
  bedRoomCount: number;
  bathCount: number;
  bedType:
    | "double_bed"
    | "single_bed"
    | "4_single_beds"
    | "4_single_beds_1_sofa_bed"
    | "bunk"
    | "2_single_and_1_sofa_bed"
    | "2_bunk_beds"
    | "2_single_beds"
    | "1_bunk_bed_2_single_beds"
    | "1_double_bed_1_bunk_bed"
    | "1_double_bed_1_bunk_bed_1_single_bed";
}

export interface IRoomType extends IIncompleteRoomType {
  hotelId: IHotelName;
  rooms: IRoom[];
  name: string;
}
export interface IRoomTypeWithNumberPrice extends IRoomType {
  priceRegularNumber: number;
  priceWeekendNumber: number;
}

export interface IIncompleteHotel {
  id: IHotelName;
  address: string;
  images: string[];
  roomTypes: IIncompleteRoomType[];
}
export interface IHotel extends IIncompleteHotel {
  roomTypes: IRoomType[];
  description: string;
  name: string;
}
export interface IHotelWithNumberPrice extends IHotel {
  roomTypes: IRoomTypeWithNumberPrice[];
}

const deeperLevelFiller = (hotel: IIncompleteHotel): IHotelWithNumberPrice => ({
  name: `db.${hotel.id}.name`,
  description: `db.${hotel.id}.description`,
  ...hotel,
  roomTypes: hotel.roomTypes.map((roomType) => ({
    ...roomType,
    hotelId: hotel.id,
    attributes: roomType.attributes.map((attr) => `db.attributes.${attr}`),
    name: `db.${hotel.id}.rooms.${roomType.id}`,
    priceRegularNumber: 0,
    priceWeekendNumber: 0,
    rooms: roomType.rooms.map((room) => ({
      roomTypeId: roomType.id,
      ...room,
    })),
  })),
});

export const DATA: Record<IHotelName, IHotelWithNumberPrice> = {
  ifach: deeperLevelFiller(ifach),
  galeon: deeperLevelFiller(galeon),
  mayor: deeperLevelFiller(mayor),
};
