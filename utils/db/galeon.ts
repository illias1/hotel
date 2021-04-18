import { IIncompleteHotel } from ".";

const galeonDescription = ``;
const commonAttributes = [
  "Air conditioner",
  "hair dryer",
  "safe",
  "TV(satellite/cable)",
  "WIFI",
  "bathroom with shower",
];

export const galeon: IIncompleteHotel = {
  id: "galeon",
  name: "Hotel Galeon",
  address: "Carrer de Puchalt , 18",
  description: galeonDescription,
  images: [],
  roomTypes: [
    {
      id: "galeon_double_disabled",
      name: "Double room (disabled)",
      price: 39,
      peopleCount: 2,
      images: [],
      rooms: [
        {
          id: "galeon_double_disabled_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Disabled Friendly"],
      bedType: "2 Single beds",
    },
    {
      id: "galeon_double_balcony",
      name: "Double room (balcony)",
      price: 39,
      peopleCount: 2,
      images: [],
      rooms: [
        {
          id: "galeon_double_balcony_1",
          name: "",
        },
        {
          id: "galeon_double_balcony_2",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Balcony"],
      bedType: "2 Single beds",
    },
    {
      id: "galeon_quadruple_bunk",
      name: "Quadruple room",
      price: 43,
      peopleCount: 4,
      images: [],
      rooms: [
        {
          id: "galeon_quadruple_1",
          name: "",
        },
        {
          id: "galeon_quadruple_2",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "1 Bunk bed, 2 Single beds",
    },
    {
      id: "galeon_quadruple_terrace",
      name: "Quadruple room",
      price: 45,
      peopleCount: 4,
      images: [],
      rooms: [
        {
          id: "galeon_quadruple_terrace_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "Small Terrace"],
      bedType: "1 Bunk bed, 2 Single beds",
    },
    {
      id: "galeon_quintuple",
      name: "Quadruple room",
      price: 45,
      peopleCount: 5,
      images: [],
      rooms: [
        {
          id: "galeon_quintuple_1",
          name: "",
        },
        {
          id: "galeon_quintuple_2",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "1 Double bed, 1 Bunk bed, 1 Single bed",
    },
  ],
};

// Name : "Hotel Galeon",
// adress : "Carrer de Puchalt , 18",
// Room types:
// 	-Double room 1 (room for handicapped people, wide door, bathroom equiped for that):
// 		-2 single beds, 2 people max.
// 		-Pricing: between 36-39 euros per night.

// 	-Double room 2:
// 		-2 single beds, 2 people max.
// 		-Room with the balcony.
// 		-Pricing: between 36-39 euros per night.

// 	-Double room 3:
// 		-2 single beds, 2 people max.
// 		-Room with the balcony.
// 		-Pricing: between 36-39 euros per night.

// 	-Triple room 1:
// 		-1 bunk bed, 2 single beds, 3 people max.
// 		-Pricing: between 41-43 euros per night.

// 	-Triple room 2:
// 		-1 bunk bed, 2 single beds, 3 people max.
// 		-Pricing: between 41-43 euros per night.

// 	-Quadruple room 1:
// 		-1 double bed, 1 bunk bed, 1 single bed, 5 people max.(Covid laws says that the maximum amount of people of the same family is 4 people per room/apartment)
// 		Pricing: 43-45 euros per night.

// 	-Quadruple room 2:
// 		-1 double bed, 1 bunk bed, 1 single bed, 5 people max.
// 		-Pricing: 43-45 euros per night.

// 	-Quadruple room 3:
// 		-1 double bed, 1 bunk bed, 4 people max.
// 		-small terrace
// 		-Pricing: 43-45 euros per night.

// Every room has:
// 		-Air contitioner
// 		-hair dryer
// 		-safe
// 		-TV(satelite/cable)
// 		-WIFI
// 		-bathroom with shower
// Clients can use the terrace on the roof(3rd floor).
