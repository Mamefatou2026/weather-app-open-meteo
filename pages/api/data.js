import config from "../../config.json";

export default async function handler(req, res) {
  try {
    const { city, latitude, longitude } = config;

    // Construire l'URL Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();

    // Renvoyer uniquement les infos utiles
    const current = data.current_weather;

    res.status(200).json({
      city,
      temperature: current.temperature,
      windspeed: current.windspeed,
      weathercode: current.weathercode,
      time: current.time,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de récupérer la météo" });
  }
}
