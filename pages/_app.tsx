import 'styles/globals.css';
import Layout from 'layouts';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Notus NextJS by Creative Tim</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
