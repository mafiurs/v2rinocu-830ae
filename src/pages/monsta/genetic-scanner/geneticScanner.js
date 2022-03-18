import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { encode as btoa } from 'base-64';
import * as Yup from 'yup';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import Table from '../../../components/organisms/Table';
import { useFetchMonstaGenes } from '../../../hooks/useFetchMonstaGenes';
import { monstaParts, monstaColors } from '../../../utils/monsta/helpers';
import { getInputProps } from '../../../utils/helpers';

export default function GeneticScanner() {
  const router = useRouter();
  const { query } = router;
  const [fetchState, setFetchState] = useFetchMonstaGenes();
  const { loading, response = [], fetchGenes } = fetchState;

  const [monstaDetail] = response;
  const initialValues = {
    monstaId: query?.monstaId ?? ''
  };
  useEffect(async () => {
    if (query.monstaId) {
      await fetchGenes([query.monstaId]);
    }
  }, [query]);

  const onSubmit = async (values) => {
    setFetchState({ loading: true });
    router.push(`${window.location.pathname}?monstaId=${values.monstaId.trim()}`);
  };
  const validationSchema = Yup.object({
    monstaId: Yup.number()
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

  const getRows = () => {
    return monstaParts?.map((part) => {
      const partDetail = _.get(monstaDetail, part);
      const dClass = partDetail?.d?.class;
      const r1Class = partDetail?.r1?.class;
      const r2Class = partDetail?.r2?.class;
      const row = [
        { content: dClass, className: _.get(monstaColors, dClass?.toLowerCase()) },
        { content: r1Class, className: _.get(monstaColors, r1Class?.toLowerCase()) },
        { content: r2Class, className: _.get(monstaColors, r2Class?.toLowerCase()) }
      ];
      return row;
    });
  };
  const allRows = getRows();
  return (
    <Layout>
      <Head>
        <title>Rinocu | Monsta | Genetic scanner</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Monsta Infinite - genetic scanner." />
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
      <section
        aria-labelledby="products-heading"
        className="py-12 h-full rounded pb-24 max-w-7xl ml-auto mr-auto"
      >
        <div className="p-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Genetic scanner</h1>
          <p className="mt-2 text-xs text-gray-300">Get a full overview to your monsta genetic</p>
          {/* Filters */}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-12 sm:flex sm:space-x-4 space-y-4 sm:space-y-0">
              <Input
                {...getInputProps('monstaId', formik)}
                label="Monsta id"
                placeholder="Enter your monsta id"
                required
              />
            </div>
            <div className="mt-8 flex justify-start">
              <Button label="Get genetic" type="submit" size="sm" loading={loading} />
            </div>
          </form>
          {!loading && monstaDetail && allRows.length > 0 && (
            <>
              <h3 className="text-sm text-gray-300 mt-4 mb-2">Results:</h3>
              <div className="flex flex-wrap">
                <img
                  className="h-80 w-80"
                  src={`data:image/svg+xml;base64,${btoa(monstaDetail?.svg)}`}
                  fallback="data:image/png;base64,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"
                  preview={false}
                />

                <div className="mt-2 sm:mx-1 w-full sm:w-auto flex items-center">
                  <Table
                    columns={[
                      { title: 'Part', srLabel: 'Part' },
                      { title: 'Recessive 1', srLabel: 'Recessive 1' },
                      { title: 'Recessive 2', srLabel: 'Recessive 2' }
                    ]}
                    rows={allRows}
                  />
                </div>
              </div>
            </>
          )}

          <div className=""></div>
        </div>
      </section>
    </Layout>
  );
}
