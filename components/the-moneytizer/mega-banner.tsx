import useScript from "hooks/useScript";
import { useRef } from "react";
import styled, { css } from "styled-components";

const isProduction = process.env.NODE_ENV === "production";
const siteId = "71116";
const formatId = "1";
const baseUrl = "//ads.themoneytizer.com/s";

type MegaBannerProps = {
  className?: string;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
`;

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
    <Wrapper className={className}>
      <Banner ref={div} id={`${siteId}-${formatId}`}>
        {isProduction ? null : "MegaBanner"}
      </Banner>
    </Wrapper>
  );
};

MegaBanner.defaultProps = {
  className: undefined,
};

export default MegaBanner;
