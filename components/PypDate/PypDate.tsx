import { isToday } from "date-fns";
import { formatLongDate, formatShortDate, getWeekdayName } from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  type?: "long" | "short";
  showTodaysPrefix?: boolean;
};

export default function PypDate({
  className = "",
  date,
  type = "long",
  showTodaysPrefix = true,
}: DateProps) {
  const todaysPrefix = isToday(date) && showTodaysPrefix ? "Hoy " : "";

  if (type === "long") {
    const localLongDateString = formatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {`${todaysPrefix}${localLongDateString}`}
      </time>
    );
  }

  const localShortDateString = formatShortDate(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">{`${todaysPrefix}${weekdayName}`}</span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
