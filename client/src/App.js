import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [info, setInfo] = useState(false);
  const [dfReply, setDfReply] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get("api/auth");
    if (!res.error) setInfo(res.data);
  };

  const handleSubmit = async event => {
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
  return (
    <div className="App">
      <header className="App-header">
        {info ? info : "loading..."}

        <form onSubmit={handleSubmit}>
          <input
            value={userInput}
            autoComplete="off"
            type="text"
            name="userText"
            placeholder="Type to start"
            onChange={event => setUserInput(event.target.value)}
            autoFocus
          />
          <br />
          <label style={{ fontSize: 20 }}>{dfReply ? dfReply : ""}</label>
        </form>
      </header>
    </div>
  );
}

export default App;
