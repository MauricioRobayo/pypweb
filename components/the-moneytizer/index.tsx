import useScript from "hooks/useScript";
import { useRef } from "react";
import styled, { css } from "styled-components";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const baseUrl = "//ads.themoneytizer.com/s";

export enum FormatType {
  MEGABANNER = "1",
  SKIN = "5",
  RECOMMENDED_CONTENT = "16",
}

const classNames: Partial<Record<FormatType, string>> = {
  [FormatType.RECOMMENDED_CONTENT]: "outbrain-tm",
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
`;

const Banner = styled.div`
  ${() =>
    !isProduction &&
    css`
      align-items: center;
      background-color: mistyrose;
      border: 1px solid currentColor;
      color: tomato;
      display: flex;
      font-weight: bold;
      height: 90px;
      justify-content: center;
      max-width: 728px;
      text-transform: uppercase;
      width: 100%;
    `};
`;

type Props = {
  className?: string;
  formatType: FormatType;
};

const TheMoneytizer = ({ className, formatType }: Props) => {
  const div = useRef<HTMLDivElement>(null);

  if (isProduction) {
    useScript(div, `${baseUrl}/gen.js?type=${formatType}`);
    useScript(
      div,
      `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatType}`
    );
  }

  return (
    <Wrapper className={className}>
      <Banner
        ref={div}
        className={classNames[formatType]}
        id={`${siteId}-${formatType}`}
      >
        {isProduction ? null : "MegaBanner"}
      </Banner>
    </Wrapper>
  );
};

TheMoneytizer.defaultProps = {
  className: undefined,
};

export default TheMoneytizer;
