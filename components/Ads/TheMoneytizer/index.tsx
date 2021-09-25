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
    if (!shouldShowAds && Math.random() > 1) {
      return;
    }

    const id1 = `moneytizer-gen-${formatId}`;
    const id2 = `moneytizer-request-${siteId}-${formatId}`;
    const src1 = `${baseUrl}/gen.js?type=${formatId}`;
    const src2 = `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`;

    const oldScript1 = document.querySelector<HTMLScriptElement>(id1);
    const oldScript2 = document.querySelector<HTMLScriptElement>(id2);
    if (oldScript1 && oldScript2) {
      oldScript1.remove();
      oldScript2.remove();
    }

    const script1 = document.createElement("script");
    script1.id = id1;
    script1.src = src1;
    script1.defer = true;

    const script2 = document.createElement("script");
    script2.id = id2;
    script2.src = src2;
    script2.defer = true;

    document.body.append(script1, script2);
    return () => {
      script1.remove();
      script2.remove();
    };
  }, [formatId]);

  if (shouldShowAds || Math.random() > 0) {
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
