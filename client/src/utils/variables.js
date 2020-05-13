export const colorPrimary = "#5A91E8";
export const colorPrimaryLight = "#78A5EC";
export const colorPrimaryLight2 = "#c5dafa";
export const colorPrimaryDark = "#4066A3";

export const colorHeader1 = "#1E2026";
export const colorHeader2 = "#0B0D0F";

export const colorGrey1 = "#333";
export const colorGrey2 = "#606060";
export const colorGrey3 = "#999";
export const colorGrey4 = "#aaa";
export const colorGrey5 = "#bbb";
export const colorGrey6 = "#DFE1E5";
export const colorGrey7 = "#f4f2f2";
export const colorGrey8 = "#faf9f9";

// used in container.js for set the width of the paper
export const minWidth = "30rem";
export const maxWidth = "100rem";

export const smoothScrollDuration = 2000;
/**
 *time in miliseconds
 * @smoothSlideDuration controls the speed of the slideOutDown and slideInUp animations
 * @delayDuration is the timeOut in advance in which the component will unmonunt in regards with the smoothSlideDuration
 * for instance if the smoothSlideDuration is 2000  and the delayDuration 200 the component will unmount at 1800 miliseconds
 * This is a trick to animate the mount and unmount of the components.
 * another ways to do this: react-spring or ReactCSSTransitionGroup
 */
export const smoothSlideDuration = 500;
export const delayDuration = 200;

// media breakpoints
export const sizesUI = {
  wide: 1920,
  large: 1200,
  computer: 992,
  tablet: 768,
  mobile: 600,
  small: 480,
  tiny: 320,
};
