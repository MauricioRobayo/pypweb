import { Scheme } from "@mauriciorobayo/pyptron";
import { getSchemeString } from "lib/utils";
import styled from "styled-components";
interface Props {
  className?: string;
  hasRestriction: boolean;
  isAllDigits: boolean;
  scheme: Scheme;
}

const StyledDescription = styled.p`
  margin: 0;
`;

export default function Description({
  className = "",
  hasRestriction,
  isAllDigits,
  scheme,
}: Props) {
  const schemeString = getSchemeString(scheme);

  if (!hasRestriction) {
    return null;
  }

  const text = isAllDigits
    ? "No circulan"
    : `No circulan placas ${schemeString} en`;

  return <StyledDescription className={className}>{text}</StyledDescription>;
}
