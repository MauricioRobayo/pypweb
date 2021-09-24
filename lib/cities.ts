import cities from "@mauriciorobayo/pyptron";

export type CitiesList = {
  label: string;
  value: string;
}[];

export function citiesList(): CitiesList {
  return Object.values(cities).map(({ name: cityName, slug: citySlug }) => ({
    label: cityName,
    value: citySlug,
  }));
}
