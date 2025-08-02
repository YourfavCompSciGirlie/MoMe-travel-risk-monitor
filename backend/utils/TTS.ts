import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Remove this if using Node 18+

const app = express();
const PORT = 3001;

// Hardcoded API credentials — replace these with your actual values
const ELEVENLABS_API_KEY = "sk_5157ef5203dcfe1c5037f3530bb1f28a1c635d9e40a44f59"; // Example: "e38c4cd2bd3f..."
const VOICE_ID = "pNInz6obpgDQGcFmaJgB";
app.use(cors());
app.use(express.json());

interface TTSRequest {
  text: string;
}

app.post('/tts', async (req: Request<{}, {}, TTSRequest>, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString('base64');

    res.json({ audio: `data:audio/mpeg;base64,${base64Audio}` });
  } catch (error: any) {
    console.error('Error calling ElevenLabs TTS:', error);
    res.status(500).json({ error: 'Failed to generate speech audio' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ TTS backend is running at http://localhost:${PORT}`);
});
