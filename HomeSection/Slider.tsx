import styled from "styled-components";

export const Slider = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  & > div {
    display: inline-block;
    margin-right: 10px;
    width: 80%;
  }
`;
