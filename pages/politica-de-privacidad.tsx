import { Layout } from "components/Layout";
import { citiesList, CitiesList } from "lib/cities";
import { getPostBySlug } from "lib/posts";
import { GetStaticProps } from "next";
import { ReactElement } from "react";

function PrivacyPolicy() {
  return <div>Hello world!</div>;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const mdxSource = await getPostBySlug("privacy-policy");

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
  return <Layout cities={props.cities}>{page}</Layout>;
};

export default PrivacyPolicy;
