import React from "react";
import { Button } from "semantic-ui-react";

const QuickReply = ({ reply, handleClick, buttonColor }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (reply.link) {
      handleClick(event, reply.link.stringValue, reply.text.stringValue);
      window.open(reply.link.stringValue, "_blank");
    } else {
      handleClick(event, reply.payload.stringValue, reply.text.stringValue);
    }
  };
  return (
    <Button
      color={buttonColor}
      circular
      onClick={(event) => handleSubmit(event)}
      style={{ marginBottom: 5 }}
    >
      {reply.text.stringValue}
    </Button>
  );
};

export default QuickReply;
