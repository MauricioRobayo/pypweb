import Link from "next/link";
import React from "react";
import { Email } from "react-obfuscate-email";
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
  a {
    text-decoration: none;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        <Email email="info@pyphoy.com" />
      </p>
      <p>
        <Link href="/politica-de-privacidad">
          <a>Política de privacidad</a>
        </Link>
      </p>
    </StyledFooter>
  );
}
