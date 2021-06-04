import React from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import styled from "styled-components";
import LeftChevronIcon from "../../../assets/icons/LeftChevron";
import { Flex } from "../../atoms/Section";

type IHeaderProps = {
  text: string;
};

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 24px;
`;

const Header: React.FC<IHeaderProps> = ({ text, children }) => {
  const screens = useBreakpoint();
  return screens.md ? (
    <> </>
  ) : (
    <HeaderContainer>
      <Flex align="center" justify="start">
        <LeftChevronIcon />
        <>{text}</>
      </Flex>
      {children}
    </HeaderContainer>
  );
};

export default Header;
