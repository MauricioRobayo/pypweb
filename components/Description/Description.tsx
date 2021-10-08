import { Scheme } from "@mauriciorobayo/pyptron";
import { getSchemeString } from "lib/utils";
import styled from "styled-components";
interface Props {
  className?: string;
  hasRestriction: boolean;
  isAllDigits: boolean;
  preText?: string;
  scheme: Scheme;
}

const StyledDescription = styled.p`
  margin: 0;
`;

export default function Description({
  className = "",
  hasRestriction,
  isAllDigits,
  preText = "",
  scheme,
}: Props) {
  const schemeString = getSchemeString(scheme);

  if (!hasRestriction) {
    return null;
  }

  let text = "No circulan";

  if (preText) {
    text = `${preText} ${text.toLocaleLowerCase()}`;
  }

  if (!isAllDigits) {
    text = `${text} placas ${schemeString} en`;
  }

  return <StyledDescription className={className}>{text}</StyledDescription>;
}
