import Layout from "components/layout/layout";
import Select from "components/select/select";
import { getPypOptions } from "lib/utils";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => ({
  props: {
    currentDate: Date.now(),
    selectOptions: getPypOptions(),
  },
});

export default function Home({
  currentDate,
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date(currentDate);
  return (
    <Layout date={date} isHome pypOptions={selectOptions}>
      <Select pypOptions={selectOptions} type="main" />
    </Layout>
  );
}
