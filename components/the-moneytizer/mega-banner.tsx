import { useRef } from "react";
import styled from "styled-components";
import useScript from "../../hooks/useScript";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const type = "1";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
`;

const Banner = styled.div`
  margin: 2rem 0;
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

function MegaBanner() {
  const div = useRef<HTMLDivElement>(null);
  if (isProduction) {
    useScript(`//ads.themoneytizer.com/s/gen.js?type=${type}`, div);
    useScript(
      `//ads.themoneytizer.com/s/requestform.js?siteId=${siteId}&formatId=${formatId}`,
      div
    );
  }

  return (
    <Wrapper>
      <Banner ref={div} id={`${siteId}-${formatId}`}>
        {isProduction ? null : "MegaBanner"}
      </Banner>
    </Wrapper>
  );
}

export default MegaBanner;
