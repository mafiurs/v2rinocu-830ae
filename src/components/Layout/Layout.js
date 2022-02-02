import { Fragment, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Navigation from './Navigation';
import CoinsRibbon from './CoinsRibbon';
// import getCoingeckoPrices from '../../hooks/useCoingeckoPrices';
// import { canUseDOM, classNames, getSteps } from '../../utils/helpers';

const { publicRuntimeConfig } = getConfig();
const { localEnv } = publicRuntimeConfig;

export default function Layout(props) {
  const { children } = props;
  console.log('PROPS: ', props);
  const router = useRouter();
  // const tokenIds = {
  //   bitcoin: 'btc',
  //   weth: 'eth',
  //   binancecoin: 'bnb',
  //   'smooth-love-potion': 'slp',
  //   'axie-infinity': 'axs',
  //   ronin: 'ron',
  //   moni: 'moni',
  //   'stamen-tellus-token': 'stt',
  //   'matic-network': 'matic',
  //   decentraland: 'mana',
  //   'the-sandbox': 'sand',
  //   'theta-token': 'theta',
  //   enjincoin: 'enj',
  //   illuvium: 'ilv',
  //   gala: 'gala',
  //   solana: 'sol',
  //   cardano: 'ada'
  // };

  // const tokensKeys = Object.keys(tokenIds);
  // const RAW_TOKENS_QUERY = `vs_currencies=usd&include_24hr_change=true&ids=${tokensKeys.join(
  //   '%2C'
  // )}`;

  // function tokensTransition() {
  //   if (canUseDOM) {
  //     let translateX = 0;
  //     const element = document.getElementById('animatedTokens');
  //     setInterval(frame, 25);
  //     function frame() {
  //       if (translateX <= -120 * tokensKeys.length) {
  //         translateX = window.innerWidth;
  //       } else {
  //         translateX = translateX - 1.25;
  //       }
  //       element.style.transform = `translateX(${translateX}px)`;
  //     }
  //   }
  // }
  // const [tokens, setTokens] = useState([]);

  // useEffect(async () => {
  //   const coingeckoTokens = await getCoingeckoPrices(RAW_TOKENS_QUERY, tokenIds);
  //   if (!_.isEmpty(coingeckoTokens)) {
  //     setTokens(coingeckoTokens);
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (!_.isEmpty(tokens) && canUseDOM) {
  //     tokensTransition();
  //   }
  // }, [tokens]);
  return (
    <div className="min-h-full">
      <Navigation />

      <CoinsRibbon />
      {/* <div className="block h-6 border-gray-600 pb-1 pt-1 bg-gray-900 border-b border-gray-600">
        <div className="overflow-hidden relative w-full h-full">
          <div
            className="overflow-visible absolute w-full h-full whitespace-nowrap"
            id="animatedTokens"
          >
            <div className="flex content-center text-xs font-semibold h-full">
              {tokens.map((token) => (
                <div className="whitespace-nowrap mr-4">
                  <span className="inline">{token.id}</span>
                  <span className={`inline ml-2 ${token.classColor}`}>
                    {token.usd} {token.variance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <main>
        <div className="max-w-full px-2 sm:px-6 mx-auto py-3  lg:px-8 mt-0">{children}</div>
      </main>
    </div>
  );
}
