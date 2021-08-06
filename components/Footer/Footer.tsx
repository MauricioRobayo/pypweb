import { Email } from "components/Email";
import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  font-size: 0.85rem;
  margin-top: auto;
  padding: 0.5rem 0 1rem;
  text-align: center;
  width: 100%;
  p {
    margin: 0.5rem;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>PICO Y PLACA HOY</p>
      <Email email="info@pyphoy.com" />
    </StyledFooter>
  );
}
