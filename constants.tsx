import BanIcon from "./assets/icons/Ban";
import ClockIcon from "./assets/icons/ClockIcon";
import LockIcon from "./assets/icons/LockIcon";
import NoSmokingIcon from "./assets/icons/NoSmoking";

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
    name: "pages.room.rules.check_in_after_3_00_pm",
    icon: <ClockIcon />,
  },
  {
    name: "pages.room.rules.checkout_11_00_am",
    icon: <ClockIcon />,
  },
  {
    name: "pages.room.rules.self_check_in_with_smart_lock",
    icon: <LockIcon />,
  },
  {
    name: "pages.room.rules.no_pets",
    icon: <BanIcon />,
  },
  {
    name: "pages.room.rules.no_smoking",
    icon: <NoSmokingIcon />,
  },
];
