import { Fine } from "components/Fine";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import TweetEmbed from "react-tweet-embed";
import styled from "styled-components";

const Wrapper = styled.div`
  h4 {
    align-items: center;
    display: flex;
    svg {
      margin-left: 0.3em;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    &:hover svg {
      opacity: 1;
      width: 1em;
    }
  }
`;

type PostProps = {
  mdxSource: MDXRemoteSerializeResult;
};

export function Post({ mdxSource }: PostProps) {
  if (!mdxSource) {
    return null;
  }

  return (
    <Wrapper>
      <MDXRemote {...mdxSource} components={{ Image, TweetEmbed }} />
      <Fine />
    </Wrapper>
  );
}
