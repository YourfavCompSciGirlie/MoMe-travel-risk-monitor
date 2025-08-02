// utils/voiceUtils.ts
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function askGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent("Be direct: " + prompt);
  const response = await result.response;
  return response.text();
}

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt must be a non-empty string.' });
  }

  try {
    const reply = await askGemini(prompt);
    res.json({ text: reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
