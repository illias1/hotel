import React from "react";
import styled, { css } from "styled-components";

type IButtonProps = {
  secondary?: boolean;
};

const Button = styled.button<IButtonProps>`
  width: 100%;
  height: 70px;

  cursor: pointer;
  border: none;
  border-radius: 10px;

  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font: inherit;
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;

  filter: drop-shadow(0px 10px 40px rgba(248, 161, 112, 0.2));

  ${(props: IButtonProps) =>
    props.secondary
      ? css`
          background: white;
          color: orange;
        `
      : css`
          background: linear-gradient(91.97deg, #f8a170 14.73%, #ffcd61 97.52%);
          color: white;
        `};
`;

export default Button;
