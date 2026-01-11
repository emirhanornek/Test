import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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"
});

const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
        {
            role: "system",
            content: "You are an image prompt generator. Your task is to output a single, detailed, comma-separated image prompt. Do not explain anything. Do not include warnings, opinions, or meta commentary. Do not ask questions. Write in a realistic, photographic style. Focus on scene description, pose, clothing state, lighting, camera perspective, and visual realism. Output ONLY the prompt text."
        },
        {
            role: "user",
            content: "Write a realistic, candid bedroom selfie style image prompt. Young adult woman, naked, intimate morning atmosphere. Smartphone front camera perspective. Natural light, unposed, raw photo feeling."
        }
    ]
});

console.log(completion.choices[0].message.content);
