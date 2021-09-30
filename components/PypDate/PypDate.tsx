import { isToday } from "date-fns";
import { formatLongDate, formatShortDate, getWeekdayName } from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  type?: "long" | "short";
  showTodayPrefix?: boolean;
};

export default function PypDate({
  className = "",
  date,
  type = "long",
  showTodayPrefix = true,
}: DateProps) {
  const todayPrefix = isToday(date) && showTodayPrefix ? "Hoy " : "";

  if (type === "long") {
    const localLongDateString = formatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {`${todayPrefix}${localLongDateString}`}
      </time>
    );
  }

  const localShortDateString = formatShortDate(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">{`${todayPrefix}${weekdayName}`}</span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
