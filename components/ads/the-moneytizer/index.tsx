import cn from "classnames";
import AdPlaceholder from "components/ads/placeholder";
import useScript from "hooks/useScript";
import { useRef } from "react";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const baseUrl = "https//ads.themoneytizer.com/s";

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

type Props = {
  className?: string;
  formatType: FormatType;
};

const TheMoneytizer = ({ className = "", formatType }: Props) => {
  const div = useRef<HTMLDivElement>(null);

  const formatId = formatTypeId[formatType];
  const formatClassName = formatTypeClassName[formatType];

  if (isProduction) {
    useScript({
      id: `the-moneytizer-script-${formatId}`,
      ref: div,
      src: `${baseUrl}/gen.js?type=${formatId}`,
    });
    useScript({
      id: `the-moneytizer-script-${formatId}`,
      ref: div,
      src: `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`,
    });
  }

  if (isProduction) {
    return (
      <div
        ref={div}
        className={cn(className, formatClassName)}
        id={`${siteId}-${formatId}`}
      />
    );
  }

  return (
    <AdPlaceholder className={className} height="90px" name={formatType} />
  );
};

export default TheMoneytizer;
