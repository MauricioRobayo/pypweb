import { LicensePlate } from "components/LicensePlate";
import { Select } from "components/Select";
import { CitiesList } from "lib/cities";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { camouflageLink } from "styles/mixins";

const StyledNavbar = styled.nav`
  background-color: ${({ theme }) => theme.colors.secondaryLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryLight};
  padding: 0.85rem;
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

export const Logo = styled.h2`
  margin: 0;
  ${camouflageLink}
`;

type NavbarProps = {
  cities: CitiesList;
};
export default function Navbar({ cities }: NavbarProps) {
  const {
    query: { city },
  } = useRouter();
  return (
    <StyledNavbar>
      <Main>
        <Logo>
          <Link href="/">
            <a>
              <LicensePlate>PYPHOY</LicensePlate>
            </a>
          </Link>
        </Logo>
        <Select
          name="ciudad"
          options={cities.map(({ name, slug }) => ({ name, path: `/${slug}` }))}
          placeholder="Ciudad"
          selected={city as string}
        />
      </Main>
    </StyledNavbar>
  );
}
