import React from "react";
import { AttributeSVG } from "../Attribute";

type ITVProps = {};

const TV: React.FC<ITVProps> = ({ ...props }) => {
  return (
    <AttributeSVG
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="tv"
      className="svg-inline--fa fa-tv fa-w-20"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path
        fill="currentColor"
        d="M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"
      ></path>
    </AttributeSVG>
  );
};

export default TV;
