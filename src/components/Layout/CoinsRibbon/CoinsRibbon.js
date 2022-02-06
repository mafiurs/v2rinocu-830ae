import { useState, useEffect } from 'react';
import _ from 'lodash';
import getConfig from 'next/config';
import getCoingeckoPrices from '../../../services/coingecko/getCoingeckoPrices';
import { canUseDOM } from '../../../utils/helpers';
import AnimatedSpinLoading from '../../atoms/AnimatedSpinLoading';

const { publicRuntimeConfig } = getConfig();
const { localEnv } = publicRuntimeConfig;

export default function CoinsRibbon() {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: []
  });
  const { data, error, loading } = state;
  const tokenIds = {
    bitcoin: 'btc',
    weth: 'eth',
    binancecoin: 'bnb',
    'smooth-love-potion': 'slp',
    'axie-infinity': 'axs',
    ronin: 'ron',
    moni: 'moni',
    'stamen-tellus-token': 'stt',
    'matic-network': 'matic',
    decentraland: 'mana',
    'the-sandbox': 'sand',
    'theta-token': 'theta',
    enjincoin: 'enj',
    illuvium: 'ilv',
    gala: 'gala',
    solana: 'sol',
    cardano: 'ada'
  };
  const tokensKeys = Object.keys(tokenIds);
  const RAW_TOKENS_QUERY = `vs_currencies=usd&include_24hr_change=true&ids=${tokensKeys.join(
    '%2C'
  )}`;

  function tokensTransition() {
    if (canUseDOM) {
      let translateX = 0;
      const element = document.getElementById('animatedTokens');
      setInterval(frame, 25);
      function frame() {
        if (translateX <= -120 * tokensKeys.length) {
          translateX = window.innerWidth;
        } else {
          translateX = translateX - 1.25;
        }
        element.style.transform = `translateX(${translateX}px)`;
      }
    }
  }

  useEffect(async () => {
    if (!localEnv) {
      const coingeckoTokens = await getCoingeckoPrices(RAW_TOKENS_QUERY, tokenIds);
      if (!_.isEmpty(coingeckoTokens)) {
        setState({ data: coingeckoTokens });
      }
    }
  }, []);

  useEffect(async () => {
    if (!_.isEmpty(data) && canUseDOM) {
      tokensTransition();
    }
  }, [data]);
  return (
    <div className="block h-6 border-gray-600 pb-1 pt-1 bg-gray-900 border-b border-gray-600">
      <div className="overflow-hidden relative w-full h-full">
        <div
          className="overflow-visible absolute w-full h-full whitespace-nowrap"
          id="animatedTokens"
        >
          <div className="flex content-center text-xs font-semibold h-full">
            {data.map((token, idx) => (
              <div key={idx} className="whitespace-nowrap mr-4">
                <span className="inline">{token.id}</span>
                <span className={`inline ml-2 ${token.classColor}`}>
                  {token.usd} {token.variance}
                </span>
              </div>
            ))}
            {loading && (
              <div className="whitespace-nowrap ml-2">
                <AnimatedSpinLoading size={3} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
