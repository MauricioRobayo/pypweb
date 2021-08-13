import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  useState,
} from "react";
import styled, { css } from "styled-components";

type SegmentWrapperProps = {
  first: boolean;
};
const SegmentWrapper = styled.span<SegmentWrapperProps>`
  ${({ first }) =>
    first &&
    css`
      &::after {
        content: "@";
      }
    `}
`;

type EmailProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  body?: string;
  children?: ReactNode;
  className?: string;
  email: string;
  subject?: string;
};
export default function Email({
  body = "",
  subject = "",
  children,
  className,
  email,
  ...rest
}: EmailProps) {
  const [hovered, setHovered] = useState(false);
  const emailUrl = new URL(`mailto:${email}`);

  if (body) {
    emailUrl.searchParams.set("body", body);
  }

  if (subject) {
    emailUrl.searchParams.set("subject", subject);
  }

  function handleHover() {
    setHovered(true);
  }

  return (
    <a
      className={className}
      href={hovered ? emailUrl.href : "#"}
      onFocus={handleHover}
      onMouseOver={handleHover}
      {...rest}
    >
      {hovered
        ? children || email
        : children ||
          email.split("@").map((emailSegment, index) => (
            <SegmentWrapper key={emailSegment} first={index === 0}>
              {emailSegment}
            </SegmentWrapper>
          ))}
    </a>
  );
}
