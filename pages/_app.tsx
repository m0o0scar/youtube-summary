import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <div className="font-sans">
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} />
        </div>
      </SessionProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
