import React from "react";

import { Container, Header } from "semantic-ui-react";

//custom imports
import Layout from "../layout/Layout";

const Home = () => {
  return (
    <Layout title="Home Page" description="Welcome to your disccount shop">
      <Container style={{ marginTop: "2rem" }} textAlign="center">
        <Header as="h1" color="teal">
          This is the Home screen of the chatbot
        </Header>
      </Container>
    </Layout>
  );
};

export default Home;
