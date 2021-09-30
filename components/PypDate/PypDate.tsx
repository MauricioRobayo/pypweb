import { isToday } from "date-fns";
import { formatLongDate, formatShortDate, getWeekdayName } from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  type?: "long" | "short";
  shouldHighlightToday?: boolean;
};

export default function PypDate({
  className = "",
  date,
  type = "long",
  shouldHighlightToday = true,
}: DateProps) {
  const prefix = isToday(date) && shouldHighlightToday ? "Hoy " : "";

  if (type === "long") {
    const localLongDateString = formatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {`${prefix}${localLongDateString}`}
      </time>
    );
  }

  const localShortDateString = formatShortDate(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">{`${prefix}${weekdayName}`}</span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
