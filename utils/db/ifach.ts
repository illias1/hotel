import { IIncompleteHotel } from ".";

const commonAttributes = ["wifi", "air_conditioner", "tv", "hair_dryer", "private_bathroom"];

export const ifach: IIncompleteHotel = {
  id: "ifach",
  address: "Calle Isac Peral 2, Plaza Ifach",
  images: [],
  roomTypes: [
    {
      id: "ifach_2_bunk",
      priceRegular: "price_1Ihy5SJbqXJxe7z31XcJvLrG",
      priceWeekend: "price_1IhxW0JbqXJxe7z3IQfU3toX",
      peopleCount: 2,
      images: [],
      rooms: [
        {
          id: "ifach_2_bunk_1",
          name: "",
        },
        {
          id: "ifach_2_bunk_2",
          name: "",
        },
        {
          id: "ifach_2_bunk_3",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "bunk",
    },
    {
      id: "ifach_2_double",
      priceRegular: "price_1Ihy7FJbqXJxe7z3gQnCS1Rq",
      priceWeekend: "price_1Ihy7FJbqXJxe7z3lzBa5CSX",
      peopleCount: 2,
      images: [],
      rooms: [
        {
          id: "ifach_2_double_1",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "double_bed",
    },
    {
      id: "ifach_2_single_disabled",
      priceRegular: "price_1Ihy8tJbqXJxe7z3W3L6vJ5X",
      priceWeekend: "price_1Ihy8tJbqXJxe7z3Vpw25OfI",
      peopleCount: 2,
      images: [],
      rooms: [
        {
          id: "ifach_2_single_disabled_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "disabled_friendly"],
      bedType: "single_bed",
    },
    {
      id: "ifach_triple",
      priceRegular: "price_1IhyArJbqXJxe7z3XcLVGKqX",
      priceWeekend: "price_1IhyArJbqXJxe7z3qFKM764T",
      peopleCount: 3,
      images: [],
      rooms: [
        {
          id: "ifach_triple_1",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "2_single_and_1_sofa_bed",
    },
    {
      id: "ifach_quadruple",
      priceRegular: "price_1IhyCfJbqXJxe7z3xviGVWRp",
      priceWeekend: "price_1IhyCfJbqXJxe7z3TZ6M5Tio",
      peopleCount: 3,
      images: [],
      rooms: [
        {
          id: "ifach_quadruple_1",
          name: "",
        },
        {
          id: "ifach_quadruple_2",
          name: "",
        },
      ],
      attributes: commonAttributes,
      bedType: "2_bunk_beds",
    },
  ],
};
// We have 2 diferent hostals with the same name, 50 meters from each other, the first one is:
// Room types:
// 	-Double room 1:
// 		-1 bunk bed
// 		-bathroom with shower
// 		Pricing: 39 euros per night.
// 	-Double room 2:
// 		-1 double bed
// 		-bathroom with shower
// 		Pricing: 39 euros per night.
// 	-Double room 3:(Handicapped people)
// 		-2 single beds
// 		-bathroom with shower
// 		Pricing: 39 euros per night.
// 	-Triple room 1:
// 		-2 single and 1 sofa-bed
// 		-bathroom with shower
// 		Pricing: 42 euros per night.

// 	Attributes:
// 		-WIFI
// 		-Air conditioner
// 		-TV
// 		-Hair dryer
// 	Hostal has a sharing kitchenet, with a table, 4 chairs, zone where you can cook and eat for yourself.

// Second one:
// Room types:
// 	-Cuadruple room 1:
// 		-2 bunk beds
// 		-bathroom with shower
// 		-Pricing: 45 euros per night.

// 	-Double room 1:
// 		-1 bunk bed
// 		-bathroom with shower
// 		-Pricing: 39 euros per night.

// 	-Double room 2:
// 		-1 bunk bed
// 		-bathroom with shower
// 		-Pricing: 39 euros per night.

// 	-Cuadruple room 2:
// 		-2 bunk beds
// 		-bathroom with shower
// 		-Pricing: 45 euros per night.

// 	Attributes:
// 		-WIFI
// 		-Air conditioner
// 		-TV
// 		-Hair dryer
