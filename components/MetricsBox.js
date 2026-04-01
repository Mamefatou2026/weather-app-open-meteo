import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  // Conversion température
  const temp =
    unitSystem === "metric"
      ? weatherData.temperature
      : (weatherData.temperature * 9) / 5 + 32;

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Temperature"}
        iconSrc={"/icons/temperature.png"}
        metric={Math.round(temp)}
        unit={unitSystem === "metric" ? "°C" : "°F"}
      />

      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={weatherData.windspeed}
        unit={"km/h"}
      />

      <MetricsCard
        title={"Weather code"}
        iconSrc={"/icons/cloud.png"}
        metric={weatherData.weathercode}
      />

      <MetricsCard
        title={"Last update"}
        iconSrc={"/icons/clock.png"}
        metric={weatherData.time}
      />
    </div>
  );
};
