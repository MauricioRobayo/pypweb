import { SelfAd } from "components/Ads";
import { LicensePlate } from "components/LicensePlate";
import { Select } from "components/Select";
import { cityOptions } from "lib/utils";
import Link from "next/link";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

const StyledNavbar = styled.nav`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  padding: 0.5rem 1rem;
  width: 100%;
`;

const Main = styled.div`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto 1fr;
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth};
`;
const SelfAdWrapper = styled.div`
  display: grid;
  margin-top: 0.5rem;
  place-items: center;
`;

export const Logo = styled.h2`
  ${camouflageLink}
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <SelfAdWrapper>
        <SelfAd />
      </SelfAdWrapper>
      <Main>
        <Logo>
          <Link href="/">
            <a>
              <LicensePlate>PYPHOY</LicensePlate>
            </a>
          </Link>
        </Logo>
        <Select name="ciudad" options={cityOptions()} placeholder="Ciudad" />
      </Main>
    </StyledNavbar>
  );
}
