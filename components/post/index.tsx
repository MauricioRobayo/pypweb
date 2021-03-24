import styled from "styled-components";

const StyledPost = styled.div`
  max-width: 720px;
  text-align: left;
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

  return <StyledPost dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
}
