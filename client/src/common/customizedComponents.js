import styled from "styled-components";
import { media } from "../utils/mediaQueriesBuilder";
import { Segment } from "semantic-ui-react";
import { slideInUp, slideOutDown, slideOutDownFast } from "../utils/animations";
import { smoothSlideDuration } from "../utils/variables";

export const FloatButton = styled.label`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #52adde;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 8px #999;
  cursor: pointer;
  animation: ${smoothSlideDuration / 1000}s
    ${(props) => (props.entrance ? slideInUp : slideOutDownFast)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatContainer = styled(Segment)`
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15) !important;
  position: fixed !important;
  bottom: 20px;
  right: 30px;
  height: 85vh;
  width: 400px;
  border-radius: 1rem !important;
`;
