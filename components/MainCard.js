import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
}) => {
  // Conversion si besoin
  const temp =
    unitSystem === "metric"
      ? weatherData.temperature
      : (weatherData.temperature * 9) / 5 + 32;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>

      <p className={styles.description}>{description}</p>

      <Image
        width={300}
        height={300}
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />

      <h1 className={styles.temperature}>
        {Math.round(temp)}°{unitSystem === "metric" ? "C" : "F"}
      </h1>

      <p>Vent : {weatherData.windspeed} km/h</p>
    </div>
  );
};
