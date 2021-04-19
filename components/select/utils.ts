import cities from "@mauriciorobayo/pyptron";

export type CityOptions = {
  label: string;
  value: string;
}[];

export const cityOptions = (): CityOptions => {
  const pypOptions: { value: string; label: string }[] = [];
  Object.values(cities).forEach(({ name: cityName, slug: citySlug }) => {
    pypOptions.push({ label: cityName, value: citySlug });
  });
  return pypOptions;
};
