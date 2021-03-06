import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/core/Home";
import Shop from "./components/shop/Shop";
import ChatbotManager from "./components/chatbot/ChatbotManager";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/chatbot" exact component={Home} />
          <ChatbotManager />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
