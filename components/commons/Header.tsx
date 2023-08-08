import Head from 'next/head';
import { FC } from 'react';

export interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {/* <meta name="description" content="Bla bla bla" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="apple-mobile-web-app-title" content="YCS" />
    </Head>
  );
};
