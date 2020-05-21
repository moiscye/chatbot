import React, { useState, useEffect } from "react";

import axios from "axios";

import { Comment, Form, Header, Input, Icon, Image, Segment } from "semantic-ui-react";
import styled from "styled-components";
import chatbotImage from "../../images/lazy.png";
import { slideInUp, slideOutDown } from "../../utils/animations";
import { smoothSlideDuration, delayDuration } from "../../utils/variables";
import { useDidMount } from "../../common/hooks/useDidMount";
import useFocus from "../../common/hooks/useFocus";

import MessageBot from "./MessageBot";

/**
 * Styling elements with styled-components
 * Semantic UI modified elements' name will end with 'UI'
 */

const Wrapper = styled.div`
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.3) !important;
  z-index: 10000;
  position: fixed !important;
  bottom: 40px;
  right: 40px;
  transition: all 3s;
  animation: ${smoothSlideDuration / 1000}s
    ${(props) => (props.isClosing ? slideOutDown : slideInUp)};
`;

const ImageFrame = styled.div`
  height: ${(props) => (props.size === "mini" ? "2rem" : "5rem")};
  width: ${(props) => (props.size === "mini" ? "2rem" : "5rem")};
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const CircleDot = styled.div`
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
  background-color: rgb(105, 222, 64);
  position: absolute;
  right: 3px;
  bottom: 5px;
  z-index: 10;
`;

const SegmentHeader = styled(Segment)`
  height: 10vh;
  width: 400px !important;
  padding: 4rem 2rem !important;
  display: flex;
  align-items: center;
`;
const SegmentBody = styled(Segment)`
  height: 60vh;
  overflow-y: auto;
  padding: 1rem 3rem !important;
`;

const CloseFrame = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
`;

const Chatbot = ({ setShowBot, userID, setShowWelcomeMessage, showWelcomeMessage }) => {
  let scrollToLastMessage;

  const didMount = useDidMount();
  const [inputRef, setInputFocus] = useFocus();
  const [userInput, setUserInput] = useState("Recommend");
  const [messageList, setMessageList] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (didMount) {
      scrollToLastMessage.scrollIntoView({ behaviour: "smooth" });
    } else {
      df_event_query("WELCOME");
      greetUserInShopPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList]);

  const greetUserInShopPage = async () => {
    await pauseForXSeconds(1.5);
    if (window.location.pathname === "/shop" && !showWelcomeMessage) {
      df_event_query("SHOW_RECOMMENDATIONS");
      setShowWelcomeMessage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput === "") return;
    let says = { user: "human", message: userInput };
    setMessageList((prev) => [...prev, says]);
    setUserInput("");
    setInputFocus();
    df_text_query(userInput);
  };
  const pauseForXSeconds = (x = 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, x * 1000);
    });
  };

  const df_text_query = async (text) => {
    try {
      const res = await axios.post("api/df_text_query", { text, userID });
      assignDataToMessageList(res.data.fulfillmentMessages);
    } catch (e) {}
  };

  const df_event_query = async (event) => {
    try {
      const res = await axios.post("api/df_event_query", { event, userID });
      assignDataToMessageList(res.data.fulfillmentMessages);
    } catch (e) {}
  };

  const assignDataToMessageList = (data) => {
    let messages = [];
    let cards;
    let quick_replies = {};
    for (let msg of data) {
      if (msg.text && msg.text.text) messages.push(msg.text.text[0]);
      if (msg.payload && msg.payload.fields && msg.payload.fields.cards)
        cards = msg.payload.fields.cards;
      if (msg.payload && msg.payload.fields && msg.payload.fields.quick_replies)
        quick_replies = {
          ...quick_replies,
          payload: msg.payload.fields.quick_replies,
          text: msg.payload.fields.text,
        };
    }

    let says = { user: "bot", message: messages, cards, quick_replies };
    setMessageList((prev) => [...prev, says]);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBot(false);
    }, smoothSlideDuration - delayDuration);
  };

  const buildMessages = () => (
    <MessageBot messageList={messageList} handleClick={handleClickReplyPayload} />
  );

  const scrollableDiv = () => (
    <div
      ref={(el) => {
        scrollToLastMessage = el;
      }}
      style={{ float: "left", clear: "both" }}
    ></div>
  );

  const handleClickReplyPayload = (event, payload, text) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(payload);

    //Deleting the last quick_reply to avoid duplicates different anwsers
    if (messageList[messageList.length - 1] && messageList[messageList.length - 1].quick_replies)
      messageList[messageList.length - 1].quick_replies = null;
    //this if  handles the link event. We just send a confirmation text to keep the conversation
    if (text === "more info") {
      return df_text_query("Excellent");
    }
    switch (payload) {
      case "training_masterclass":
        df_event_query("MASTERCLASS");
        break;
      case "recommend_yes":
        df_event_query("SHOW_RECOMMENDATIONS");
        break;
      default:
        df_text_query(text);
        break;
    }
  };

  return (
    <Wrapper isClosing={isClosing}>
      <SegmentHeader attached="top" style={{}}>
        <ImageFrame>
          <CircleDot />
          <Image src={chatbotImage} circular />
        </ImageFrame>
        <Header as="h1" style={{ marginLeft: "2rem", marginTop: ".5rem" }}>
          ChatBot
          <Header.Subheader style={{ marginTop: ".3rem" }}>Online</Header.Subheader>
        </Header>
        <CloseFrame onClick={handleClose}>
          <Icon color="grey" name="close" size="large" />
        </CloseFrame>
      </SegmentHeader>
      <SegmentBody attached secondary>
        <Comment.Group>
          {buildMessages()}
          {scrollableDiv()}
        </Comment.Group>
      </SegmentBody>
      <Segment attached>
        <Form onSubmit={handleSubmit}>
          <Input
            name="userInput"
            value={userInput}
            transparent
            fluid
            size="large"
            placeholder="Type your message here"
            autoComplete="off"
            onChange={(event) => setUserInput(event.target.value)}
            icon={<Icon name="send" link onClick={handleSubmit} />}
            autoFocus
            ref={inputRef}
          ></Input>
        </Form>
      </Segment>
      <Segment style={{ padding: ".5rem" }} textAlign="center" attached="bottom" secondary>
        Powered by @NodeJS Recommend
      </Segment>
    </Wrapper>
  );
};

export default Chatbot;
