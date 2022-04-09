import { useState, useEffect, useRef, useContext } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import _ from 'lodash';
import { AppContext } from '../../../context';
import Layout from '../../../components/Layout';
import MatchingList from './components/MatchingList';
import getTotalAxiesForSale from '../../../services/axie/totalAxiesForSale';
import AxieListedAlerts from './components/AxieListedAlerts';
import { canUseDOM } from '../../../utils/helpers';
import getFilters from './components/filters';
import { useTabContent } from '../../../hooks/useTabContent';
import BouncingDotsLoading from '../../../components/atoms/BouncingDotsLoading';
const axieEnforcedFilters = ['eyes_f', 'ears_f', 'back_f', 'mouth_f', 'tail_f', 'horn_f'];

function ListedAxieAlerts(props) {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const [totalAxies, setTotalAxies] = useState({ loading: false, error: null, data: 0 });
  const [userAlerts, setUserAlerts] = useState({
    loading: false,
    error: null,
    data: []
  });
  const [axies, setAxies] = useState({
    loading: false,
    error: null,
    data: []
  });

  const tabContent = useTabContent([
    { active: true, name: 'new-alert', tabLabel: 'New alert' },
    { active: false, name: 'my-alerts', tabLabel: 'My alerts' }
  ]);
  const { content } = tabContent;

  const getGraphVariables = ({ from = 0 }) => {
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let urlParams = new URLSearchParams(url.search);
      const parseArrayNumbers = (arr) =>
        Array.isArray(arr) ? arr.map((item) => Number(item)) : arr;
      const getArrayParams = (param, defReturn) => {
        const params = urlParams.getAll(param);
        return _.isEmpty(params) ? defReturn : params;
      };
      const getSingleParam = (param, defReturn) => {
        const p = urlParams.get(param);
        return _.isEmpty(p) ? defReturn : [p];
      };

      const getPartsToFilter = () => {
        let partsTypesToFilter = [];
        for (var key of urlParams.keys()) {
          if (axieEnforcedFilters.includes(key)) {
            const partType = key.split('_')[0];
            partsTypesToFilter = [...partsTypesToFilter, partType];
          }
        }
        const partsToFilter = getArrayParams('part', null)?.filter((part) =>
          partsTypesToFilter.includes(part.split('-')[0])
        );
        return _.isEmpty(partsToFilter) ? null : partsToFilter;
      };

      const getPureness = () => {
        const pureness = getSingleParam('pureness', null);
        return pureness > 0 ? pureness.map((p) => Number(p)) : null;
      };
      const variables = {
        auctionType: 'Sale',
        sort: 'PriceAsc',
        criteria: {
          bodyShapes: null,
          breedCount: parseArrayNumbers(getArrayParams('breedCount', [0, 7])),
          breedable: null,
          classes: getSingleParam('class', null),
          hp: parseArrayNumbers(getArrayParams('hp', [27, 61])),
          morale: parseArrayNumbers(getArrayParams('morale', [27, 61])),
          numJapan: null,
          numMystic: null,
          numXmas: null,
          parts: getPartsToFilter(),
          pureness: getPureness(),
          purity: [],
          region: null,
          skill: parseArrayNumbers(getArrayParams('skill', [27, 61])),
          speed: parseArrayNumbers(getArrayParams('speed', [27, 61])),
          stages: null,
          title: null
        },
        filterStuckAuctions: true,
        from: from,
        owner: null,
        size: 100
      };
      return variables;
    }
  };

  const prevQueryRef = useRef();
  useEffect(async () => {
    prevQueryRef.current = router.query;
  });
  const oldQuery = _.omit(prevQueryRef.current, ['page']);

  const getTotalAxies = async () => {
    setAxies({ ...axies, data: [], error: null });
    const variables = getGraphVariables({ from: 0 });
    if (router.isReady) {
      setTotalAxies({ ...totalAxies, loading: true });
      try {
        const response = await getTotalAxiesForSale(variables);
        setTotalAxies({ ...totalAxies, loading: false, data: response.total });
      } catch (err) {
        setTotalAxies({ ...totalAxies, loading: false, data: 99999999 });
      }
    }
  };
  useEffect(async () => {
    // first render
    await getTotalAxies();
  }, []);

  useEffect(async () => {
    // subsequent queries
    const newQuery = _.omit(router.query, ['page']);
    if (!_.isEqual(oldQuery, newQuery)) {
      await getTotalAxies();
    }
  }, [router.query]);
  const activeContent = _.find(content, 'active');

  useEffect(async () => {
    getUserAlerts();
  }, [activeContent.name]);

  const getUserAlerts = async () => {
    if (activeContent.name === 'my-alerts') {
      setUserAlerts({ data: null, loading: true, error: null });
      try {
        const { data } = await axios.get('/api/fql/axie/getUserAlerts');
        setUserAlerts({ data, loading: false, error: null });
      } catch (err) {
        setUserAlerts({ data: null, loading: false, error: err });
      }
    }
  };

  const handleDeleteAlert = (refId) => async (e) => {
    try {
      const response = await axios.post('/api/fql/axie/deleteUserAlert', { id: refId });
      if (response.status === 200) {
        dispatch({
          type: 'setAlert',
          payload: { open: true, title: 'Alert removed', type: 'success' }
        });
        await getUserAlerts();
      }
    } catch (err) {
      dispatch({
        type: 'setAlert',
        payload: { open: true, title: 'Something went wrong :(', type: 'error' }
      });
    }
  };

  return (
    <Layout tabs={tabContent}>
      <Head>
        <title>Rinocu | Axie | Listing Alert</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Axie Infinity - marketplace explorer." />
        <meta
          name="description"
          content="Rinocu delivers the best crypto game content within the reach of a click. The best crypto game content ever created."
        />
        <meta property="og:image" content="/images/rinocu-discord-logo.png" />
        <meta
          name="keywords"
          content="nft, crypto game, crypto, defi, staking, axie infinity, monsta infinite, pegaxy, eth, axs, slp, btc, moni, stt, blockchain, wallet, metamask, ronin, ron, liquidity, katana, binance, bsc, bnb, busd, usdt, data, volume, mint, token, coin, solidity, react, web3, ethers"
        />
      </Head>
      {activeContent?.name === 'new-alert' && (
        <section aria-labelledby="products-heading" className="pt-2 max-w-7xl mx-auto">
          <h2 id="products-heading" className="sr-only">
            Listed axie alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-8 gap-x-8 gap-y-10 justify-items: center;">
            {/* Filters  desktop*/}
            <div className="block md:col-start-1 md:col-end-5 lg:col-start-2 lg:col-end-5">
              {router.isReady && getFilters()}
            </div>
            <div className="block md:col-start-5 md:col-end-9 lg:col-start-5 lg:col-end-8">
              <MatchingList onSubmitCB={getUserAlerts} />
            </div>
          </div>
        </section>
      )}

      {activeContent?.name === 'my-alerts' && (
        <>
          {userAlerts.loading && <BouncingDotsLoading />}
          {userAlerts.data && (
            <section aria-labelledby="products-heading" className="pt-2 max-w-7xl mx-auto">
              <h2 id="products-heading" className="sr-only">
                Listed axie alerts
              </h2>
              <div className="max-w-xl mx-auto flex w-full">
                <div className="block w-full">
                  <AxieListedAlerts
                    {...userAlerts}
                    onDeleteCB={getUserAlerts}
                    onDelete={handleDeleteAlert}
                  />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

export default withPageAuthRequired(ListedAxieAlerts);
