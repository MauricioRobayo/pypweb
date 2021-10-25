import { IHourData } from "@mauriciorobayo/pyptron";
import { arrayToList } from "./utils";

type DateParts = Record<"year" | "month" | "day", number>;

const AMERICA_BOGOTA = "America/Bogota";
const longDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
  timeZone: AMERICA_BOGOTA,
});
const shortDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: AMERICA_BOGOTA,
});
const timeFormatter = new Intl.DateTimeFormat("es-CO", {
  timeZone: AMERICA_BOGOTA,
  timeStyle: "long",
});

export function getActiveHoursString(hours: IHourData[], date: Date): string {
  return hours
    .filter((hour) => {
      if (!hour.days) {
        return true;
      }

      const { day } = cotDateParts(date);
      return hour.days.includes(day);
    })
    .map(getHourString)
    .join("; ");
}

export function getHourString(hour: IHourData): string {
  const friendlyHours = hour.hours.map((hour) =>
    hour.map(convert24toAmPm).join(" a ")
  );
  const hoursList = arrayToList(friendlyHours);
  return `${hour.comment || ""} ${hoursList}`.trim();
}

export function convert24toAmPm(hour24: string) {
  if (hour24 === "12:00") return `${hour24}m.`;
  const [hours, minutes] = hour24.split(":");
  const hoursNumber = parseInt(hours, 10);
  if (hoursNumber === 12) return `${hour24}pm`;
  return hoursNumber > 12
    ? `${hoursNumber - 12}:${minutes}pm`
    : `${hoursNumber}:${minutes}am`;
}

/**
 * Colombian time long date format
 */
export const cotFormatLongDate = longDateFormatter.format;

/**
 * Colombian time hour format
 */
export const cotFormatTime = timeFormatter.format;

/**
 * Colombian time short date format
 */
export function cotFormatShortDate(date: Date) {
  const { year, month, day } = cotDateParts(date);
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
}

/**
 * Colombian time weekday name
 */
export function cotGetWeekdayName(date: Date = new Date()): string {
  const parts = longDateFormatter.formatToParts(date);
  const weekdayName = parts.find(
    ({ type }: Intl.DateTimeFormatPart) => type === "weekday"
  ) as Intl.DateTimeFormatPart;
  return weekdayName.value;
}

export function isValidDateString(date: any): date is string {
  return (
    typeof date === "string" &&
    date.length === 10 &&
    !Number.isNaN(Date.parse(date))
  );
}

/**
 * Colombian time year, month, day
 */
export function cotDateParts(date: Date) {
  const parts = shortDateFormatter.formatToParts(date);

  return Object.fromEntries(
    parts
      .filter(({ type }) => ["year", "month", "day"].includes(type))
      .map(({ type, value }) => [type, Number(value)])
  ) as DateParts;
}

/**
 * Colombian time new date from year, month, day
 */
export function cotDateFromParts(parts: DateParts) {
  const { year, month, day } = parts;
  return new Date(Date.UTC(year, month - 1, day, 5));
}

/**
 * Colombian time check if date is today's date
 */
export function cotIsToday(date: Date) {
  const todayDateParts = cotDateParts(new Date());
  const dtParts = cotDateParts(date);
  return (
    todayDateParts.year === dtParts.year &&
    todayDateParts.month === dtParts.month &&
    todayDateParts.day === dtParts.day
  );
}

export function datePartsFromString(date: string): DateParts {
  const [year, month, day] = date.split("-");

  if (Number.isNaN(Date.parse(`${year}-${month}-${day}T00:00:00.000Z`))) {
    throw new Error(`Invalid date string: ${date}`);
  }

  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
  };
}
