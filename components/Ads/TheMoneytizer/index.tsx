import cn from "classnames";
import { Placeholder } from "components/Ads";
import { shouldShowAds } from "lib/utils";
import Script from "next/script";
import { memo, useEffect } from "react";
import styled from "styled-components";

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

function TheMoneytizer({ className = "", formatType }: Props) {
  const formatId = formatTypeId[formatType];
  const formatClassName = formatTypeClassName[formatType];

  useEffect(() => {
    if (!shouldShowAds) {
      return;
    }

    const oldScript = document.querySelector<HTMLScriptElement>(
      "#moneytizer-request"
    );
    if (oldScript) {
      oldScript.src = `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`;
      return;
    }

    const script = document.createElement("script");
    script.id = "moneytizer-request";
    script.src = `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`;
    script.defer = true;
    document.body.append(script);
    return () => {
      script.remove();
    };
  }, [formatId]);

  if (shouldShowAds) {
    return (
      <div
        className={cn(className, formatClassName)}
        id={`${siteId}-${formatId}`}
      >
        <Script
          id={`moneytizer-gen-${formatId}`}
          src={`${baseUrl}/gen.js?type=${formatId}`}
          strategy="lazyOnload"
        />
      </div>
    );
  }

  return <StyledPlaceholder className={className} name={formatType} />;
}

export default memo(TheMoneytizer);
