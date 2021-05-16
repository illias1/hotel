import React from "react";
import styled, { css } from "styled-components";

interface IPaddingProps {
  readonly margin?: number | string;
  readonly padding?: number;
}

export const Space = styled.div<IPaddingProps>`
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  margin: ${({ margin }) => (margin ? (typeof margin == "number" ? `${margin}px` : margin) : 0)};
`;

export const PageWrapper: React.FC = ({ children }) => {
  return <Space margin="0 0 70px 0">{children}</Space>;
};
