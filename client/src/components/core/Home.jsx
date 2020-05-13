import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import {
  Grid,
  Header,
  Container,
  Form,
  Segment,
  Input,
  Divider,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";
import axios from "axios";

import styled from "styled-components";

//custom imports
import Layout from "../layout/Layout";
import { FloatButton } from "../../common/customizedComponents";
import { smoothSlideDuration, delayDuration } from "../../utils/variables";
import Chatbot from "../chatbot/Chatbot";

const ImageFrame = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

const cookies = new Cookies();
const Home = () => {
  const [info, setInfo] = useState(false);
  const [dfReply, setDfReply] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [isFloatButtonIn, setIsFloatButtonIn] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get("api/auth");
    if (!res.error) setInfo(res.data);

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("api/df_text_query", { text: userInput });

      if (!res.error) {
        setDfReply(res.data.fulfillmentMessages[0].text.text[0]);
        if (res.data.fulfillmentMessages[0].text.text[0] !== res.data.fulfillmentText)
          setInfo(res.data.fulfillmentText);
      }
    } catch (e) {}
  };

  const handleClick = () => {
    setIsFloatButtonIn(false);
    setTimeout(() => {
      setShowBot(true);
      setIsFloatButtonIn(true);
    }, smoothSlideDuration - delayDuration);
  };
  return (
    <Layout title="Home Page" description="Welcome to your disccount shop">
      <Container style={{ marginTop: "2rem" }}>
        <Header as="h1">{info ? info : "loading..."}</Header>

        <Divider />
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={16} tablet={10} computer={12}>
                  <Input
                    style={{ marginTop: "1rem" }}
                    fluid
                    placeholder="Type your question"
                    name="name"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    autoFocus
                    autoComplete="off"
                  />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={6} computer={4}>
                  <Button style={{ marginTop: "1rem" }} fluid color="blue" type="submit">
                    Send
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
        <Message color="blue" style={{ display: dfReply ? "" : "none", fontSize: "1.3rem" }}>
          {dfReply ? dfReply : ""}
        </Message>
        {!showBot && (
          <FloatButton onClick={handleClick} entrance={isFloatButtonIn}>
            <Icon name="talk" size="big" />
          </FloatButton>
        )}

        {showBot && <Chatbot setShowBot={setShowBot} userID={cookies.get("userID")} />}
      </Container>
    </Layout>
  );
};

export default Home;
