import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 22px;
`;
export const H2 = styled.h2``;
export const H3 = styled.h3`
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
`;
export const H4 = styled.h4`
  font-size: 22px;
`;
export const H5 = styled.h5`
  font-size: 18px;
`;
export const Paragraph = styled.p``;

export const SmallText = styled.p`
  font-size: 12px;
  line-height: 16px;
`;

export const Label = styled.label`
  border-bottom: 1px solid black;
  color: rgb(113, 113, 113);
`;

interface ILI {
  before?: any;
}

export const LI = styled.li<ILI>`
  list-style: none;
  font-size: 14px;
`;
