// services/weather.service.ts

import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoordinates = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await axios.get(url);
  const data = res.data;

  return {
    description: data.weather[0].description,
    weather_code: data.weather[0].id,
    temp: data.main.temp,
    wind_speed: data.wind.speed,
    rain_volume: data.rain?.['1h'] || 0,
    snow_volume: data.snow?.['1h'] || 0
  };
};
