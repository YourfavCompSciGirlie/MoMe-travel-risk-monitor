import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import askGemini from './GeminiAsk';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Endpoint
app.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt must be a non-empty string.' });
  }

  try {
    const response = await askGemini(prompt);
    res.json({ text: response });
  } catch (error) {
    console.error('Error in askGemini:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
