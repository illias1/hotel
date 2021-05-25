import { IIncompleteHotel } from ".";

const commonAttributes = [
  "wifi",
  "air_conditioner",
  "hair_dryer",
  "safe",
  "tv_satellite",
  "private_bathroom",
];

export const galeon: IIncompleteHotel = {
  id: "galeon",
  address: "Carrer de Puchalt , 18",
  images: [
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510173242_a682_jXjW.jpg",
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510173158_oNS7naYad.jpg",
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510173512_tPhM0KapG.jpg",
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510173502_Zp3zPbkQ7qx.jpg",
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510174550_KZYkML8ux.jpg",
    "https://ik.imagekit.io/alquileres/Galeon/IMG20210510174635_hbkmF1fCi.jpg",
  ],
  roomTypes: [
    {
      id: "galeon_double_disabled",
      priceRegular: "price_1IhxXoJbqXJxe7z33Jo7t2rT",
      priceWeekend: "price_1IhxXoJbqXJxe7z3pKI5WpI2",
      peopleCount: 2,
      images: [
        "https://ik.imagekit.io/alquileres/Galeon/test/IMG20210510174215_DOH1slEs3.jpg",
        "https://ik.imagekit.io/alquileres/Galeon/test/IMG20210510175115_yVoGD9G_X.jpg",
        "https://ik.imagekit.io/alquileres/Galeon/test/IMG20210510175352_rACuBh0FF.jpg",
        "https://ik.imagekit.io/alquileres/Galeon/test/IMG20210510174246_YamxJ_0Fp.jpg",
        "https://ik.imagekit.io/alquileres/Galeon/test/IMG20210510174405_uMYKI1RPbGyF.jpg",
      ],
      rooms: [
        {
          id: "galeon_double_disabled_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "disabled_friendly"],
      bedType: "2_single_beds",
    },
    {
      id: "galeon_double_balcony",
      priceRegular: "price_1IhxsKJbqXJxe7z3aZacy9os",
      priceWeekend: "price_1IhxsKJbqXJxe7z3ALWjL44g",
      peopleCount: 2,
      images: ["https://via.placeholder.com/300"],
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
      attributes: [...commonAttributes, "balcony"],
      bedType: "2_single_beds",
    },
    {
      id: "galeon_quadruple_bunk",
      priceRegular: "price_1Ihy2gJbqXJxe7z3cJJoD3Pk",
      priceWeekend: "price_1Ihy2gJbqXJxe7z3Dp73svsV",
      peopleCount: 4,
      images: ["https://via.placeholder.com/300"],
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
      bedType: "1_bunk_bed_2_single_beds",
    },
    {
      id: "galeon_quadruple_terrace",
      priceRegular: "price_1Ihy0hJbqXJxe7z3OW4Xi6RR",
      priceWeekend: "price_1Ihy0hJbqXJxe7z3W6eCNmxU",
      peopleCount: 4,
      images: ["https://via.placeholder.com/300"],
      rooms: [
        {
          id: "galeon_quadruple_terrace_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "small_terrace"],
      bedType: "1_bunk_bed_2_single_beds",
    },
    {
      id: "galeon_quintuple",
      priceRegular: "price_1IhxvMJbqXJxe7z3ufLM7oQF",
      priceWeekend: "price_1IhxvMJbqXJxe7z3ND0l1vJq",
      peopleCount: 5,
      images: ["https://via.placeholder.com/300"],
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
      bedType: "1_double_bed_1_bunk_bed_1_single_bed",
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
