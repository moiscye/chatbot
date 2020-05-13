import { css } from "styled-components";
import { sizesUI } from "./variables";

// iterate through the sizes and create a media template
export const media = Object.keys(sizesUI).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${sizesUI[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
