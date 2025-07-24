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
    console.log("🧾 User submitted:", text);
    setMsgs(m => [...m, { from: "You", text }]);

    try {
      const answer = await queryLLM(text);
      console.log("🤖 DistilBERT processed:", answer);

      // Extract the assistant's response content
      const assistantResponse = answer.choices?.[0]?.message?.content || JSON.stringify(answer);

      setMsgs(m => [...m, { from: "Assistant", text: assistantResponse }]);
    } catch (err) {
      console.error("❌ Error calling queryLLM:", err);
      setMsgs(m => [...m, { 
        from: "Assistant", 
        text: `Error: ${err.message}. Please check your Hugging Face token and try again.` 
      }]);
    } finally {
      console.log("Updated messages:", msgs);
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