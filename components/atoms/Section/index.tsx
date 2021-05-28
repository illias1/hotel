import styled, { css } from "styled-components";

export const Section = styled.div`
  padding: 30px 18px;
`;
export const Center = styled.div`
  justify-content: center;
  display: flex;
`;

interface IFlexProps {
  align?: "center";
}
export const Flex = styled.div<IFlexProps>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => align || "baseline"};
  width: 100%;
`;
