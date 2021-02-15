import { useRef } from "react";
import styled from "styled-components";
import useScript from "../../hooks/useScript";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const baseUrl = "//ads.themoneytizer.com/s";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
`;

const Banner = styled.div`
  ${() =>
    !isProduction &&
    `
      align-items: center;
      background-color: mistyrose;
      border: 1px solid currentColor;
      color: tomato;
      display: flex;
      font-weight: bold;
      height: 90px;
      justify-content: center;
      maxWidth: 728px;
      text-transform: uppercase;
      width: 100%;
    `};
`;

type MegaBannerProps = {
  className: string;
};

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
    <Wrapper className={className}>
      <Banner ref={div} id={`${siteId}-${formatId}`}>
        {isProduction ? null : "MegaBanner"}
      </Banner>
    </Wrapper>
  );
};

export default MegaBanner;
