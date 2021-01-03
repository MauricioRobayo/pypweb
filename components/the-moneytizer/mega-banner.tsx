import { useRef } from "react";
import useScript from "../../hooks/useScript";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const type = "1";

function MegaBanner() {
  const div = useRef<HTMLDivElement>(null);
  if (isProduction) {
    useScript(`//ads.themoneytizer.com/s/gen.js?type=${type}`, div);
    useScript(
      `//ads.themoneytizer.com/s/requestform.js?siteId=${siteId}&formatId=${formatId}`,
      div
    );
  }
  return <div ref={div} id={siteId} />;
}

export default MegaBanner;
