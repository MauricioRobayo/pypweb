const dateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  timeZone: "America/Bogota",
  weekday: "long",
  year: "numeric",
};

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
    timeZone: "America/Bogota",
    year: "numeric",
  };
  const f = new Intl.DateTimeFormat("es-CO", shortDateTimeFormatOptions);
  return f.format(date);
}

export function isSameDate(date1: Date | string, date2: Date | string) {
  const currentDate1 = new Date(date1);
  const currentDate2 = new Date(date2);
  const sameDate = currentDate1.getDate() === currentDate2.getDate();
  const sameMonth = currentDate1.getMonth() === currentDate2.getMonth();
  const sameYear = currentDate1.getFullYear() === currentDate2.getFullYear();

  return sameDate && sameMonth && sameYear;
}

export function dateIsToday(date: Date | string): boolean {
  return isSameDate(date, new Date());
}

export function isValidDateString(date: any): date is string {
  return typeof date === "string" && !Number.isNaN(new Date(date));
}
