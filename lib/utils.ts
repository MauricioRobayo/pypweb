export const ALL_DAY = "Todo el día";
export const ALL_DIGITS = "Todos";
export const NA = "No aplica";
export const AMERICA_BOGOTA = "America/Bogota";

export const isProduction = process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";
export const isStaging = process.env.NEXT_PUBLIC_DEPLOY_ENV === "staging";
export const shouldShowAds = isProduction || isStaging;

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
  const lowerCaseName = categoryName.toLowerCase();
  return ["taxis", "público"].some((category) =>
    lowerCaseName.includes(category)
  );
}
