import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';
import Date from '../components/date/date';
import { getPypOptions } from '../utils/utils';
import styles from './index.module.scss';

export const getStaticProps = async () => {
  return {
    props: {
      selectOptions: getPypOptions(),
    },
  };
};

export default function Home({
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const header = (
    <header>
      <h1 className={styles.title}>Pico y placa hoy</h1>
      <h2>
        <Date />
      </h2>
    </header>
  );

  return (
    <Layout home header={header} pypOptions={selectOptions}>
      <Select pypOptions={selectOptions} type="main" />
    </Layout>
  );
}
