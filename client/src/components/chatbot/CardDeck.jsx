import React from "react";
import { Card, Segment } from "semantic-ui-react";
import CardBot from "./CardBot";

const CardDeck = ({ cards }) => (
  <Segment
    style={{
      height: 325,
      width: 320,
      overflow: "hidden",
      position: "relative",
      padding: 1,
    }}
  >
    <div style={{ height: 320, padding: 8, overflowX: "auto", marginLeft: 10 }}>
      <div style={{ width: 400, overflow: "hidden" }}>
        <Card.Group itemsPerRow={cards.length}>
          {cards && cards.map((v, i) => <CardBot key={i} values={v.structValue} />)}
        </Card.Group>
      </div>
    </div>
  </Segment>
);

export default CardDeck;
