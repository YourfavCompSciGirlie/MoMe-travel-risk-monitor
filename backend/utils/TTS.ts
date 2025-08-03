import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Remove this if using Node 18+
import "dotenv/config";

const app = express();
const PORT = 3001;

// Hardcoded API credentials — replace these with your actual values
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY; // Example: "e38c4cd2bd3f..."
const VOICE_ID = process.env.VOICE_ID;
app.use(cors());
app.use(express.json());

interface TTSRequest {
  text: string;
}

app.post("/tts", async (req: Request<{}, {}, TTSRequest>, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    if (!ELEVENLABS_API_KEY) {
      console.error("ElevenLabs API key is not set in environment variables.");
      throw new Error("TTS service is not configured.");
    }

    const { default: fetch } = await import("node-fetch");

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    res.json({ audio: `data:audio/mpeg;base64,${base64Audio}` });
  } catch (error: any) {
    console.error("Error calling ElevenLabs TTS:", error);
    res.status(500).json({ error: "Failed to generate speech audio" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ TTS backend is running at http://localhost:${PORT}`);
});
