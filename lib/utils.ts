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
