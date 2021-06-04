import React from "react";
import styled from "styled-components";

export const SvgContainer = styled.div`
  width: 50px;
  height: 50px;
  padding: 0px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledSvg = styled.svg`
  appearance: none;
  display: inline-block;
  border: medium none;
  outline: currentcolor none medium;
  width: 10px;
  color: rgb(34, 34, 34);
  touch-action: manipulation;
  position: relative;
  background: transparent none repeat scroll 0% 0%;
  transition: -ms-transform 0.25s ease 0s, transform 0.25s ease 0s, transform 0.25s ease 0s;
`;

const LeftChevronIcon: React.FC = ({}) => {
  return (
    <SvgContainer>
      <StyledSvg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-left"
        className="svg-inline--fa fa-chevron-left fa-w-10"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
        ></path>
      </StyledSvg>
    </SvgContainer>
  );
};

export default LeftChevronIcon;
