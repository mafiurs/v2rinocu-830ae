import React, { useReducer } from 'react';
import '../components/register-components';
import '../css/main.css';
import 'rc-slider/assets/index.css';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import withContext from '../hocs/withContext';

import { ContextProvider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <UserProvider>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </UserProvider>
    </>
  );
}

export default withContext(MyApp);
