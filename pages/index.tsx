import Layout from "components/layout";
import Select from "components/select";
import { cityOptions } from "components/select/utils";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => ({
  props: {
    currentDate: Date.now(),
    selectOptions: cityOptions(),
  },
});

export default function Home({
  currentDate,
  selectOptions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const date = new Date(currentDate);
  return (
    <Layout date={date} isHome selectOptions={selectOptions}>
      <Select name="ciudad" options={selectOptions} placeholder="Ciudad" />
    </Layout>
  );
}
