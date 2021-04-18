import { IIncompleteHotel } from ".";

const mayorDescription = ``;
const commonAttributes = [
  "Air conditioner",
  "WIFI",
  "Hair dryer",
  "Iron",
  "Washing machine",
  "Dishwasher",
  "Coffee maker",
  "Oven",
  "2 bathrooms, main one with bathtub and the guest one with the shower",
];

export const mayor: IIncompleteHotel = {
  id: "mayor",
  name: 'Apartments "Plaza Mayor"',
  address: "Calle Navío, 9",
  images: [],
  description: mayorDescription,
  roomTypes: [
    {
      id: "mayor_1_a",
      name: "Double room 1",
      price: 60,
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 4,
      images: [],
      rooms: [
        {
          id: "mayor_1_a_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Big Terrace", "Small Balcony", "Closet in every room"],
      bedType: "4 Single beds",
    },
    {
      id: "mayor_2_b",
      name: "Double room 1",
      price: 50,
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 5,
      images: [],
      rooms: [
        {
          id: "mayor_2_b_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Balcony", "Closet in every room"],
      bedType: "4 Single beds, 1 Sofa bed",
    },
    {
      id: "mayor_3_b",
      name: "Double room 1",
      price: 55,
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 5,
      images: [],
      rooms: [
        {
          id: "mayor_3_b_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Balcony", "Closet in every room"],
      bedType: "4 Single beds",
    },
  ],
};

// Name: Apartments "Plaza Mayor"
// Adress: "Calle Navío, 9".
// Apatment types:
// 	-Apartment on the 1st floor,(1A)
// 		-2 rooms.
// 		-4 single beds, 4 people max.
// 		-1 small balcony.
// 		-1 closet in every room.
// 		-2 bathrooms, main one with bathtub and the guest one with the shower.
// 		-big terrace.
// 		Pricing: 60 euros per night, 40 euros cleaning fee, deposit of 100 euros.
// 		Atributes:
// 			-Air conditioner
// 			-WIFI
// 			-Hair dryer
// 			-Iron
// 			-Washing machine
// 			-Dishwasher
// 			-Coffe maker
// 			-Oven

// 	-Apartment on the 2nd floor, (2B)
// 		-2 rooms.
// 		-4 single beds, 1 sofa bed, 5 people max.(Covid laws says that the maximum amount of people of the same family is 4 people per room/apartment).
// 		-Balcony.
// 		-1 closet in every room.
// 		-2 bathrooms, main one with bathtub and the guest one with the shower.
// 		Pricing: 50 euros per night, 40 euros cleaning fee, deposit of 100 euros.
// 		Atributes:
// 			-Air conditioner
// 			-WIFI
// 			-Hair dryer
// 			-Iron
// 			-Washing machine
// 			-Dishwasher
// 			-Coffe maker
// 			-Oven

// 	-Apartment on the 3rd floor, (3B).
// 		-2 rooms.
// 		-4 single beds, 4 people max.
// 		-Balcony.
// 		-1 closet in every room.
// 		-2 bathrooms, main one with bathtub and the guest one with the shower.
// 		Pricing: 55 euros per night, 40 euros cleaning fee, deposit of 100 euros.
// 		Atributes:
// 			-Air conditioner
// 			-WIFI
// 			-Hair dryer
// 			-Iron
// 			-Washing machine
// 			-Dishwasher
// 			-Coffe maker
// 			-Oven

// We can offer parking spot in the garage, 11 euros per night. 2 spots in total.
// The facility has swimming pool, its not open yet and the conditions of use are not clear yet because of Covid 19 regulations
