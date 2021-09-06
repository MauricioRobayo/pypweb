import { Fine } from "components/Fine";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import TweetEmbed from "react-tweet-embed";

type PostProps = {
  mdxSource: MDXRemoteSerializeResult;
};

export function Post({ mdxSource }: PostProps) {
  if (!mdxSource) {
    return null;
  }

  return (
    <>
      <MDXRemote {...mdxSource} components={{ Image, Link, TweetEmbed }} />
      <Fine />
    </>
  );
}
