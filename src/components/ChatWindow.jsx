// src/components/ChatWindow.jsx
import React from "react";

export default function ChatWindow({ messages }) {
  return (
    <div style={{
      border: "1px solid #000",
      padding: "1rem",
      height: "300px",
      overflowY: "auto",
      background: "#fafafa"
    }}>
      {messages.map(({ from, text }, i) => (
        <div key={i} style={{ margin: "0.5rem 0" }}>
          <strong>{from}:</strong> {text}
        </div>
      ))}
    </div>
  );
}
