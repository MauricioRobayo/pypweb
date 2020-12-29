import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import utilStyles from '../../styles/utils.module.scss';
import { PypOption } from '../../types';
import CTA from '../call-to-action/call-to-action';
import PypDate from '../date/date';
import Email from '../email/email';
import LicensePlate from '../license-plate/license-plate';
import Select from '../select/select';
import styles from './layout.module.scss';

type LayoutProps = {
  children: ReactNode;
  pypOptions: PypOption[];
  home?: boolean;
  aside?: ReactNode;
  title?: string;
  date?: Date | string;
};

export default function Layout({
  children,
  home,
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
      {home ? null : (
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
      <div className={home ? styles.home : styles.page}>
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
          {home ? null : <CTA />}
        </div>
      </div>
      {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      <footer className={cn(styles.footer, utilStyles.textCenter)}>
        <p>PICO Y PLACA HOY</p>
        <Email />
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  aside: null,
  date: new Date(),
  home: false,
  title: 'Pico y placa hoy',
};
