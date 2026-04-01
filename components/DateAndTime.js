import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  const date = new Date(weatherData.time);

  const formatted = date.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.wrapper}>
      <h2>{formatted}</h2>
    </div>
  );
};
