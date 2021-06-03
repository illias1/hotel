import styled, { css } from "styled-components";

export type IconProps = {
  active?: boolean;
};

export const StyledIcon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 13px;
  ${(props: IconProps) =>
    props.active
      ? css`
          color: orange;
          background: linear-gradient(
            91.97deg,
            hsla(21.81818181818182, 100%, 82.74509803921568%, 0.2) 14.73%,
            rgba(255, 213, 121, 0.2) 97.52%
          );
          border-radius: 10px;
        `
      : css`
          color: black;
        `}
`;
