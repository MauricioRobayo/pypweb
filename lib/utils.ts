import cities from "@mauriciorobayo/pyptron";

export const ALL_DAY = "Todo el día";
export const ALL_DIGITS = "Todos";
export const NA = "No aplica";

export const isProduction = process.env.NODE_ENV === "production";

export type CityType = keyof typeof cities;

export function isCity(city: any): city is CityType {
  return typeof city === "string" && city in cities;
}

export function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

export function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return NA;
  }

  if (hasAllDigits(numbers)) {
    return ALL_DIGITS;
  }

  return numbers.join("-");
}

export function listFormat(array: string[]) {
  return array
    .reduce((formattedList, listElement, index) => {
      if (index === 0) {
        return listElement.toLowerCase();
      }
      if (index === array.length - 1) {
        return `${formattedList} y ${listElement.toLowerCase()}`;
      }
      return `${formattedList}, ${listElement.toLowerCase()}`;
    }, "")
    .replace(/\.$/, "");
}

export function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return ["taxis", "público"].some((category) =>
    lowerCaseName.includes(category)
  );
}

export const formatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  fractionalSecondDigits: 3,
  hour: "numeric",
  hour12: true,
  minute: "numeric",
  month: "numeric",
  second: "numeric",
  timeZone: "America/Bogota",
  weekday: "long",
  year: "numeric",
});

export const colombianDateParts = (date: Date) => {
  const parts = formatter.formatToParts(date);
  return Object.fromEntries(
    parts
      .filter(({ type }) => ["year", "month", "day"].includes(type))
      .map(({ type, value }) => [type, Number(value)])
  );
};
