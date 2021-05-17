import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import HomeIcon from "../../../assets/icons/HomeIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Translation from "../../molecules/Translation";
import { LOCAL_STORAGE_SEARCH } from "../../../constants";

const NavigationContainer = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  position: fixed;
  background: white;
  align-items: center;
`;

type INavigationProps = {};

const Navigation: React.FC<INavigationProps> = ({ ...props }) => {
  const router = useRouter();

  return (
    <NavigationContainer>
      {ROUTES.map((path) => (
        <Link key={path.href()} href={path.href()}>
          <a>{path.icon(router.pathname == path.href())}</a>
        </Link>
      ))}
      <Translation />
    </NavigationContainer>
  );
};

const ROUTES = [
  {
    href: () => "/",
    icon: (active: boolean) => <HomeIcon active={active} />,
  },
  {
    href: () => "/profile",
    icon: (active: boolean) => <UserIcon active={active} />,
  },
  {
    href: () => {
      let search_query = undefined;
      if (typeof window !== "undefined" && "localStorage" in window) {
        search_query = localStorage.getItem(LOCAL_STORAGE_SEARCH);
      }
      return search_query || "/search";
    },
    icon: (active: boolean) => <SearchIcon active={active} />,
  },
];

export default Navigation;
