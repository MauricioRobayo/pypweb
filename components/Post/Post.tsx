import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import TweetEmbed from "react-tweet-embed";
import styled from "styled-components";
import { size } from "styles/constants";
import PostSection from "./PostSection";

const Wrapper = styled.div`
  h4 {
    align-items: center;
    display: flex;
    scroll-margin-top: 2.5rem;
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
  li {
    padding: 0.5em 0;
    @media only screen and (min-width: ${size.sm}) {
      padding: 0;
    }
  }
`;

type PostProps = {
  mdxSource?: MDXRemoteSerializeResult | null;
  sections?: {
    title?: string;
    content: React.ReactNode;
    position?: "top" | "bottom";
  }[];
};

export function Post({ mdxSource, sections }: PostProps) {
  const topSections = sections
    ?.filter(({ position }) => position === "top")
    .map(({ title, content }, index) => (
      <PostSection key={index} title={title} content={content} />
    ));
  const bottomSections = sections
    ?.filter(({ position }) => position !== "top")
    .map(({ title, content }, index) => (
      <PostSection key={index} title={title} content={content} />
    ));

  return (
    <Wrapper>
      {topSections}
      {mdxSource ? (
        <MDXRemote {...mdxSource} components={{ Image, TweetEmbed }} />
      ) : null}
      {bottomSections}
    </Wrapper>
  );
}
