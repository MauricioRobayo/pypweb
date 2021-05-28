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
  MegaBannerBottom,
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

        <meta
          key="og_url"
          content={`${router.basePath}${router.asPath}`}
          property="og:url"
        />
        <meta
          key="og_site_name"
          content="Pico y placa hoy"
          property="og:site_name"
        />
        <meta key="og_title" content={title} property="og:title" />
        <meta
          key="ogDescription"
          content={description}
          property="og:description"
        />
        <meta
          key="og_image"
          content="/apple-touch-icon.png"
          property="og:image"
        />
        <meta
          key="image_alt"
          content="Pico y placa hoy"
          property="og:image:alt"
        />
        <meta key="og_type" content="website" property="og:type" />

        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#f7c100" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffc40d" name="msapplication-TileColor" />
        <meta content="#f7c100" name="theme-color" />
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
          <MegaBannerBottom formatType="MEGABANNER_BOTTOM" />
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
