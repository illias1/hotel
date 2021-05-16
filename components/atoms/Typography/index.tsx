import styled from "styled-components";

export const H1 = styled.h1``;
export const H2 = styled.h2``;
export const H3 = styled.h3``;
export const H4 = styled.h4`
  font-size: 22px;
`;
export const H5 = styled.h5``;
export const Paragraph = styled.p``;
export const Label = styled.label``;

interface ILI {
  before?: any;
}

export const LI = styled.li<ILI>`
  list-style: none;
  font-size: 14px;
`;
