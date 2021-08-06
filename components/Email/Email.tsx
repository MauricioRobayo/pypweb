import { useState } from "react";
import styled, { css } from "styled-components";

type SegmentWrapperProps = {
  first: boolean;
};
const SegmentWrapper = styled.span<SegmentWrapperProps>`
  ${({ first }) =>
    first &&
    css`
      &::after {
        content: "\x00040";
      }
    `}
`;

type EmailProps = {
  className?: string;
  email: string;
};
export default function Email({ className, email }: EmailProps) {
  const [hovered, setHovered] = useState(false);

  function handleHover() {
    setHovered(true);
  }

  return (
    <a
      className={className}
      href={hovered ? `mailto:${email}` : "#"}
      onFocus={handleHover}
      onMouseOver={handleHover}
    >
      {hovered
        ? email
        : email.split("@").map((emailSegment, index) => (
            <SegmentWrapper key={emailSegment} first={index === 0}>
              {emailSegment}
            </SegmentWrapper>
          ))}
    </a>
  );
}
