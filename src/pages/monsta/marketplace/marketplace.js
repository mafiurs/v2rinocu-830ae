import { Fragment, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { FilterIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import ClassesCheckboxes from './components/ClassesCheckboxes';
import SliderWMarks from '../../../components/marketplace/SliderWMarks';
import FilterDrawer from '../../../components/marketplace/FilterDrawer';
import BodyPartSelect from './components/BodyPartSelectAxie';
import Pagination from '../../../components/marketplace/Pagination';
import FilterBodyPlaceholder from './components/FilterBodyPlaceholder';
import MonstaCard from './components/MonstaCard';
import AnimatedSpinLoading from '../../../components/atoms/AnimatedSpinLoading';
import { monstaParts, genesStructure, getDetail } from '../../../utils/monsta/helpers';
import { canUseDOM, classNames } from '../../../utils/helpers';
import usePageContent from '../../../hooks/usePageContent';
import { fetchMonstaMarket } from '../../../services/monsta/monsta';

const initialGeneStructure = genesStructure.reduce((a, v) => ({ ...a, [v]: null }), {});
const initialFilters = {
  currentPage: null,
  cloneUsage: null,
  classType: null,
  pureness: null,
  genes: {
    body: initialGeneStructure,
    arms: initialGeneStructure,
    legs: initialGeneStructure,
    head: initialGeneStructure,
    face: initialGeneStructure,
    tail: initialGeneStructure
  }
};

export default function Marketplace() {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filters = initialFilters;

  const [lastFetchedMonstas, setLastFetchedMonstas] = useState([]);
  const [monstas, setMonstas] = useState([]);
  const [steps, setSteps] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const getQueryNumber = (match, defaultValue) =>
    router.query && router.query[match] ? Number(router.query[match]) : defaultValue;

  const getQueryGeneStructure = () => {
    const geneticQueries = Object.keys(router.query).filter((q) => {
      return q.split('_').length > 1;
    });
    let genQueryResult = { ...filters.genes };
    if (geneticQueries) {
      geneticQueries.forEach((genQuery) => {
        const splittedGen = genQuery.split('_');
        const part = splittedGen[0];
        const gen = splittedGen[1];
        genQueryResult = {
          ...genQueryResult,
          [part]: { ...genQueryResult[part], [gen]: router.query[genQuery] }
        };
      });
    }
    return genQueryResult;
  };

  const getQueries = async () =>
    await new Promise(async (resolve, reject) => {
      const queries = {
        cloneUsage: getQueryNumber('cloneUsage', 0),
        classType: router.query?.class ?? null,
        currentPage: getQueryNumber('page', 1),
        pureness: getQueryNumber('pureness', 1),
        genes: getQueryGeneStructure()
      };
      resolve(queries);
    });

  const prevQueryRef = useRef();
  useEffect(async () => {
    prevQueryRef.current = router.query;
  });
  const oldQuery = _.omit(prevQueryRef.current, ['page']);

  useEffect(async () => {
    const newQuery = _.omit(router.query, ['page']);

    if (_.isEmpty(newQuery)) {
      setLastFetchedMonstas([]);
      setMonstas([]);
      return;
    }
    if (canUseDOM && router.isReady && !_.isEqual(oldQuery, newQuery)) {
      window.stop();
      setInitialLoading(true);
      setMonstas([]);
      setLastFetchedMonstas([]);
      setSteps(1);
      const { cloneUsage, currentPage, ...queries } = await getQueries();
      const step = (currentPage - 1) * 100;
      try {
        const response = await fetchMonstaMarket({
          step,
          cloneUsage
        });
        const monstaArray = response.map((monstas) => ({
          ...getDetail(monstas)
        }));
        setLastFetchedMonstas(monstaArray);
        setMonstas(filterDisabledMonstas(monstaArray, queries));
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    }
  }, [router.query]);

  const loading = lastFetchedMonstas.length > 0 && monstas.length < 100;

  useEffect(async () => {
    if (loading) {
      const { cloneUsage, ...queries } = await getQueries();
      try {
        const step = steps * 100;
        setSteps(steps + 1);
        const response = await fetchMonstaMarket({
          step,
          cloneUsage
        });
        const monstaArray = response.map((monstas) => ({
          ...getDetail(monstas)
        }));
        setLastFetchedMonstas(monstaArray);

        setMonstas(filterDisabledMonstas(monstas.concat(monstaArray), queries));
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
  }, [monstas]);

  const applyTag = ({ monsta, tag }) => ({ ...monsta, [tag]: true });

  const disableNonMatchingClasses = (classType) => (monsta) => {
    return classType && monsta.class.toLowerCase() !== classType
      ? applyTag({ monsta, tag: 'disabled' })
      : monsta;
  };

  const disableNonMatchingPureness = (pureness) => (monsta) => {
    return monsta.pureness >= pureness ? monsta : applyTag({ monsta, tag: 'disabled' });
  };

  const disableNonMatchingGenes = () => (monsta) => {
    const geneticQueries = Object.keys(router.query).filter((q) => {
      return q.split('_').length > 1;
    });
    const resulted = geneticQueries.reduce((result, genQuery) => {
      const splittedGen = genQuery.split('_');
      const part = splittedGen[0];
      const gen = splittedGen[1];
      if (result?.disabled) {
        return result;
      }
      if (monsta[part][gen].class.toLowerCase() !== router.query[genQuery]) {
        return applyTag({ monsta, tag: 'disabled' });
      }
      return result;
    }, monsta);
    return resulted;
  };

  const applyDisabledMonstas = (monstas = [], queries) => {
    return _.chain(monstas)
      .map(disableNonMatchingClasses(queries?.classType))
      .map(disableNonMatchingPureness(queries?.pureness))
      .map(disableNonMatchingGenes(queries))
      .value();
  };
  const filterDisabledMonstas = (monstaArray, queries) => {
    const markedDisabledMonstas = applyDisabledMonstas(monstaArray, queries);
    const filterDisabledMonstas = markedDisabledMonstas.filter((monsta) => !monsta.disabled);
    return filterDisabledMonstas;
  };
  //

  const { totalPages, pageContent } = usePageContent(monstas, 25);

  const getFilters = () => (
    <>
      <FilterDrawer title="Genetic" defaultOpen>
        {monstaParts.map((part, idx) => (
          <BodyPartSelect key={idx} name={part} part={part} />
        ))}
      </FilterDrawer>
      <FilterDrawer title="Class">
        <ClassesCheckboxes name="class" queryString="class" />
      </FilterDrawer>
      <FilterDrawer title={`Clone Usage & Purity`}>
        <SliderWMarks
          min={0}
          max={4}
          step={1}
          queryString="cloneUsage"
          defaultValue={[0, 4]}
          customMarks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 }}
          label="Clone Usage"
        />
        <SliderWMarks
          min={0}
          max={6}
          step={1}
          queryString="pureness"
          customMarks={{ 0: 'Any', 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }}
          defaultValue="0"
          label="Purity"
        />
      </FilterDrawer>
    </>
  );

  return (
    <Layout>
      <Head>
        <title>Rinocu | Monsta | Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-gray-800 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-gray-900 p-2 rounded-md flex items-center justify-center text-gray-400 rounded hover:text-white hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Filters */}
              <div className="mt-4  border-gray-600">
                {router.isReady && <div className="mx-2">{getFilters()}</div>}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="relative z-10 flex lg:hidden items-baseline justify-end pt-0">
        <h1 className="sr-only">monsta infinite marketplace</h1>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-2 text-gray-400 hover:text-white lg:hidden bg-gray-900 hover:bg-gray-600 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FilterIcon className="ml-0 mr-2 w-4 h-4" aria-hidden="true" />
          <span className="">Filters</span>
        </button>
      </div>

      <section aria-labelledby="products-heading" className="pt-2">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
          {/* Filters */}
          <div className="hidden lg:block lg:col-span-1">{router.isReady && getFilters()}</div>

          {/* Product grid */}
          <div className="lg:col-span-4">
            {/* Replace with your content */}
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" /> */}
            {monstas.length === 0 && <FilterBodyPlaceholder loading={initialLoading || loading} />}
            {monstas.length > 0 && (
              <>
                <div className="flex flex-wrap justify-center">
                  {pageContent.map((monsta, idx) => (
                    <MonstaCard key={idx} {...monsta} />
                  ))}
                </div>
                <div className={classNames('flex items-center justify-center text-6xl mt-6')}>
                  {loading && <AnimatedSpinLoading size={8} />}
                </div>

                <Pagination totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </section>

      {/*  */}
    </Layout>
  );
}
