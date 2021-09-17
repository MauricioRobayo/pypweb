import cn from "classnames";
import { Placeholder } from "components/Ads";
import Script from "next/script";
import { useRef } from "react";
import styled from "styled-components";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const baseUrl = "https://ads.themoneytizer.com/s";

export type FormatType =
  | "MEGABANNER"
  | "MEGABANNER_BOTTOM"
  | "RECOMMENDED_CONTENT"
  | "SKIN";

const formatTypeId: Record<FormatType, number> = {
  MEGABANNER: 1,
  MEGABANNER_BOTTOM: 28,
  RECOMMENDED_CONTENT: 16,
  SKIN: 5,
};

const formatTypeClassName: Record<FormatType, string> = {
  MEGABANNER: "",
  MEGABANNER_BOTTOM: "",
  RECOMMENDED_CONTENT: "outbrain-tm",
  SKIN: "",
};

const StyledPlaceholder = styled(Placeholder)`
  height: 90px;
  width: 320px;
  @media (min-width: 728px) {
    width: 728px;
  } ;
`;

type Props = {
  className?: string;
  formatType: FormatType;
};

export function TheMoneytizer({ className = "", formatType }: Props) {
  const div = useRef<HTMLDivElement>(null);

  const formatId = formatTypeId[formatType];
  const formatClassName = formatTypeClassName[formatType];

  if (isProduction) {
    return (
      <>
        <Script
          id={`gen-${formatId}`}
          src={`${baseUrl}/gen.js?type=${formatId}`}
          strategy="lazyOnload"
        />
        <Script
          id={`request-${formatId}`}
          src={`${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`}
          strategy="lazyOnload"
        />
        <div
          ref={div}
          className={cn(className, formatClassName)}
          id={`${siteId}-${formatId}`}
        />
      </>
    );
  }

  return <StyledPlaceholder className={className} name={formatType} />;
}
