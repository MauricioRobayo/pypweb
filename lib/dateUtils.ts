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

export const formatLongDate = longDateFormatter.format;
export const formatShortDate = shortDateFormatter.format;
export const formatTime = timeFormatter.format;

export function getWeekdayName(date: Date = new Date()): string {
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

export function dateParts(date: Date) {
  const parts = shortDateFormatter.formatToParts(date);
  return Object.fromEntries(
    parts
      .filter(({ type }) => ["year", "month", "day"].includes(type))
      .map(({ type, value }) => [type, Number(value)])
  ) as Record<"year" | "month" | "day", number>;
}
