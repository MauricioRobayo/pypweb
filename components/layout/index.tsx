import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import { PypOption } from "types";
import CTA from "../call-to-action";
import PypDate from "../date";
import Email from "../email";
import LicensePlate from "../license-plate";
import Select from "../select";

const StyledLayout = styled.div`
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
      margin: 2rem 0 1rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

const Navbar = styled.div`
  background-color: hsl(0, 0%, 98%);
  border-bottom: 1px solid hsl(0, 0%, 88%);
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
const Page = styled.div<PageProps>`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: ${({ isHome }) => (isHome ? "center" : "flex-start")};
  width: ${({ isHome }) => (isHome ? "auto" : "100%")};
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
`;

const Aside = styled.aside`
  padding: 1rem 0;
  h4 {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  a {
    color: ${({ theme }) => theme.colors.linkColor};
  }
  ol {
    list-style-type: number;
  }
  ul {
    list-style-type: disc;
  }
  ul,
  ol {
    list-style-position: outside;
    margin-left: 1rem;
  }
  li,
  p {
    padding: 0.25rem 0;
  }
`;

const Footer = styled.footer`
  background-color: hsl(0, 0%, 98%);
  border-top: 1px solid hsl(0, 0%, 88%);
  font-size: 0.85rem;
  padding: 0.5rem 0 1rem;
  text-align: center;
  width: 100%;
  p {
    margin: 0.5rem;
  }
`;

type LayoutProps = {
  children: ReactNode;
  className?: string;
  pypOptions: PypOption[];
  isHome?: boolean;
  aside?: ReactNode;
  title?: string;
  date: Date;
};

export default function Layout({
  children,
  className,
  isHome = false,
  aside,
  pypOptions,
  title,
  date,
}: LayoutProps) {
  return (
    <StyledLayout className={className}>
      <Head>
        <title>{title}</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {isHome ? null : (
        <Navbar>
          <nav>
            <h2>
              <Link href="/">
                <a>
                  <LicensePlate>PYPHOY</LicensePlate>
                </a>
              </Link>
            </h2>
            <Select pypOptions={pypOptions} />
          </nav>
        </Navbar>
      )}
      <Page isHome={isHome}>
        <div>
          <header>
            <h1>{title}</h1>
            <h2>
              <PypDate date={date} />
            </h2>
          </header>
        </div>
        <div>
          <main>{children}</main>
          {isHome ? null : <CTA />}
        </div>
      </Page>
      {aside ? <Aside>{aside}</Aside> : null}
      <Footer>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </Footer>
    </StyledLayout>
  );
}

Layout.defaultProps = {
  aside: null,
  className: "",
  isHome: false,
  title: "Pico y placa hoy",
};
