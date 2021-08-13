import { memo } from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  line-height: 0;
`;

const StyledImg = styled.img<Pick<TwemojiProps, "height" | "width">>`
  display: inline-block;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

const sources = {
  GitHub:
    "https://github.githubassets.com/images/icons/emoji/unicode/{unicode}.png?v8",
  Twitter: "https://twemoji.maxcdn.com/v/latest/svg/{unicode}.svg",
};

type TwemojiProps = {
  emoji: string;
  height?: string;
  width?: string;
  className?: string;
  source: "Twitter" | "GitHub";
};
const Twemoji = ({
  emoji,
  className = "",
  height = "1em",
  width = "auto",
  source = "Twitter",
}: TwemojiProps) => {
  const unicode = emoji.codePointAt(0)?.toString(16);

  if (!unicode) {
    return null;
  }

  return (
    <Wrapper>
      <StyledImg
        alt={emoji}
        className={className}
        height={height}
        src={sources[source].replace("{unicode}", unicode)}
        width={width}
      />
    </Wrapper>
  );
};

export default memo(Twemoji);
