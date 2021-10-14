import { Layout } from "components/Layout";
import { Post } from "components/Post";
import { citiesList, CitiesList } from "lib/cities";
import { getPostBySlug } from "lib/posts";
import { InferGetStaticPropsType } from "next";
import { ReactElement } from "react";

function PrivacyPolicy({
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>Política de privacidad</h1>
      <Post mdxSource={mdxSource} />
    </>
  );
}

export const getStaticProps = async () => {
  const { mdxSource } = await getPostBySlug("privacy-policy.md");
  return {
    props: {
      cities: citiesList(),
      mdxSource,
    },
  };
};

PrivacyPolicy.getLayout = function getLayout(
  page: ReactElement,
  props: { cities: CitiesList }
) {
  return (
    <Layout cities={props.cities} showFixedHeader={false}>
      {page}
    </Layout>
  );
};

export default PrivacyPolicy;
