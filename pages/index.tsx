import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout/layout';
import Select from '../components/select/select';
import { getPypOptions } from '../utils/utils';

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
  return (
    <Layout home pypOptions={selectOptions}>
      <Select pypOptions={selectOptions} type="main" />
    </Layout>
  );
}
