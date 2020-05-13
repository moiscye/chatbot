import { keyframes } from "styled-components";
/**from css animations at animate.css */
export const slideInUp = keyframes`
from {
 transform: translate3d(0, 140%, 0);
 visibility: visible;
}

to {
 transform: translate3d(0, 0, 0);
}
`;

export const slideOutDown = keyframes`
from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 140%, 0);
  }
`;

export const slideOutDownFast = keyframes`
from {
    transform: translate3d(0, 0, 0);
  }

to{
    visibility: hidden;
    transform: translate3d(0, 200%, 0);
  }
`;
