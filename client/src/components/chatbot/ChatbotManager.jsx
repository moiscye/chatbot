import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import { Icon, Popup } from "semantic-ui-react";
import styled from "styled-components";

//custom imports

import { smoothSlideDuration, delayDuration } from "../../utils/variables";
import { slideInUp, slideOutDownFast } from "../../utils/animations";

import Chatbot from "./Chatbot";
import { useDidMount } from "../../common/hooks/useDidMount";
const cookies = new Cookies();

const FloatButton = styled.label`
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
const Home = ({ history }) => {
  const didMount = useDidMount();
  const [showBot, setShowBot] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isFloatButtonIn, setIsFloatButtonIn] = useState(true);

  useEffect(() => {
    if (didMount) {
      if (cookies.get("userID") === undefined) {
        cookies.set("userID", uuid(), { path: "/" });
      }
    }
    greetUserInShopPage();
  });

  const greetUserInShopPage = () => {
    if (window.location.pathname === "/shop" && !showWelcomeMessage) {
      showChatbot();
    }
    history.listen(() => {
      if (history.location.pathname === "/shop" && !showWelcomeMessage) {
        showChatbot();
      }
    });
  };

  const showChatbot = () => {
    setIsFloatButtonIn(false);
    setTimeout(() => {
      setShowBot(true);
      setIsFloatButtonIn(true);
    }, smoothSlideDuration - delayDuration);
  };

  return (
    <>
      {!showBot && (
        <Popup
          trigger={
            <FloatButton onClick={showChatbot} entrance={isFloatButtonIn}>
              <Icon name="talk" size="big" />{" "}
            </FloatButton>
          }
          header="Hello, I'm a Chatbot."
          content="Click if you need help or recommendations!"
          position="top right"
          size="large"
        />
      )}

      {showBot && (
        <Chatbot
          setShowWelcomeMessage={setShowWelcomeMessage}
          showWelcomeMessage={showWelcomeMessage}
          setShowBot={setShowBot}
          userID={cookies.get("userID")}
        />
      )}
    </>
  );
};

export default withRouter(Home);
