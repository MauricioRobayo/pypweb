import { Scheme } from "@mauriciorobayo/pyptron";

export const ALL_DAY = "Todo el día";
export const ALL_DIGITS = "Todos";
export const NA = "No aplica";
export const AMERICA_BOGOTA = "America/Bogota";
export const DEFAULT_DAYS_TO_SHOW = 8;

export const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
export const shouldShowAds = isProduction || isPreview;

export function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

export function isNumbersArray(
  numbers: (string | number)[]
): numbers is number[] {
  return numbers.every((num) => typeof num === "number");
}

export function arrayToList(arr: (number | string)[]): string {
  if (arr.length === 0) {
    return "";
  }

  if (arr.length === 1) {
    return arr[0].toLocaleString();
  }

  if (isNumbersArray(arr) && hasAllDigits(arr)) {
    return ALL_DIGITS;
  }

  return `${arr.slice(0, -1).join(", ")} y ${arr[arr.length - 1]}`;
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

export function isPublicLicense(categoryName: string) {
  return /(taxis|público)/i.test(categoryName);
}

export function getSchemeString(scheme: Scheme) {
  return scheme === "first" ? "iniciadas" : "terminadas";
}
