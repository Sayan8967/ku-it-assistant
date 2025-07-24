export async function handleAsk(prompt) {
  try {
    const response = await queryLLM(prompt);
    // Extract and display the assistant's response
    if (response.choices && response.choices[0]?.message?.content) {
      setResults(response.choices[0].message.content);
    } else {
      setResults(JSON.stringify(response));
    }
  } catch (error) {
    setResults(`Error: ${error.message}`);
  }
}

export async function queryLLM(prompt) {
  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${errorText}`);
  }

  return await response.json();
}