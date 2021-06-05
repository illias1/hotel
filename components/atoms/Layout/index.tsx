import React from "react";
import styled, { css } from "styled-components";
import Navigation from "../../organs/Navigation";

interface IPaddingProps {
  readonly margin?: number | string;
  readonly padding?: number;
  readonly isMaxWidthEnabled?: boolean;
}

export const Space = styled.div<IPaddingProps>`
  ${({ isMaxWidthEnabled }) => isMaxWidthEnabled && `max-width: 1128px; margin: auto;`};
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  ${({ margin }) =>
    margin ? (typeof margin == "number" ? `margin: ${margin}px` : `margin: ${margin}`) : null};
`;

interface IPageWrapper {
  isRoomPage?: boolean;
}

export const PageWrapper: React.FC<IPageWrapper> = ({ children, isRoomPage = false }) => {
  return (
    <Space margin="0 auto 70px">
      {children}
      {!isRoomPage && <Navigation />}
    </Space>
  );
};
