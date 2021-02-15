import cn from "classnames";
import Skin from "components/the-moneytizer/skin";
import { isProduction } from "lib/utils";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import utilStyles from "styles/utils.module.scss";
import { PypOption } from "types";
import CTA from "../call-to-action/call-to-action";
import PypDate from "../date/date";
import Email from "../email/email";
import LicensePlate from "../license-plate/license-plate";
import Select from "../select/select";
import styles from "./layout.module.scss";

type LayoutProps = {
  children: ReactNode;
  pypOptions: PypOption[];
  isHome?: boolean;
  aside?: ReactNode;
  title?: string;
  date: Date;
};

export default function Layout({
  children,
  isHome,
  aside,
  pypOptions,
  title,
  date,
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {isHome ? null : (
        <div className={styles.navbar}>
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
        </div>
      )}
      <div className={isHome ? styles.home : styles.page}>
        <div className={utilStyles.textCenter}>
          <header>
            <h1>{title}</h1>
            <h2>
              <PypDate date={date} />
            </h2>
          </header>
        </div>
        <div>
          <main className={styles.main}>{children}</main>
          {isHome ? null : <CTA />}
        </div>
      </div>
      {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      {isHome && isProduction ? <Skin /> : null}
      <footer className={cn(styles.footer, utilStyles.textCenter)}>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  aside: null,
  isHome: false,
  title: "Pico y placa hoy",
};
