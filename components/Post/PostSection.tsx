import React from "react";
import slugify from "slugify";
import LinkIcon from "svg-emojis/twemoji/1f517.svg";

interface Props {
  title?: string;
  content: React.ReactNode;
}
function PostSection({ title = "", content }: Props) {
  const id = slugify(title, { lower: true });
  return (
    <>
      {title ? (
        <h4 id={id}>
          {title}
          <a aria-hidden="true" tabIndex={-1} href={`#${id}`}>
            <LinkIcon />
          </a>
        </h4>
      ) : null}
      {content}
    </>
  );
}

export default PostSection;
