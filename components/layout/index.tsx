import CTA from "components/call-to-action";
import PypDate from "components/date";
import Email from "components/email";
import LicensePlate from "components/license-plate";
import Select from "components/select";
import { CityOptions } from "components/select/utils";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  Aside,
  Footer,
  Logo,
  Main,
  MegaBanner,
  Navbar,
  Page,
  RecommendedContent,
  StyledLayout,
  StyledVidverto,
} from "./styles";

type LayoutProps = {
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  cityName?: string;
  categoryName?: string;
  date: Date;
  isHome?: boolean;
  selectOptions: CityOptions;
  selectedNumber?: number;
  title?: string;
};
export default function Layout({
  aside = null,
  children,
  categoryName,
  cityName,
  className = "",
  date,
  isHome = false,
  selectOptions,
  selectedNumber,
  title = "Pico y placa hoy",
}: LayoutProps) {
  const router = useRouter();

  let description = `Horario, días, fechas, placas, números, decretos, sanciones y toda la información vigente del pico y placa`;
  if (categoryName) {
    description += ` para ${categoryName}`;
  }
  if (cityName) {
    description += ` en ${cityName}`;
  }
  if (selectedNumber) {
    description += ` placas ${selectedNumber}`;
  }

  return (
    <StyledLayout className={className}>
      <Head>
        <title>{title}</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content={description} name="description" />

        {/* Open Graph */}
        <meta
          key="ogurl"
          content={`${router.basePath}${router.asPath}`}
          property="og:url"
        />
        <meta
          key="ogsitename"
          content="Pico y placa hoy"
          property="og:site_name"
        />
        <meta key="ogtitle" content={title} property="og:title" />
        <meta key="ogdesc" content={description} property="og:description" />
      </Head>
      {isHome ? null : (
        <Navbar>
          <nav>
            <Logo>
              <Link href="/">
                <a>
                  <LicensePlate>PYPHOY</LicensePlate>
                </a>
              </Link>
            </Logo>
            <Select
              name="ciudad"
              options={selectOptions}
              placeholder="Ciudad"
            />
          </nav>
        </Navbar>
      )}
      <Page isHome={isHome}>
        <MegaBanner />
        <div>
          <header>
            <h1>{title}</h1>
            <h2>
              <PypDate date={date} />
            </h2>
          </header>
        </div>
        <div>
          <Main>{children}</Main>
          {isHome ? <StyledVidverto /> : <CTA />}
        </div>
      </Page>
      {aside ? (
        <Aside>
          {aside}
          {isHome ? null : <RecommendedContent />}
        </Aside>
      ) : null}
      <Footer isHome={isHome}>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </Footer>
    </StyledLayout>
  );
}
