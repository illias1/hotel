import React from "react";
import styled, { css } from "styled-components";
import { Button as AntButton } from 'antd'

type IButtonProps = {
  secondary?: boolean;
  link?: boolean;
};

export const buttonStyles = css`
  width: 100%;
  height: 50px;

  cursor: pointer;
  border: none;
  border-radius: 10px;

  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font: inherit;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;

  filter: drop-shadow(0px 10px 40px rgba(248, 161, 112, 0.2));
`;

const Button = styled(AntButton) <IButtonProps>`
  ${buttonStyles}
  ${({ secondary, link }: IButtonProps) =>
    secondary
      ? css`
          background: white;
          color: orange;
        `
      : link
        ? css`
          color: #1890ff;
          background: transparent;
          height: auto;
          width: auto;
          filter: none;
          text-shadow: none;
          font-weight: 400;
          font-size: 14px;
        `
        : css`
          background: linear-gradient(91.97deg, #f8a170 14.73%, #ffcd61 97.52%);
          color: white;
        `};
`;

export default Button;
