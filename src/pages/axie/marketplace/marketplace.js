import { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { FilterIcon } from '@heroicons/react/solid';
import { InformationCircleIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import ClassesCheckboxes from './components/ClassesCheckboxes';
import RangeSlider from '../../../components/marketplace/RangeSlider';
import Slider from '../../../components/marketplace/Slider';
import SliderWMarks from '../../../components/marketplace/SliderWMarks';
import StatSlider from '../../../components/marketplace/StatSlider';
import FilterDrawer from '../../../components/marketplace/FilterDrawer';
import BodyPartSelect from './components/BodyPartSelectAxie';
import Pagination from '../../../components/marketplace/Pagination';
import FilterBodyPlaceholder from './components/FilterBodyPlaceholder';
import AxieCard from './components/AxieCard';
import { axieParts } from '../../../utils/axie/helpers';
import getTotalAxiesForSale from '../../../services/axie/totalAxiesForSale';
import getAxiesGenes from '../../../services/axie/getAxiesGenes';
import { canUseDOM, getSteps, PROBABILITIES } from '../../../utils/helpers';
import getOptimalCombination from '../../../utils/optimalCombination';
import { filterResults } from '../../../utils/axie/marketFilter';
import usePageContent from '../../../hooks/usePageContent';

const axieEnforcedFilters = ['eyes_f', 'ears_f', 'back_f', 'mouth_f', 'tail_f', 'horn_f'];

function Marketplace(props) {
  const router = useRouter();
  const [totalAxies, setTotalAxies] = useState({ loading: false, error: null, data: 0 });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [axies, setAxies] = useState({
    loading: false,
    error: null,
    data: []
  });
  const { totalPages, pageContent } = usePageContent(axies.data, 25);
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
          breedCount: parseArrayNumbers(getArrayParams('breedCount', null)),
          breedable: null,
          classes: getSingleParam('class', null),
          hp: parseArrayNumbers(getArrayParams('hp', [])),
          morale: parseArrayNumbers(getArrayParams('morale', [])),
          numJapan: null,
          numMystic: null,
          numXmas: null,
          parts: getPartsToFilter(),
          pureness: getPureness(),
          purity: [],
          region: null,
          skill: parseArrayNumbers(getArrayParams('skill', [])),
          speed: parseArrayNumbers(getArrayParams('speed', [])),
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
  const oldQuery = _.omit(prevQueryRef.current, ['page', 'genPurity', 'part']);

  const getTotalAxies = async () => {
    setAxies({ ...axies, data: [] });
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
    const newQuery = _.omit(router.query, ['page', 'genPurity', 'part']);
    if (!_.isEqual(oldQuery, newQuery)) {
      await getTotalAxies();
    }
  }, [router.query]);

  const handleFilter = async (e) => {
    setAxies({ ...axies, loading: true });
    e.preventDefault();
    if (totalAxies?.data > 0) {
      let url = new URL(window.location.href);
      let urlParams = new URLSearchParams(url.search);
      const genPurityParam = urlParams.get('genPurity');
      const selectedPartsParam = urlParams.getAll('part');
      const selectedParts = !_.isEmpty(selectedPartsParam) ? selectedPartsParam : [];
      const geneticPureness = genPurityParam ? Number(genPurityParam) : 50;
      const steps = getSteps(totalAxies?.data);
      const getAxiesGenesPromises = [...Array(steps).keys()].map((step) => {
        const vars = getGraphVariables({ from: step });
        return getAxiesGenes(vars);
      });
      const allAxies = await Promise.all(getAxiesGenesPromises);
      const clearedAllAxies = allAxies.filter((arr) => Array.isArray(arr)).flat();
      const filteredAxies = filterResults(clearedAllAxies, geneticPureness, selectedParts);
      setAxies({ ...axies, data: filteredAxies, loading: false });
    }
  };

  const getminGenesStructure = () => {
    let minGenes = {};
    if (canUseDOM) {
      const probsKeys = Object.values(PROBABILITIES);
      let url = new URL(window.location.href);
      let urlParams = new URLSearchParams(url.search);
      const parts = urlParams.getAll('part');
      const totalSelParts = parts?.length || 0;
      const allProbs = [...Array(totalSelParts).keys()].map(() => [...probsKeys]).flat();
      const genPurity = urlParams.get('genPurity');
      const geneticPureness = genPurity ? Number(genPurity) : 50;
      const fullPureness = totalSelParts * 50;
      const minPureness = (fullPureness * geneticPureness) / 100;

      if (allProbs.length > 0 && minPureness) {
        const sum = getOptimalCombination(allProbs, minPureness);

        sum.forEach((n) => {
          for (const [key, value] of Object.entries(PROBABILITIES)) {
            if (n === value) {
              const keyVal = key;
              if (!_.get(minGenes, keyVal)) {
                minGenes[keyVal] = [keyVal];
              } else {
                minGenes[keyVal].push(keyVal);
              }
            }
          }
        });
      }
      return minGenes;
    }
  };

  const mGenes = useMemo(() => {
    return getminGenesStructure();
  }, [router.query]);

  const getFilters = () => (
    <>
      <FilterDrawer title="Genetic" defaultOpen>
        <Slider
          min={50}
          max={100}
          step={1}
          queryString="genPurity"
          defaultValue={50}
          label="Genetic Pureness"
        />
        <div className="rounded-md bg-gray-700 p-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-4 w-4 text-gray-200" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p
                className="text-gray-200"
                style={{
                  fontSize: '0.65rem',
                  lineHeight: '1rem'
                }}
              >
                The {'"'}Genetic Pureness{'"'} represents the quality of the genes matching the
                parts selected below.
              </p>
            </div>
          </div>
          {/* {minGenes.filter()} */}
          {!_.isEmpty(mGenes) && (
            <div className="p-1 ml-7 mr-2 rounded bg-gray-800">
              {axieParts.map((part, idx) => (
                <div key={idx} className="flex justify-between">
                  <span
                    className="w-1/3 whitespace-nowrap truncate font-semibold text-gray-200"
                    style={{
                      fontSize: '0.65rem',
                      lineHeight: '1rem'
                    }}
                  >
                    {mGenes?.d && mGenes?.d.length >= idx + 1 && 'Dominant'}
                  </span>
                  <span
                    className="w-1/3 whitespace-nowrap truncate font-semibold"
                    style={{
                      fontSize: '0.65rem',
                      lineHeight: '1rem'
                    }}
                  >
                    {mGenes?.r1 && mGenes?.r1.length >= idx + 1 && 'Recessive 1'}
                  </span>
                  <span
                    className="w-1/3 whitespace-nowrap truncate font-semibold"
                    style={{
                      fontSize: '0.65rem',
                      lineHeight: '1rem'
                    }}
                  >
                    {mGenes?.r2 && mGenes?.r2.length >= idx + 1 && 'Recessive 2'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {axieParts.map((part, idx) => (
          <BodyPartSelect key={idx} name={part} part={part} />
        ))}
      </FilterDrawer>
      <FilterDrawer title="Class">
        <ClassesCheckboxes name="class" queryString="class" />
      </FilterDrawer>

      <FilterDrawer title={`Breed Count & Purity`}>
        <RangeSlider
          min={0}
          max={7}
          step={1}
          queryString="breedCount"
          defaultValue={[0, 7]}
          label="Breed Count"
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
      <FilterDrawer title="Stats">
        <>
          <StatSlider
            min={27}
            max={61}
            step={1}
            queryString="hp"
            defaultValue={[27, 61]}
            label="Health"
          />
          <StatSlider
            min={27}
            max={61}
            step={1}
            queryString="speed"
            defaultValue={[27, 61]}
            label="Speed"
          />
          <StatSlider
            min={27}
            max={61}
            step={1}
            queryString="skill"
            defaultValue={[27, 61]}
            label="Skill"
          />
          <StatSlider
            min={27}
            max={61}
            step={1}
            queryString="morale"
            defaultValue={[27, 61]}
            label="Morale"
          />
        </>
      </FilterDrawer>
    </>
  );

  return (
    <Layout>
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

              {/* Filters mobile*/}
              <div className="mt-4 border-gray-600">
                {router.isReady && <div className="mx-2">{getFilters()}</div>}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="relative z-10 flex lg:hidden items-baseline justify-end pt-0">
        <h1 className="sr-only">Axie Infinity marketplace</h1>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-2 text-gray-400 hover:text-white lg:hidden bg-gray-900 hover:bg-gray-600 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FilterIcon className="ml-0 mr-2 w-4 h-4" aria-hidden="true" />
          <span className="">Filters</span>
        </button>
      </div>

      <section aria-labelledby="products-heading" className="pt-2 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
          {/* Filters  desktop*/}
          <div className="hidden lg:block">{router.isReady && getFilters()}</div>

          {/* Product grid */}
          <div className="lg:col-span-4">
            {/* Replace with your content */}
            {axies.data.length === 0 && (
              <FilterBodyPlaceholder
                totalAxies={totalAxies?.data}
                loading={totalAxies?.loading}
                loadingAxies={axies?.loading}
                onClick={handleFilter}
              />
            )}
            {axies.data.length > 0 && (
              <>
                <div className="flex flex-wrap justify-center">
                  {pageContent.map((axie, idx) => (
                    <AxieCard key={idx} {...axie} />
                  ))}
                </div>
                <Pagination totalPages={totalPages} />
              </>
            )}
            {/* /End replace */}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Marketplace;
