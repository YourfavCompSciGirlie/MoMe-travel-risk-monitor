import axios from "axios";
import "dotenv/config";

// Interface for the structured data we want to return from our function
export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  weather: string;
  humidity: number;
  windSpeed: number;
}

// Interface to type the raw, nested response from the OpenWeatherMap API
interface OpenWeatherAPIResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeatherByCity(
  city: string
): Promise<WeatherData | undefined> {
  console.log(`Fetching weather for city: ${city}`);

  if (!API_KEY) {
    console.error(
      "Error: OPENWEATHER_API_KEY is not set in the environment variables."
    );
    return undefined;
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get<OpenWeatherAPIResponse>(endpoint);
    const data = response.data;
    const responseData: WeatherData = {
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
  } catch (error: any) {
    // Handle potential errors, such as a city not being found or network issues
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `Error fetching weather: API returned status ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return undefined;
  }
}
