import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = 8080;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get("/", function (request, response) {
  response.json("Ouch, you've hit my roots! Move along por favor!");
});

app.post("/chat", async function (request, response) {
  const prompt = request.body.prompt;

  if (!prompt) {
    return response.json("No prompt given.");
  }

  try {
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a very helpful assistant. You only speak in Pirate English. Start off with a Piratey hello and then answer in Pirate English. Be funny or atleast try to be funny",
      },
    });

    return response.json(geminiResponse.text);
  } catch (err) {
    console.error("Gemini error:", err);
    return response.status(500).json("Gemini request failed.");
  }
});

app.listen(PORT, function () {
  console.log(`I'm running on ${PORT}`);
});
