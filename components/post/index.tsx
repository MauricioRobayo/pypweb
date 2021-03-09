import styled from "styled-components";

const StyledPost = styled.div`
  img {
    max-width: 100%;
  }
`;

type PostProps = {
  body: string;
};

export default function Post({ body }: PostProps) {
  if (!body) {
    return null;
  }
  /* eslint-disable react/no-danger */
  return <StyledPost dangerouslySetInnerHTML={{ __html: body }} />;
  /* eslint-enable */
}
