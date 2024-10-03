// api/chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions';
        const apiKey = process.env.HUGGINGFACE_API_KEY; // Set your Hugging Face API key as an environment variable

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "mistralai/Mistral-7B-Instruct-v0.3",
                    messages: [{ role: "user", content: message }],
                    temperature: 0.5,
                    max_tokens: 1024,
                    top_p: 0.7,
                    stream: true
                })
            });

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

