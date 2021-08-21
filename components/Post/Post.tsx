import styled from "styled-components";

const StyledPost = styled.div`
  text-align: left;
  img {
    max-width: 100%;
  }
`;

type PostProps = {
  body: string;
};

export function Post({ body }: PostProps) {
  if (!body) {
    return null;
  }

  return <StyledPost dangerouslySetInnerHTML={{ __html: body }} />;
}
