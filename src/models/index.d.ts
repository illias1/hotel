import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Room {
  readonly id: string;
  readonly roomtypeID?: string;
  readonly images?: string[];
  constructor(init: ModelInit<Room>);
  static copyOf(source: Room, mutator: (draft: MutableModel<Room>) => MutableModel<Room> | void): Room;
}

export declare class RoomType {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly peopleCount: number;
  readonly hotelID?: string;
  readonly Rooms?: (Room | null)[];
  constructor(init: ModelInit<RoomType>);
  static copyOf(source: RoomType, mutator: (draft: MutableModel<RoomType>) => MutableModel<RoomType> | void): RoomType;
}

export declare class Hotel {
  readonly id: string;
  readonly images?: string[];
  readonly name?: string;
  readonly address?: string;
  readonly RoomTypes?: (RoomType | null)[];
  constructor(init: ModelInit<Hotel>);
  static copyOf(source: Hotel, mutator: (draft: MutableModel<Hotel>) => MutableModel<Hotel> | void): Hotel;
}