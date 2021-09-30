import { isToday } from "date-fns";
import { formatLongDate, formatShortDate, getWeekdayName } from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  type?: "long" | "short";
};

export default function PypDate({
  className = "",
  date,
  type = "long",
}: DateProps) {
  if (type === "long") {
    const localLongDateString = formatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {isToday(date) ? `Hoy ${localLongDateString}` : localLongDateString}
      </time>
    );
  }

  const localShortDateString = formatShortDate(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">
        {isToday(date) ? `Hoy ${weekdayName}` : weekdayName}
      </span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
