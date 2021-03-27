import cn from "classnames";
import useScript from "hooks/useScript";
import { useRef } from "react";
import styled, { css } from "styled-components";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const baseUrl = "//ads.themoneytizer.com/s";

export enum FormatType {
  MEGABANNER = "1",
  SKIN = "5",
  RECOMMENDED_CONTENT = "16",
}

const classNames: Record<FormatType, string> = {
  [FormatType.MEGABANNER]: "",
  [FormatType.SKIN]: "",
  [FormatType.RECOMMENDED_CONTENT]: "outbrain-tm",
};

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

const MegaBanner = ({ className }: MegaBannerProps) => {
  const div = useRef<HTMLDivElement>(null);

  if (isProduction) {
    useScript(div, `${baseUrl}/gen.js?type=${formatId}`);
    useScript(
      div,
      `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`
    );
  }

  return (
    <Banner
      ref={div}
      className={cn(className, classNames[formatType])}
      id={`${siteId}-${formatType}`}
    >
      {isProduction ? null : "MegaBanner"}
    </Banner>
  );
};

MegaBanner.defaultProps = {
  className: undefined,
};

export default MegaBanner;
