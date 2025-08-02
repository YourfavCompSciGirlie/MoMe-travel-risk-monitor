import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Use global `fetch` if on Node 18+

const app = express();
const PORT = 3001;

// Replace with your actual API key and voice ID
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'sk_a643c828950177f2fe2d2d0b5ee718479eab034c462ef3a9';
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Default voice

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
  console.log(`TTS backend listening on port ${PORT}`);
});
