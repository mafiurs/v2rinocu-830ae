import { useState, useEffect } from 'react';
/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { canUseDOM, getSteps, setSearchParam } from '../../../utils/helpers';
export default function Pagination({
  // onPrevious = () => {},
  // onNext = () => {},
  totalPages = 10
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const getCurrentPage = () => {
    let val;
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      const paramPage = params.get('page');

      val = paramPage ? paramPage : 1;
    }
    return val > totalPages ? 1 : val < 1 ? 1 : val;
  };
  const [page, setPage] = useState(getCurrentPage());

  const router = useRouter();
  useEffect(() => {
    if (canUseDOM) {
      setPage(getCurrentPage());
    }
  }, [router.query]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { url, as, options } = setSearchParam('page', e.target.value);
      router.push(url, as, options);
      e.preventDefault();
      scrollToTop();
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setPage(e.target.value);
  };
  const handleBlur = (e) => {
    e.preventDefault();
    setPage(getCurrentPage());
  };
  const onPrevious = (e) => {
    const prevPage = page - 1;
    if (prevPage <= 1) {
      const { url, as, options } = setSearchParam('page', 1);
      router.push(url, as, options);
      scrollToTop();
      return;
    }
    const { url, as, options } = setSearchParam('page', prevPage);
    router.push(url, as, options);
    scrollToTop();
  };
  const onNext = (e) => {
    const nextPage = Number(page) + 1;
    if (nextPage > totalPages) {
      const { url, as, options } = setSearchParam('page', totalPages);
      router.push(url, as, options);
      scrollToTop();
      return;
    }
    const { url, as, options } = setSearchParam('page', nextPage);
    router.push(url, as, options);
    scrollToTop();
  };
  return (
    <div className="mt-8 flex justify-center relative">
      <div className="flex items-center text-xs">
        <button
          onClick={onPrevious}
          className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-gray-600 hover:border-gray-100 active:border-gray-100 bg-gray-5 hover:bg-gray-700 active:bg-gray-6"
        >
          <span className="visible">
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
        <span className="ml-4">Page</span>
        <form className="inline-block ml-1 mr-1" wtx-context="0433953B-B840-4C62-A488-FA2A96146EEE">
          <div className="input-group inline-block rounded relative w-full">
            <input
              defaultValue={page}
              value={page}
              size="28"
              type="number"
              min="1"
              max="24785"
              className="w-8 rounded bg-gray-800 px-1 py-1 border transition text-14 input-field border-gray-3 focus:border-primary-4 bg-gray-6 text-white"
              onKeyPress={handleKeyDown}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </form>
        <span className="mr-4"> of {totalPages}</span>
        <button
          onClick={onNext}
          className="px-2 py-2 relative rounded transition focus:outline-none border text-white border-gray-600 hover:border-gray-100 active:border-gray-100 bg-gray-5 hover:bg-gray-700 active:bg-gray-6"
        >
          <span className="visible">
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}
