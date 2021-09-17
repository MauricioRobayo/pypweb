import { SelfAd } from "components/Ads";
import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  margin-top: auto;
  padding: 1rem 0;
  text-align: center;
  width: 100%;
  p {
    margin: 0.5rem;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        <SelfAd />
      </p>
    </StyledFooter>
  );
}
