import {
  cotFormatLongDate,
  cotFormatShortDate,
  cotGetWeekdayName,
} from "lib/dateUtils";

type DateProps = {
  className?: string;
  date: Date;
  style?: "long" | "short";
  prefix?: string;
};

export default function PypDate({
  className = "",
  date,
  style = "long",
  prefix = "",
}: DateProps) {
  if (style === "long") {
    const localLongDateString = cotFormatLongDate(date);
    return (
      <time className={className} dateTime={date.toISOString()}>
        {`${prefix}${localLongDateString}`}
      </time>
    );
  }

  const localShortDateString = cotFormatShortDate(date);
  const weekdayName = cotGetWeekdayName(date);
  return (
    <time className={className} dateTime={date.toISOString()}>
      <span className="day">{`${prefix}${weekdayName}`}</span>{" "}
      <span className="date">{localShortDateString}</span>
    </time>
  );
}
