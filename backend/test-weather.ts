import dotenv from 'dotenv';
dotenv.config();

import { getWeatherByCoordinates } from './services/weather.service.ts';

(async () => {
  try {
    const lat = -33.918861;
    const lon = 18.4233;

    const weather = await getWeatherByCoordinates(lat, lon);
    console.log('🌦️ Live Weather Data:', weather);
  } catch (err: any) {
    console.error('❌ Weather API call failed:', err.message);
  }
})();
