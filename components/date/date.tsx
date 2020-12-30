import styles from "./date.module.scss";
import {
  dateIsToday,
  getLocalLongDateString,
  getLocalShortDateString,
  getWeekdayName,
} from "./utils";

type DateProps = {
  date?: Date | string;
  type?: "long" | "short";
};

export default function PypDate({
  date = new Date(),
  type = "long",
}: DateProps) {
  const currentDate = new Date(date);

  const currentDateISOString = currentDate.toISOString();

  const isToday = dateIsToday(date);

  if (type === "long") {
    const localLongDateString = getLocalLongDateString(currentDate);
    return (
      <time dateTime={currentDateISOString}>
        {isToday ? `Hoy ${localLongDateString}` : localLongDateString}
      </time>
    );
  }

  const localShortDateString = getLocalShortDateString(currentDate);
  const weekdayName = getWeekdayName(currentDate);
  return (
    <time dateTime={currentDateISOString}>
      <span>{isToday ? `Hoy ${weekdayName}` : weekdayName}</span>{" "}
      <span className={styles.small}>{localShortDateString}</span>
    </time>
  );
}

PypDate.defaultProps = {
  date: new Date(),
  type: "long",
};
