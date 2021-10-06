import cities from "@mauriciorobayo/pyptron";

export type CitiesList = {
  name: string;
  slug: string;
  categories: {
    name: string;
    slug: string;
  }[];
}[];

export function citiesList(): CitiesList {
  return Object.values(cities).map(({ name, slug, categories }) => ({
    name,
    slug,
    categories: Object.values(categories).map(({ name, slug }) => ({
      name,
      slug,
    })),
  }));
}
