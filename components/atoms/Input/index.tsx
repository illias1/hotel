import React from "react";
import styled, { css } from "styled-components";

type IInputProps = {};

export const inputStyles = css`
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  /* gray */

  color: #999999;

  border-radius: 3px;
  border: none;
  background: #dfdede;
  border-radius: 10px;

  width: 60%;
  padding: 14px;
`;

const Input = styled.input`
  ${inputStyles}
`;

export default Input;
