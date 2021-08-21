import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 4px;
  position: relative;
`;

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

  return (
    <>
      <Wrapper>
        <StyledPost dangerouslySetInnerHTML={{ __html: body }} />
      </Wrapper>
    </>
  );
}
