import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import HomeIcon from "../../../assets/icons/HomeIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Translation from "../../molecules/Translation";

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
        <Link key={path.href} href={path.href}>
          <a>{path.icon(router.pathname == path.href)}</a>
        </Link>
      ))}
      <Translation />
    </NavigationContainer>
  );
};

const ROUTES = [
  {
    href: "/",
    icon: (active: boolean) => <HomeIcon active={active} />,
  },
  {
    href: "/profile",
    icon: (active: boolean) => <UserIcon active={active} />,
  },
  {
    href: "/search",
    icon: (active: boolean) => <SearchIcon active={active} />,
  },
];

export default Navigation;
