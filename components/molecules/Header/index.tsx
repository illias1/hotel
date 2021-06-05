import React from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import styled from "styled-components";
import LeftChevronIcon from "../../../assets/icons/LeftChevron";
import { Flex } from "../../atoms/Section";
import { H5 } from "../../atoms/Typography";
import { useRouter } from "next/router";

type IHeaderProps = {
  text?: string;
  title?: string;
  isAlsoBigScreens?: boolean;
};

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AbsolutePosition = styled.div<{ left?: boolean }>`
  position: absolute;
  ${({ left }) => (left ? "left: 0" : "right: 0")};
  display: flex;
  align-items: center;
`;

const Header: React.FC<IHeaderProps> = ({ isAlsoBigScreens, text, title, children }) => {
  const screens = useBreakpoint();
  const router = useRouter();
  const component = (
    <HeaderContainer>
      <AbsolutePosition left>
        <div onClick={() => router.back()}>
          <LeftChevronIcon />
        </div>
        <div>{text}</div>
      </AbsolutePosition>
      <Flex align="center" justify="center">
        <H5 style={{ marginBottom: 0 }}>{title}</H5>
      </Flex>
      <AbsolutePosition>{children}</AbsolutePosition>
    </HeaderContainer>
  );
  if (isAlsoBigScreens) {
    return component;
  }
  return screens.md ? <> </> : component;
};

export default Header;
