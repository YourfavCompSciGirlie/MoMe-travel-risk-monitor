declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    OPENWEATHER_API_KEY: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE: string;
    PORT: string;
    JWT_SECRET: string;
    GEMINI_API_KEY: string;
    ELEVENLABS_API_KEY: string;
    VOICE_ID: string;
  }
}
