import styled, { css } from "styled-components";

type WrapperProps = {
  first: boolean;
};
const Wrapper = styled.span<WrapperProps>`
  ${({ first }) =>
    first &&
    css`
      &::after {
        content: "@";
      }
    `}
`;

type ObfuscatedEmailProps = {
  email: string;
};
export default function ObfuscatedEmail({ email }: ObfuscatedEmailProps) {
  return (
    <>
      {email.split("@").map((emailSegment, index) => (
        <Wrapper key="emailSegment" first={index === 0}>
          {emailSegment}
        </Wrapper>
      ))}
    </>
  );
}
