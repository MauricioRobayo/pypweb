import styles from "./date.module.scss";
import {
  dateIsToday,
  getLocalLongDateString,
  getLocalShortDateString,
  getWeekdayName,
} from "./utils";

type DateProps = {
  date: Date | string;
  type?: "long" | "short";
};

export default function PypDate({ date: d, type = "long" }: DateProps) {
  const date = typeof d === "string" ? new Date(d) : d;

  const isToday = dateIsToday(date);

  if (type === "long") {
    const localLongDateString = getLocalLongDateString(date);
    return (
      <time dateTime={date.toISOString()}>
        {isToday ? `Hoy ${localLongDateString}` : localLongDateString}
      </time>
    );
  }

  const localShortDateString = getLocalShortDateString(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time dateTime={date.toISOString()}>
      <span>{isToday ? `Hoy ${weekdayName}` : weekdayName}</span>{" "}
      <span className={styles.small}>{localShortDateString}</span>
    </time>
  );
}

PypDate.defaultProps = {
  type: "long",
};
