import { IIncompleteHotel } from ".";

const commonAttributes = [
  "air_conditioner",
  "wifi",
  "hair_dryer",
  "iron",
  "washing_machine",
  "dishwasher",
  "coffee_machine",
  "oven",
  "closet_in_every_room",
  "mayor_bathrooms",
];

export const mayor: IIncompleteHotel = {
  id: "mayor",
  address: "Calle Navío, 9",
  images: [
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133511_PljmHjlH2H.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133558_aLBOF0mtV4.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133654_uTroNKZ3kD.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133415_BsY9iPmY5.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133438_LiV81-nC-.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133346_1kZ-h4X1pO.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133558_GzDoo5umj.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133415_G48TDmoUb.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133415_G48TDmoUb.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133346_E18ArOGb7.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133543_E-EZU-NzS3.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133400_037Rnfupi.jpg",
    "https://ik.imagekit.io/alquileres/Plaza_Mayor/IMG20210602133438_mZkBysia1.jpg",
  ],
  roomTypes: [
    {
      id: "mayor_1_a",
      priceRegular: "price_1IhyFFJbqXJxe7z3j1Q9gZFC",
      priceWeekend: "price_1IhyFFJbqXJxe7z3MIF6o7jh",
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 4,
      images: ["https://via.placeholder.com/300"],
      rooms: [
        {
          id: "mayor_1_a_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "big_terrace", "small_balcony"],
      bedType: "4_single_beds",
      bedRoomCount: 2,
      bathCount: 2,
    },
    {
      id: "mayor_2_b",
      priceRegular: "price_1IhyGOJbqXJxe7z3SCz7YrE3",
      priceWeekend: "price_1IhyGOJbqXJxe7z30iynCvjP",
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 5,
      images: ["https://via.placeholder.com/300"],
      rooms: [
        {
          id: "mayor_2_b_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "balcony"],
      bedType: "4_single_beds_1_sofa_bed",
      bedRoomCount: 2,
      bathCount: 2,
    },
    {
      id: "mayor_3_b",
      priceRegular: "price_1IhyHfJbqXJxe7z3EmuV3MOC",
      priceWeekend: "price_1IhyHfJbqXJxe7z3lL8k2771",
      deposit: 100,
      cleaningFee: 40,
      peopleCount: 5,
      images: ["https://via.placeholder.com/300"],
      rooms: [
        {
          id: "mayor_3_b_1",
          name: "",
        },
      ],
      attributes: [...commonAttributes, "balcony"],
      bedType: "4_single_beds",
      bedRoomCount: 2,
      bathCount: 2,
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
