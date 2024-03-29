const dateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
} as const;

const formatter = new Intl.DateTimeFormat("es-CO", dateTimeFormatOptions);

export function getDateFormattedParts(
  date: Date = new Date()
): Intl.DateTimeFormatPart[] {
  return formatter.formatToParts(date);
}

export function getWeekdayName(date: Date = new Date()): string {
  const parts = getDateFormattedParts(date);
  const weekdayName = parts.find(
    ({ type }: Intl.DateTimeFormatPart) => type === "weekday"
  ) as Intl.DateTimeFormatPart;
  return weekdayName.value;
}

export function getLocalLongDateString(date: Date = new Date()): string {
  return formatter.format(date);
}

export function getLocalShortDateString(date: Date = new Date()): string {
  const shortDateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  } as const;
  const f = new Intl.DateTimeFormat("es-CO", shortDateTimeFormatOptions);
  return f.format(date);
}

export function isValidDateString(date: any): date is string {
  return typeof date === "string" && !Number.isNaN(new Date(date));
}
