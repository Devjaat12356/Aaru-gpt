export default function Home() {
    const sendMessage = async () => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Tell me a story' })
        });

        const data = await response.json();
        console.log(data); // Handle your response here
    };

    return (
        <div>
            <h1>Aaru GPT</h1>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}
