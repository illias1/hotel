import React from "react";
import Link from "next/link";
import styled from "styled-components";

import HomeIcon from "../../assets/icons/HomeIcon";
import UserIcon from "../../assets/icons/UserIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import LanguageIcon from "../../assets/icons/LanguageIcon";

const NavigationContainer = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
`;

type INavigationProps = {};

const Navigation: React.FC<INavigationProps> = ({ ...props }) => {
  return (
    <NavigationContainer>
      <Link href="/">
        <a>
          <HomeIcon />
        </a>
      </Link>
      <Link href="/me">
        <a>
          <UserIcon />
        </a>
      </Link>
      <Link href="/search">
        <a>
          <SearchIcon />
        </a>
      </Link>
      <LanguageIcon />
    </NavigationContainer>
  );
};

export default Navigation;
