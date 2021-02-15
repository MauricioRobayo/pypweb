import Layout from "components/layout/layout";
import Select from "components/select/select";
import Skin from "components/the-moneytizer/skin";
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
    <Layout date={date} home pypOptions={selectOptions}>
      <Select pypOptions={selectOptions} type="main" />
      <Skin />
    </Layout>
  );
}
