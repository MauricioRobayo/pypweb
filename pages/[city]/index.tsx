import {
  getCitiesMap2,
  getCityData2,
  ICityData2,
} from '@mauriciorobayo/pyptron';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import CategoriesList from '../../components/categories-list/categories-list';
import PypDate from '../../components/date/date';
import { getLocalLongDateString } from '../../components/date/utils';
import Layout from '../../components/layout/layout';
import { PypOption } from '../../types';
import { getInfoFromSlug, getPypOptions } from '../../utils/utils';

type CityProps = {
  cityData: ICityData2;
  pypOptions: PypOption[];
};

export default function City({ cityData, pypOptions }: CityProps) {
  const { name: cityName, categories: cityCategories } = cityData;
  const title = `Pico y placa ${cityName}`;

  const header = (
    <header>
      <h1>{title}</h1>
      <h2>
        <PypDate />
      </h2>
    </header>
  );

  const aside = (
    <section>
      <h2>Pico y placa vigente en {cityName}</h2>
      <p>
        Las siguientes son las medidas de restricción vehicular vigentes para{' '}
        {cityName} durante el mes de{' '}
        {getLocalLongDateString().split(' ').slice(3).join(' ')}, de acuerdo con
        lo establecido por la Alcaldía de {cityName}:
      </p>
      <ul>
        {cityCategories.map(({ name: categoryName, path: categoryPath }) => (
          <li key={categoryName}>
            <Link href={categoryPath}>
              <a>{categoryName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <Layout header={header} aside={aside} pypOptions={pypOptions} title={title}>
      <CategoriesList categories={cityData.categories} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const citiesMap = getCitiesMap2();
  return {
    paths: citiesMap.map(({ slug }) => ({ params: { city: slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const citySlug = params?.city as string;
  const { key: cityKey } = getInfoFromSlug(citySlug, getCitiesMap2());
  const cityData = getCityData2(cityKey);
  return {
    props: {
      cityData,
      pypOptions: getPypOptions(),
    },
  };
};
