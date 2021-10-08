import {
  cotFormatLongDate,
  cotFormatShortDate,
  cotGetWeekdayName,
  cotIsToday,
} from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  style?: "long" | "short";
  showTodaysPrefix?: boolean;
};

export default function PypDate({
  className = "",
  date,
  style = "long",
  showTodaysPrefix = true,
}: DateProps) {
  const todaysPrefix = cotIsToday(date) && showTodaysPrefix ? "Hoy " : "";

  if (style === "long") {
    const localLongDateString = cotFormatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {`${todaysPrefix}${localLongDateString}`}
      </time>
    );
  }

  const localShortDateString = cotFormatShortDate(date);
  const weekdayName = cotGetWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">{`${todaysPrefix}${weekdayName}`}</span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
