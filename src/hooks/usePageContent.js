import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { canUseDOM, getSteps, setSearchParam } from '../utils/helpers';
const usePageContent = (items, itemsPerPage = 25) => {
  const [pageContent, setPageContent] = useState([]);
  const router = useRouter();
  const totalPages = getSteps(items.length, itemsPerPage);
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
  useEffect(() => {
    const currentPage = getCurrentPage();
    if (currentPage == 1) {
      setPageContent(items.slice(0, itemsPerPage));
    } else {
      setPageContent(items.slice((currentPage - 1) * itemsPerPage, itemsPerPage * currentPage));
    }
  }, [router.query.page]);
  useEffect(() => {
    if (items.length > 0) {
      const { url, as, options } = setSearchParam('page', 1);
      router.push(url, as, options);
      setPageContent(items.slice(0, itemsPerPage));
    }
  }, [items]);

  return {
    totalPages,
    pageContent
  };
};

export default usePageContent;
