// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Room, RoomType, Hotel } = initSchema(schema);

export {
  Room,
  RoomType,
  Hotel
};