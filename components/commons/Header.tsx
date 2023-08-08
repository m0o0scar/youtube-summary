import Head from 'next/head';
import { FC, ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  description?: string;
  extra?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ title, description, extra }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="apple-mobile-web-app-title" content="YCS" />
      {extra}
    </Head>
  );
};
