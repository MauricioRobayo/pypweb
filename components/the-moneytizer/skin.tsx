import { useRef } from "react";
import useScript from "../../hooks/useScript";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = "//ads.themoneytizer.com/s";
const siteId = "71116";
const formatId = "5";

const Skin = () => {
  const div = useRef<HTMLDivElement>(null);

  if (isProduction) {
    useScript(div, `${baseUrl}/gen.js?type=${formatId}`);
    useScript(
      div,
      `${baseUrl}/requestform.js?siteId=${siteId}&formatId=${formatId}`
    );
  }

  return <div ref={div} id={`${siteId}-${formatId}`} />;
};

export default Skin;
