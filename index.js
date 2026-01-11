import { Client, GatewayIntentBits } from "discord.js";
import Groq from "groq-sdk";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

client.once("ready", () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith("!prompt")) return;

  const userPrompt = message.content.replace("!prompt", "").trim();
  if (!userPrompt) {
    return message.reply("Prompt yazmadın.");
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are an image prompt generator. Your task is to output a single, detailed, comma-separated image prompt. Do not explain anything. Do not include warnings, opinions, or meta commentary. Do not ask questions. Write in a realistic, photographic style. Focus on scene description, pose, clothing state, lighting, camera perspective, and visual realism. Output ONLY the prompt text.",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    await message.reply(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    await message.reply("Bir hata oluştu.");
  }
});

client.login(process.env.DISCORD_TOKEN);
