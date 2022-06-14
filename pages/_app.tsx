import 'styles/globals.css';
import Layout from 'layouts';
import type { AppProps } from 'next/app';
import React from 'react';
import { store } from 'store';
import Head from 'next/head';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
