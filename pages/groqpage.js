import Groq from "groq-sdk";

export default function GroqPage() {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    async function main() {
        const chatCompletion = await getGroqChatCompletion();
        // Print the completion returned by the LLM.
        console.log(chatCompletion.choices[0]?.message?.content || "");
    }

    async function getGroqChatCompletion() {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of fast language models",
                },
            ],
            model: "llama3-8b-8192",
        });
    }

    return (
        <div>
            <h1>groq page</h1>
        </div>
    )
}