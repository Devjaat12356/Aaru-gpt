import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;  // Get the user's message from the request

    try {
      const response = [];  // Store bot's responses in an array
      for await (const chunk of inference.chatCompletionStream({
        model: "meta-llama/Llama-3.1-70B-Instruct",  // LLaMA model
        messages: [{ role: "user", content: message }],  // User's input message
        max_tokens: 500,  // Maximum token limit for response
      })) {
        response.push(chunk.choices[0]?.delta?.content || "");  // Append each response chunk
      }

      res.status(200).json({ choices: [{ delta: { content: response.join('') } }] });  // Send the complete response back
    } catch (error) {
      console.error('Error with API call:', error);  // Log errors if any
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });  // Allow only POST method
  }
}
