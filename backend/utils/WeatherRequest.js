import fetch from "node-fetch";
import "dotenv/config";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeatherByCity(city) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `API returned status ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    const responseData = {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      weather: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    return responseData;

    // console.log(`Weather in ${data.name}:`);
    // console.log(`Temperature: ${data.main.temp}°C`);
    // console.log(`Feels like: ${data.main.feels_like}°C`);
    // console.log(`Weather: ${data.weather[0].description}`);
    // console.log(`Humidity: ${data.main.humidity}%`);
    // console.log(`Wind Speed: ${data.wind.speed} m/s`);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}
