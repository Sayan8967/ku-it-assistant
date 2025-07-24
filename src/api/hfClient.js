// src/api/hfClient.js
const API_URL = "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased";
const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;

export async function queryLLM(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });
  if (!res.ok) throw new Error("LLM error");
  const [ { generated_text } ] = await res.json();
  return generated_text;
}
