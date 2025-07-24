// src/App.jsx
import React, { useState, useEffect } from "react";
import { queryLLM } from "./api/hfClient";
import QueryInput from "./components/QueryInput";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [msgs, setMsgs] = useState(
    JSON.parse(localStorage.getItem("kuItMsgs")) || []
  );

  useEffect(() => {
    localStorage.setItem("kuItMsgs", JSON.stringify(msgs));
  }, [msgs]);

  const handleAsk = async (text) => {
    setMsgs(m => [...m, { from: "You", text }]);
    try {
      const answer = await queryLLM(text);
      setMsgs(m => [...m, { from: "Assistant", text: answer }]);
    } catch {
      setMsgs(m => [...m, { from: "Assistant", text: "Sorry, couldn’t reach the AI. Try again." }]);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "2rem auto" }}>
      <h2 style={{ color: "#990000" }}>KU IT Knowledge Assistant</h2>
      <ChatWindow messages={msgs} />
      <QueryInput onSubmit={handleAsk} />
    </div>
  );
}
