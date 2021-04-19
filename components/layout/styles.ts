import TheMoneytizer from "components/ads/the-moneytizer";
import Vidverto from "components/ads/vidverto";
import styled, { css } from "styled-components";
import { camouflageLink } from "styles/mixins";

export const StyledVidverto = styled(Vidverto)`
  margin: 1rem 0;
`;

export const MegaBanner = styled(TheMoneytizer).attrs({
  formatType: "MEGABANNER",
})`
  margin: 2rem auto 0;
`;

export const RecommendedContent = styled(TheMoneytizer).attrs({
  formatType: "RECOMMENDED_CONTENT",
})`
  margin: 2rem 0;
`;

export const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    margin: auto;
    max-width: ${({ theme }) => theme.maxWidth};
    text-align: center;

    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 1rem 0 1rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

export const Navbar = styled.div`
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

type PageProps = {
  isHome: boolean;
};
export const Page = styled.div<PageProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isHome }) => (isHome ? "center" : "flex-start")};
  width: ${({ isHome }) => (isHome ? "auto" : "100%")};
  ${({ isHome }) =>
    isHome &&
    css`
      flex: 1 1 100%;
    `}
`;

export const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const Aside = styled.aside`
  max-width: ${({ theme }) => theme.maxWidthWider};
  padding: 0.5rem 1rem;
  width: 100%;
  h4 {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  ol {
    list-style-type: number;
  }
  li,
  p {
    padding: 0.25rem 0;
  }
`;

export const Footer = styled.footer<PageProps>`
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

export const Logo = styled.h2`
  ${camouflageLink}
`;
