import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../components/Layout';

const metrics = [
  {
    id: 1,
    stat: 'Premium membership',
    emphasis: 'A membership system',
    rest: 'will be implemented in the short term in order to deliver actionable blockchain data to members.'
  },
  {
    id: 2,
    stat: 'Exclusive content',
    emphasis: 'Multiple dashboards',
    rest: 'with rich content about what is being trade at the moment, market volume, prices and much more.'
  }
];

export default function HomePage() {
  // const getRecentlyListed = async () => {
  //   try {
  //     const url = 'https://graphql-gateway.axieinfinity.com/graphql';
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         operationName: 'GetAxieBriefList',
  //         variables: {
  //           from: 0,
  //           size: 100,
  //           sort: 'Latest',
  //           auctionType: 'Sale',
  //           criteria: {}
  //         },
  //         query: `
  //           query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
  //             axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
  //               results {
  //                 ...AxieBrief
  //               }
  //             }
  //           }

  //           fragment AxieBrief on Axie {
  //             id
  //             name
  //             stage
  //             class
  //             breedCount
  //             image
  //             title
  //             battleInfo {
  //               banned
  //               __typename
  //             }
  //             auction {
  //               currentPrice
  //               currentPriceUSD
  //               __typename
  //             }
  //             parts {
  //               id
  //               name
  //               class
  //               type
  //               specialGenes
  //               __typename
  //             }
  //             __typename
  //           }
  //           `
  //       })
  //     };
  //     let response = await fetch(url, options);
  //     response = await response.json();
  //     console.log('response: ', response);

  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(response.data.axies)
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify('Something went wrong. Try again later.')
  //     };
  //   }
  // };
  // useEffect(async () => {
  //   const taco = await getRecentlyListed();
  //   console.log('taco: ', taco);
  // });
  return (
    <Layout homePage>
      <Head>
        <title>Rinocu</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Rinocu. The best tool for crypto games." />
        <meta
          name="description"
          content="Rinocu delivers the best crypto game content within the reach of a click. The best crypto game content ever created."
        />
        <meta property="og:image" content="/images/rinocu-discord-logo.png" />
        <meta
          name="keywords"
          content="crypto game, crypto, defi, staking, axie infinity, monsta infinite, pegaxy, eth, axs, slp, btc, moni, stt, blockchain, wallet, metamask, ronin, ron, liquidity, katana, binance, bsc, bnb, busd, usdt, data, volume, mint, token, coin, solidity, react, web3, ethers"
        />
      </Head>
      <div className="">
        <div className="max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-200 tracking-wide">
            implemented using the most reliable sources
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 flex justify-center">
            <div className="col-span-1 flex justify-center content-center md:col-span-2 lg:col-span-1 text-gray-400">
              <svg
                className="h-11 w-11"
                width="100%"
                height="100%"
                version="1.1"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 784.37 1277.39"
                wtx-context="7E4185CF-977D-4629-A98F-56463991DA05"
              >
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <g id="_1421394342400">
                    <g>
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                      />
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                      />
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                      />
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="392.07,1277.38 392.07,956.52 -0,724.89 "
                      />
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="392.07,882.29 784.13,650.54 392.07,472.33 "
                      />
                      <polygon
                        fill="#9CA3AF"
                        fillRule="nonzero"
                        points="0,650.54 392.07,882.29 392.07,472.33 "
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="text-2xl font-medium leading-loose ml-2">Blockchain</span>
            </div>
            <div className="col-span-1 flex justify-center content-center md:col-span-2 lg:col-span-1 text-gray-400">
              <svg
                className="h-12 w-12"
                width="100%"
                height="100%"
                viewBox="0 0 1220 1024"
                version="1.1"
                wtx-context="2CA54424-B36B-480D-9829-11F33CB7B3DC"
              >
                <path
                  style={{ fill: '#9CA3AF' }}
                  d="M443.15234 428.511319l-110.025531 270.510298h55.012765l23.922383-61.134979h118.23932l23.573787 61.134979h55.012766l-107.52-270.510298H443.15234z m-12.854468 163.709277l41.417532-105.058043h0.718979l40.371745 105.058043H430.297872z m313.58366-163.709277h-105.363064v270.510298H690.655319v-95.907404h53.226213c77.148596 0 105.733447-37.953362 105.733447-87.846128 0-48.128-27.865872-86.756766-105.733447-86.756766z m-6.078638 129.26366H690.655319v-83.597617h47.866553c39.30417 0 58.585872 14.401362 58.585873 41.090723 0 27.40834-18.933106 42.158298-59.304851 42.506894z m152.162042-129.26366v270.510298h52.507234V428.511319h-52.507234zM1093.283404 444.067404c4.422809-20.283915 6.906553-41.286809 6.906553-62.877957 0-162.445617-131.682043-294.12766-294.105872-294.12766-122.988936 0-228.199489 75.558128-272.122553 182.707745a219.419234 219.419234 0 0 0-120.025872-35.643915c-115.385191 0-209.92 88.630468-219.593532 201.48834C95.62417 457.553702 21.787234 545.486979 21.787234 650.806468c0 121.812426 98.761532 220.573957 220.595745 220.573958h735.275574v-0.610043c122.836426-6.405447 220.573957-107.737872 220.573958-232.230128a232.556936 232.556936 0 0 0-104.949107-194.472851z m-127.891064 378.313532H242.382979a171.574468 171.574468 0 0 1-171.574468-171.574468 171.552681 171.552681 0 0 1 171.574468-171.574468c0.653617 0 1.285447 0.087149 1.939064 0.087149a175.474383 175.474383 0 0 1-1.939064-24.597787 171.574468 171.574468 0 0 1 171.552681-171.574468 171.269447 171.269447 0 0 1 147.717446 84.621617c7.015489-129.067574 113.576851-231.685447 244.430979-231.685447 135.364085 0 245.106383 109.742298 245.106383 245.106383a244.060596 244.060596 0 0 1-16.275064 87.214298 183.818894 183.818894 0 0 1-69.523064 353.977191z"
                />
              </svg>
              <span className="text-2xl font-medium leading-loose ml-2">Official APIs</span>
            </div>
            <div className="col-span-1 flex justify-center content-center md:col-span-2 lg:col-span-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                id="Layer_3"
                data-name="Layer 3"
                viewBox="0 0 80 80"
                wtx-context="C71EFE17-CBE5-453A-80E8-2D8105997B18"
              >
                <g>
                  <path
                    d="M40,10A30,30,0,1,0,70,40,30,30,0,0,0,40,10Zm1.827,23.2A5.532,5.532,0,1,1,36.3,27.669,5.532,5.532,0,0,1,41.827,33.2ZM60.87,40.872c-1.622,2.094-14.928,9.234-20.239,3.274C40.631,44.146,50.072,48.365,60.87,40.872Zm-6.52-2.42a1.181,1.181,0,1,1,1.18,1.181A1.181,1.181,0,0,1,54.35,38.452ZM45.357,67.313c-.4-2.838-.467-11.639,13.035-23.373,3.371-2.929,7.84-9.814-1.342-12.952-4.735-1.618-6.979-2.441-8.947-3.216a3.8,3.8,0,0,0-1.763-2.3,7.772,7.772,0,0,0-5.728-.447l-.034.008c-6.9-1.45-14.8,1.2-17.9,6.074-2.9,4.567-1.554,20.2-5.565,24.73A27.832,27.832,0,1,1,45.357,67.313Z"
                    style={{ fill: '#9CA3AF' }}
                  />
                  <path
                    d="M36.3,29.387A3.814,3.814,0,1,0,40.108,33.2,3.814,3.814,0,0,0,36.3,29.387Z"
                    style={{ fill: '#9CA3AF' }}
                  />
                </g>
              </svg>
              <span className="text-2xl font-medium leading-loose ml-2">Coingecko</span>
            </div>
          </div>
        </div>
      </div>
      {/* Alternating Feature Sections */}
      <div className="relative overflow-hidden">
        <div className="mt-24">
          <div className="lg:mx-auto lg:max-w-screen-2xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="lg:pt-12 px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div className="relative xl:col-start-2 xl:pb-24">
                <h2 className="text-sm font-semibold tracking-wide uppercase">
                  <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    Future content
                  </span>
                </h2>
                <p className="mt-3 text-3xl font-extrabold text-white">Blockchain data</p>
                <p className="mt-5 text-lg text-gray-300">
                  We are working on providing data from the blockchain. You will get up to date
                  market information before making any decision.
                </p>

                <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6">
                  {metrics.map((item) => (
                    <p key={item.id}>
                      <span className="block text-xl font-bold text-white">{item.stat}</span>
                      <span className="mt-1 block text-base text-gray-300">
                        <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-10 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full w-full flex justify-center">
                <img
                  className="rounded-xl lg:left-0 lg:w-auto border-white max-w-full h-auto"
                  src="/images/dashboard.png"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:max-w-screen-2xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-20 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Axie Infinity
                    <span className="block text-indigo-400 text-lg font-extrabold tracking-tight uppercase">
                      Marketplace explorer
                    </span>
                  </h2>

                  <p className="mt-4 text-lg text-gray-300">
                    Monsta marketplace explorer now with a better performance and style.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/axie/marketplace"
                      className="inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      Take me there
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-10 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full w-full">
                <img
                  className="rounded-xl shadow-xl lg:absolute lg:left-0 lg:w-auto border-white max-w-full h-auto"
                  src="/images/axieMarketplace.png"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:max-w-screen-2xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-20 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Monsta Infinite
                    <span className="block text-indigo-400 text-lg font-extrabold tracking-tight uppercase">
                      Marketplace explorer
                    </span>
                  </h2>

                  <p className="mt-4 text-lg text-gray-300">
                    Monsta marketplace explorer now with a better performance and style.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/monsta/marketplace"
                      className="inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      Take me there
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-10 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full w-full">
                <img
                  className="rounded-xl shadow-xl lg:absolute lg:left-0 lg:w-auto border-white max-w-full h-auto"
                  src="/images/monstaMarketplace.png"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
