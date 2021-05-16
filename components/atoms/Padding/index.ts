import styled, { css } from "styled-components";

interface IPaddingProps {
  readonly v: number;
}

export const Padding = styled.div`
  ${({ v }) =>
    css`
      padding: v ? v : 18px;
    `};
`;
