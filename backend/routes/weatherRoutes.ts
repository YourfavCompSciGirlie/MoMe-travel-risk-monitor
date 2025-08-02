import express from "express";
import { getWeatherByCity } from "../utils/WeatherRequest";

const router = express.Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const weatherData = await getWeatherByCity(city);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
