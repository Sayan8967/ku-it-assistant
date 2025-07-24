// src/components/QueryInput.jsx
import React, { useState } from "react";

export default function QueryInput({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(text); setText(""); }}>
      <input
        type="text"
        value={text}
        placeholder="Ask KU IT anything…"
        onChange={e => setText(e.target.value)}
        style={{ width: "80%", padding: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>Ask</button>
    </form>
  );
}
