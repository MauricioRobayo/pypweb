import { ICategoryData } from "@mauriciorobayo/pyptron";

type CategoryDataProps = {
  categoryData: ICategoryData;
};

export default function CategoryInfo({ categoryData }: CategoryDataProps) {
  const { decrees, article } = categoryData;
  const decreesList =
    decrees.length === 0 ? null : (
      <>
        <h4>Decretos</h4>
        <ul>
          {decrees.map(({ url, text }) => (
            <li key={url}>
              <a href={url}>{text}</a>
            </li>
          ))}
        </ul>
      </>
    );

  /* eslint-disable react/no-danger */
  const articleContent =
    article === "" ? null : (
      <div dangerouslySetInnerHTML={{ __html: article }} />
    );
  /* eslint-enable */

  return (
    <section>
      {decreesList}
      {articleContent}
    </section>
  );
}
