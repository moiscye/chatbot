import React from "react";
import { Card, Image, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CardBot = ({ values }) => (
  <Card style={{ marginLeft: 3 }}>
    <Card.Content>
      <Image src={values.fields.image.stringValue} size="small" />
      <Header as="h5">{values && values.fields.header.stringValue.substring(0, 20)}...</Header>
      <Card.Description>{`AU$${values.fields.price.stringValue}`}</Card.Description>
    </Card.Content>
    <Card.Content textAlign="center" extra>
      <a target="_blank" rel="noopener" href={values.fields.link.stringValue}>
        <Icon name="search plus" />
        See More
      </a>
    </Card.Content>
  </Card>
);

export default CardBot;
