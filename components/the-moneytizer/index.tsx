import cn from "classnames";
import useScript from "hooks/useScript";
import { useMemo, useRef } from "react";
import styled, { css } from "styled-components";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const baseUrl = "//ads.themoneytizer.com/s";

export type FormatType = "MEGABANNER" | "RECOMMENDED_CONTENT" | "SKIN";

const formatTypeId: Record<FormatType, number> = {
  MEGABANNER: 1,
  RECOMMENDED_CONTENT: 16,
  SKIN: 5,
};

const formatTypeClassName: Record<FormatType, string> = {
  MEGABANNER: "",
  RECOMMENDED_CONTENT: "outbrain-tm",
  SKIN: "",
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

  const formatId = useMemo(() => formatTypeId[formatType], [formatType]);
  const formatClassName = useMemo(() => formatTypeClassName[formatType], [
    formatType,
  ]);

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
      className={cn(className, formatClassName)}
      id={`${siteId}-${formatId}`}
    >
      {isProduction ? null : formatType}
    </Banner>
  );
};

TheMoneytizer.defaultProps = {
  className: undefined,
};

export default TheMoneytizer;
