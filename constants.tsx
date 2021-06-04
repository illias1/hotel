import ClockIcon from "./assets/icons/ClockIcon";

export const LOCAL_STORAGE_RESERVATION = "reservation";
export const LOCAL_STORAGE_SEARCH = "search";
export const LOCAL_STORAGE_PEOPLE = "people";
export const LOCAL_STORAGE_CHECK_IN = "check_in";
export const LOCAL_STORAGE_CHECK_OUT = "check_out";
export const SESSION = "session";
export const REVALIDATE_PERIOD = 6 * 60 * 60;
// export const PRICES_CACHE_TIMEOUT = 1000 * 60 * 60 * 2;
export const PRICES_CACHE_TIMEOUT = 1000 * 60 * 60;

export const houseRules = [
  {
    name: "Check-in: After 3:00 PM",
    icon: <ClockIcon />,
  },
  {
    name: "Checkout: 11:00 AM",
    icon: <ClockIcon />,
  },
  {
    name: "Self check-in with smart lock",
    icon: <ClockIcon />,
  },
  {
    name: "No pets",
    icon: <ClockIcon />,
  },
  {
    name: "No smoking",
    icon: <ClockIcon />,
  },
];
