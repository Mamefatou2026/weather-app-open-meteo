import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";

import config from "../config.json";
import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  // Fonction pour changer le système d'unités
  const changeSystem = () =>
    setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");

  // Récupération des données météo depuis l'API
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/data"); // GET sur ton API
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };

    getData();

    // Rafraîchissement toutes les heures (3600000 ms)
    const interval = setInterval(getData, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Affichage écran de chargement si pas de données
  if (!weatherData) return <LoadingScreen loadingMessage="Loading data..." />;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={config.country || "FR"} // depuis config.json ou France par défaut
        description={`Weather code: ${weatherData.weathercode}`}
        iconName={`w${weatherData.weathercode}`}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;
