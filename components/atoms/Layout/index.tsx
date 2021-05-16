import React from "react";
import styled, { css } from "styled-components";
import Navigation from "../../organs/Navigation";

interface IPaddingProps {
  readonly margin?: number | string;
  readonly padding?: number;
}

export const Space = styled.div<IPaddingProps>`
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  ${({ margin }) =>
    margin ? (typeof margin == "number" ? `margin: ${margin}px` : `margin: ${margin}`) : null};
`;

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <Space margin="0 0 70px 0">
      {children}
      <Navigation />
    </Space>
  );
};
