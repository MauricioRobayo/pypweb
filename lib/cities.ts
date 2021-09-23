import type { CityType } from "@mauriciorobayo/pyptron";
import cities from "@mauriciorobayo/pyptron";

export type CityOptions = {
  label: string;
  value: string;
}[];

export function citiesList(): CityOptions {
  return Object.values(cities).map(({ name: cityName, slug: citySlug }) => ({
    label: cityName,
    value: citySlug,
  }));
}

export function isCity(city: any): city is CityType {
  return typeof city === "string" && city in cities;
}
