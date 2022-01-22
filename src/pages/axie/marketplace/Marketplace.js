import { Fragment, useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon
} from '@heroicons/react/solid';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import ClassesCheckboxes from '../../../components/marketplace/ClassesCheckboxes';
import RangeSlider from '../../../components/marketplace/RangeSlider';
import Slider from '../../../components/marketplace/Slider';
import SliderWMarks from '../../../components/marketplace/SliderWMarks';
import StatSlider from '../../../components/marketplace/StatSlider';
import FilterDrawer from '../../../components/marketplace/FilterDrawer';
import BodyPartSelect from '../../../components/marketplace/BodyPartSelectAxie';
import FilterBodyPlaceholder from './components/FilterBodyPlaceholder';
import { axieParts } from '../../../utils/axie/helpers';
import getTotalAxiesForSale from '../../../services/axie/totalAxiesForSale';
import { canUseDOM, classNames } from '../../../utils/helpers';

const sortOptions = [
  // { name: 'Most Popular', href: '#', current: true },
  // { name: 'Best Rating', href: '#', current: false },
  // { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High (default)', href: '#', current: true }
  // { name: 'Price: High to Low', href: '#', current: false }
];
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' }
];
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false }
    ]
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false }
    ]
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true }
    ]
  }
];

const axieEnforcedFilters = ['eyes_f', 'ears_f', 'back_f', 'mouth_f', 'tail_f', 'horn_f'];

export default function Example() {
  const router = useRouter();
  console.log('ROUTER: ', router);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const getGraphVariables = () => {
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
        return pureness > 0 ? [pureness] : null;
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
        from: 0,
        owner: null,
        size: 100
      };
      return variables;
    }
  };

  const variables = getGraphVariables();
  const totalAxiesSWR = useSWR(variables, getTotalAxiesForSale);
  const totalAxies = totalAxiesSWR?.data?.total ?? 0;
  const totalAxiesLoading = totalAxiesSWR?.data ? false : true;

  useEffect(() => {
    totalAxiesSWR.mutate();
  }, [router.query]);

  const handleFilter = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      {/*  */}

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
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pb-3 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight">Marketplace</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium hover:text-gray-400">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 group-hover:text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View grid</span>
              <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              {/* <FilterTabs onChange={handleChangeTab} tabs={filterTabs} /> */}
              {/* General */}
              <FilterDrawer title="Class" defaultOpen>
                <ClassesCheckboxes name="class" queryString="class" />
              </FilterDrawer>
              <FilterDrawer title="Genetic">
                <Slider
                  min={50}
                  max={100}
                  step={1}
                  queryString="genPurity"
                  defaultValue={50}
                  label="Genetic Purity"
                />
                {axieParts.map((part) => (
                  <BodyPartSelect name={part} part={part} />
                ))}
              </FilterDrawer>
              <FilterDrawer title={`Breed Count & Purity`} defaultOpen>
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
                  defaultValue={0}
                  label="Purity"
                />
              </FilterDrawer>
              <FilterDrawer title="Stats" defaultOpen>
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
              </FilterDrawer>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* Replace with your content */}
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" /> */}
              <FilterBodyPlaceholder
                totalAxies={totalAxies}
                loading={totalAxiesLoading}
                onClick={handleFilter}
              />
              {/* /End replace */}
            </div>
          </div>
        </section>
      </main>

      {/*  */}
    </Layout>
  );
}
