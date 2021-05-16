import styled, { css } from "styled-components";

interface IPaddingProps {
  readonly margin?: number | string;
  readonly padding?: number;
}

export const Space = styled.div<IPaddingProps>`
  padding: ${({ padding }) => (padding ? `${padding}px` : 0)};
  margin: ${({ margin }) => (margin ? typeof margin == "number" ? `${margin}px` : margin : 0)};
`;
