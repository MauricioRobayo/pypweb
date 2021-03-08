type PostProps = {
  body: string;
};

export default function Post({ body }: PostProps) {
  if (!body) {
    return null;
  }
  /* eslint-disable react/no-danger */
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
  /* eslint-enable */
}
