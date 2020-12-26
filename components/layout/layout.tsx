import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import utilStyles from '../../styles/utils.module.scss';
import { PypOption } from '../../types';
import CTA from '../call-to-action/call-to-action';
import Email from '../email/email';
import LicensePlate from '../license-plate/license-plate';
import Select from '../select/select';
import styles from './layout.module.scss';

type LayoutProps = {
  children: ReactNode;
  pypOptions: PypOption[];
  home?: boolean;
  header?: ReactNode;
  aside?: ReactNode;
};

export default function Layout({
  header,
  children,
  home,
  aside,
  pypOptions,
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>
          Toda la información sobre el pico y placa en Colombia | Pico y placa
          hoy
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {home ? null : (
        <header className={styles.header}>
          <div className={styles.content}>
            <h2>
              <Link href="/">
                <a>
                  <LicensePlate>PYPHOY</LicensePlate>
                </a>
              </Link>
            </h2>
            <nav>
              <Select pypOptions={pypOptions} />
            </nav>
          </div>
        </header>
      )}
      <div className={home ? styles.home : styles.page}>
        <div className={utilStyles.textCenter}>{header}</div>
        <div>
          <main className={styles.main}>{children}</main>
          {home ? null : <CTA />}
        </div>
      </div>
      {aside ? <aside>{aside}</aside> : null}
      <footer className={cn(styles.footer, utilStyles.textCenter)}>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  home: false,
  header: null,
  aside: null,
};
