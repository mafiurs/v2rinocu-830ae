import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import Table from '../../../components/organisms/Table';
import { useFetchMonstaGenes } from '../../../hooks/useFetchMonstaGenes';
import { monstaParts, monstaColors } from '../../../utils/monsta/helpers';
import { sumProbs } from '../../../utils/helpers';

export default function CloneSimulator() {
  const router = useRouter();
  const { query } = router;
  const [probs, setProbs] = useState([]);
  const [fetchState, setFetchState] = useFetchMonstaGenes();
  const { loading, response = [], fetchGenes, fetched } = fetchState;
  const [sireDetail, matronDetail] = response;
  const initialValues = {
    momId: query?.momId ?? '',
    dadId: query?.dadId ?? ''
  };
  useEffect(async () => {
    if (query?.momId && query?.dadId) {
      setProbs([]);
      await fetchGenes([query.momId, query.dadId]);
    }
  }, [query]);

  useEffect(() => {
    if (sireDetail && matronDetail) {
      const addedProbs = () =>
        monstaParts.map((part) => {
          let geneticSire = {
            d: sireDetail[part].d.class,
            r1: sireDetail[part].r1.class,
            r2: sireDetail[part].r2.class
          };
          let geneticMatron = {
            d: matronDetail[part].d.class,
            r1: matronDetail[part].r1.class,
            r2: matronDetail[part].r2.class
          };
          return sumProbs(geneticSire, geneticMatron, part);
        });
      setProbs(addedProbs());
    }
  }, [sireDetail, matronDetail]);
  const onSubmit = async (values) => {
    setFetchState({ loading: true });
    const url = `${
      window.location.pathname
    }?momId=${values.momId.trim()}&dadId=${values.dadId.trim()}`;
    router.push(url, url, { scroll: false });
  };
  const validationSchema = Yup.object({
    momId: Yup.number()
      .max(99999999, 'Number invalid')
      .required('Required')
      .typeError('Must be a number'),
    dadId: Yup.number()
      .max(99999999, 'Number invalid')
      .required('Required')
      .typeError('Must be a number')
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false
  });

  const getInputProps = (name = '', formik) => {
    const { handleChange, values, errors } = formik;
    const value = _.get(values, name);
    const error = _.get(errors, name);

    return { name, value, handleChange, error };
  };

  const getRows = () => {
    return probs?.map((item) => {
      const rows = item?.probs.map(({ card, prob }) => [
        { content: card, className: _.get(monstaColors, card?.toLowerCase()) },
        { content: `${prob}%`, className: _.get(monstaColors, card?.toLowerCase()) }
      ]);
      return rows;
    });
  };

  const allRows = getRows();
  return (
    <Layout>
      <Head>
        <title>Rinocu | Monsta | Clone simulator</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Monsta Infinite - clone simulator." />
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
      <section
        aria-labelledby="products-heading"
        className="py-12 h-full rounded  pb-24 max-w-7xl ml-auto mr-auto"
      >
        <div className="p-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Clone Simulator</h1>
          <p className="mt-2 text-xs text-gray-300">
            Explore the changes you have to breed the monsta that you wish
          </p>
          {/* Filters */}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-12 sm:flex sm:space-x-4 space-y-4 sm:space-y-0">
              <Input
                {...getInputProps('momId', formik)}
                label="Mom id"
                placeholder="Enter the mom id"
                required
              />
              <Input
                {...getInputProps('dadId', formik)}
                label="Dad id"
                placeholder="Enter the dad id"
                required
              />
            </div>
            <div className="mt-8 flex justify-start">
              <Button label="Simulate" type="submit" size="sm" loading={loading} />
            </div>
          </form>
          {!loading && allRows.length > 0 && (
            <>
              <h3 className="text-sm text-gray-300 mt-4 mb-2">Results:</h3>
              <div className="flex flex-wrap">
                {monstaParts.map((part, idx) => {
                  const columns = [
                    { title: part, srLabel: part },
                    { title: 'Probability', srLabel: 'Probability' }
                  ];
                  const rows = allRows[idx];
                  return (
                    <div className="mt-2 sm:mx-1 w-full sm:w-auto">
                      <Table columns={columns} rows={rows} />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className=""></div>
        </div>
      </section>
    </Layout>
  );
}
