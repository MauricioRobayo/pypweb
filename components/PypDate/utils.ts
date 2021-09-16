const longDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
});
const shortDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export const getLocalLongDateString = longDateFormatter.format;
export const getLocalShortDateString = shortDateFormatter.format;

export function getWeekdayName(date: Date = new Date()): string {
  const parts = longDateFormatter.formatToParts(date);
  const weekdayName = parts.find(
    ({ type }: Intl.DateTimeFormatPart) => type === "weekday"
  ) as Intl.DateTimeFormatPart;
  return weekdayName.value;
}

export function isValidDateString(date: any): date is string {
  return typeof date === "string" && !Number.isNaN(new Date(date));
}
