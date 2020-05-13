import React, { Fragment, useEffect } from "react";
import { Comment, Message, Image } from "semantic-ui-react";

import styled from "styled-components";
import chatbotImage from "../../images/lazy.png";
import CardDeck from "./CardDeck";
import QuickReplies from "./QuickReplies";

const MessageUI = styled(Message)`
  max-width: 270px;
  margin: 0.5rem !important;
  margin-left: ${(props) => (props.user === "bot" ? "2rem !important" : "0")};
  padding: 0.6rem 1.5rem !important;
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

const MessageBot = ({ messageList, handleClick }) => {
  useEffect(() => {});
  const buildSingleMessage = (msg, user) => {
    if (user === "human") {
      return (
        <MessageUI compact color="violet">
          <Comment.Text>{msg}</Comment.Text>
        </MessageUI>
      );
    } else {
      return (
        msg &&
        msg.map((m, i) => (
          <Fragment key={i}>
            <MessageUI compact color="blue" user="bot">
              <Comment.Text>{m}</Comment.Text>
            </MessageUI>
            <br />
          </Fragment>
        ))
      );
    }
  };

  let comments =
    messageList &&
    messageList.map(({ user, message, cards, quick_replies }, index) => {
      return (
        <Comment key={index} align={user === "human" ? "right" : "left"}>
          <Comment.Content>
            <Comment.Author>
              {user === "human" ? (
                "You"
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ImageFrame size="mini" style={{ marginRight: ".6rem" }}>
                    <Image size="mini" src={chatbotImage} circular />
                  </ImageFrame>
                  ChatBot
                </div>
              )}
            </Comment.Author>
            {buildSingleMessage(message, user)}
            {cards && <CardDeck cards={cards.listValue.values} />}
            {quick_replies && quick_replies.payload && (
              <QuickReplies quick_replies={quick_replies} handleClick={handleClick} />
            )}
          </Comment.Content>
        </Comment>
      );
    });
  return comments;
};

export default MessageBot;
