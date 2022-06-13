import 'styles/globals.css';
import Layout from 'layouts';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
