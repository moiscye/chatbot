import React, { useEffect } from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import QuickReply from "./QuickReply";
const buttonColors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "blue",
  "teal",
  "violet",
  "purple",
];

const QuickReplies = ({ quick_replies, handleClick }) => {
  const selectButtonColor = (index) => {
    if (index >= buttonColors.length) return buttonColors[0];
    else return buttonColors[index];
  };
  const buildQuickReplies = () => {
    return (
      quick_replies &&
      quick_replies.payload.listValue.values.map((value, index) => (
        <QuickReply
          handleClick={handleClick}
          reply={value.structValue.fields}
          key={index}
          buttonColor={selectButtonColor(index)}
        />
      ))
    );
  };

  return (
    <Segment textAlign="center" style={{ width: 300 }}>
      <Header as="h4">{quick_replies && quick_replies.text.stringValue}</Header>
      {quick_replies && buildQuickReplies()}
    </Segment>
  );
};

export default QuickReplies;
