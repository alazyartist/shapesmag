import React from "react";

const ShapeSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 110"
    width="220"
    height="105"
  >
    <rect
      x="70"
      y="30"
      width="60"
      height="60"
      stroke="yellow"
      strokeWidth="5"
      fill="none"
    />
    <polygon
      points="10,90 50,90 30,38.7"
      stroke="red"
      strokeWidth="5"
      fill="none"
    />
    <circle cx="190" cy="60" r="30" stroke="blue" strokeWidth="5" fill="none" />
  </svg>
);

export default ShapeSVG;
