const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messages } = req.body;

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions', {
        method: 'POST',
        headers: {
          "Authorization": "Bearer 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",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.3",
          messages,
          temperature: 0.5,
          max_tokens: 1024,
          top_p: 0.7,
          stream: true
        })
      });

      // Log the raw response text for debugging
      const textResponse = await response.text();
      console.log("Raw response:", textResponse);

      // Try to parse the response as JSON
      const data = JSON.parse(textResponse);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching from the API:", error);
      res.status(500).json({ error: 'Error fetching from the API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
