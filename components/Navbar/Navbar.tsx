import LicensePlate from "components/license-plate";
import Select from "components/select";
import { cityOptions } from "lib/utils";
import Link from "next/link";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

const StyledNavbar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  padding: 0.5rem 1rem;
  width: 100%;
  nav {
    align-items: center;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto 1fr;
    margin: auto;
    max-width: ${({ theme }) => theme.maxWidth};
  }
`;

export const Logo = styled.h2`
  ${camouflageLink}
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <nav>
        <Logo>
          <Link href="/">
            <a>
              <LicensePlate>PYPHOY</LicensePlate>
            </a>
          </Link>
        </Logo>
        <Select name="ciudad" options={cityOptions()} placeholder="Ciudad" />
      </nav>
    </StyledNavbar>
  );
}
