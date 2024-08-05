import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
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
