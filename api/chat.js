import { HfInference } from "@huggingface/inference";

const hfToken = process.env.HUGGINGFACE_API_KEY;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        const inference = new HfInference(hfToken);

        try {
            const chatResponse = await inference.chatCompletion({
                model: 'meta-llama/Llama-2-70b-chat',
                messages: [{ role: 'user', content: message }],
                max_tokens: 500
            });

            // Send back the bot's response
            res.status(200).json(chatResponse);
        } catch (error) {
            console.error('Error in fetching chat completion:', error);
            res.status(500).json({ error: 'Error fetching chat response' });
        }
    } else {
        res.status(405).end(); // Method not allowed
    }
}
