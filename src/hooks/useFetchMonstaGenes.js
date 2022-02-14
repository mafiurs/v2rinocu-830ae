/* global BigInt */
import { useState } from 'react';
import { fetchMonstaGenes, fetchMonstaSvg } from '../services/monsta';
import { getTraits } from '../utils/monsta/helpers';

const genesToBin = (genes) => BigInt(genes).toString(2).padStart(256, '0');
export const useFetchMonstaGenes = () => {
  const [fetchState, setFetchState] = useState({
    fetched: false,
    loading: false,
    error: false,
    response: []
  });

  const fetchGenes = async (ids) => {
    setFetchState({ loading: true });
    const promises = ids.map((id) => fetchMonstaGenes(id));
    try {
      const [first, second] = await Promise.all([...promises]);
      let sire, matron, result;
      if (first && first[0]) {
        sire = first && first[0];
        sire = getDetail(sire);
        const genesBin = sire.genes;
        const svg = await fetchMonstaSvg(genesBin);
        sire = { ...sire, svg };
        result = [sire];
      }
      if (second && second[0]) {
        matron = second && second[0];
        matron = getDetail(matron);
        result = [...result, matron];
      }
      setFetchState({ response: result, loading: false, fetched: true });
    } catch (err) {
      console.error(err);
      setFetchState({ err, loading: false, fetched: false });
    }
  };

  return [{ ...fetchState, fetchGenes }, setFetchState];
};

const getDetail = (monsta) => {
  const genesBin = genesToBin(monsta.genes);
  return {
    ...monsta,
    ...getTraits(genesBin),
    genes: BigInt(monsta.genes).toString(2).padStart(256, '0')
  };
};
