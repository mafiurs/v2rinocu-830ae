/* This example requires Tailwind CSS v2.0+ */
import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { utils } from 'ethers';
import _ from 'lodash';
import { useEffect, useState, useRef } from 'react';
import axieParts from '../../../../../utils/axie/parts.json';
import { getInputProps, canUseDOM, listFormattter } from '../../../../../utils/helpers';
import Input from '../../../../../components/atoms/Input';
import Button from '../../../../../components/atoms/Button';
import getAxiesGenes from '../../../../../services/axie/getAxiesGenes';
import { AppContext } from '../../../../../context';
const { formatEther } = utils;
export default function MatchingList({ onSubmitCB }) {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const [activeFilters, setActiveFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAxies, setLoadingAxies] = useState(false);

  useEffect(() => {
    if (router.query) {
      setActiveFilters(router.query);
    }
  }, [router.query]);
  const initialValues = {
    budget: null
  };
  const validationSchema = Yup.object({
    budget: Yup.number()
      .required('Required')
      .positive('Must be a positive number')
      .typeError('Must be a valid number, use "." (dot) for decimals')
  });
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
          if (true) {
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
        from: 0,
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
  const onSubmit = async ({ budget }) => {
    const { criteria } = getGraphVariables();
    const payload = { criteria, budget: Number(budget) };
    setLoading(true);
    try {
      const response = await axios.post('/api/fql/axie/postAxieAlert', payload);
      if (response.status === 200) {
        const err = response.data.data.error;
        if (err) {
          dispatch({
            type: 'setAlert',
            payload: { open: true, title: err, type: 'error' }
          });
          return;
        }
        dispatch({
          type: 'setAlert',
          payload: { open: true, title: 'Alert saved', type: 'success' }
        });
        await onSubmitCB();
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'setAlert',
        payload: { open: true, title: 'Something went wrong :(', type: 'error' }
      });
    } finally {
      setLoading(false);
    }
    // }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false
  });

  const partFilter = activeFilters?.part;
  const classAxie = activeFilters?.class;
  const purity =
    activeFilters?.pureness && activeFilters?.pureness != 0 ? activeFilters?.pureness : null;
  const breedCount = activeFilters?.breedCount;
  const getBreedCount = () => {
    const bCount = Array.isArray(breedCount) ? breedCount : null;
    return bCount && bCount.join(' to ');
  };
  const hp = activeFilters?.hp;
  const getHp = () => {
    const hpVal = Array.isArray(hp) ? hp : null;
    return hpVal && hpVal.join(' to ');
  };
  const speed = activeFilters?.speed;
  const getSpeed = () => {
    const speedVal = Array.isArray(speed) ? speed : null;
    return speedVal && speedVal.join(' to ');
  };
  const skill = activeFilters?.skill;
  const getSkill = () => {
    const skillVal = Array.isArray(skill) ? skill : null;
    return skillVal && skillVal.join(' to ');
  };
  const morale = activeFilters?.morale;
  const getMorale = () => {
    const moraleVal = Array.isArray(morale) ? morale : null;
    return moraleVal && moraleVal.join(' to ');
  };

  const getParts = () => {
    const parts = Array.isArray(partFilter) ? partFilter : partFilter ? [partFilter] : [];
    return parts.length > 0
      ? parts.map((part) => axieParts[part.split('-')[0]][part].partName)
      : ['Any'];
  };

  return (
    <div className="shadow-inner overflow-hidden sm:rounded-lg bg-gray-700">
      <div className="px-4 py-5 sm:px-4">
        <h3 className="text-lg leading-6 font-medium text-white">Alert Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-300">
          You will get notified of any axie listed matching the following:
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="border-t border-gray-500 px-4 py-5 sm:p-0">
        <dl className="divide-y divide-gray-500">
          {/* {parts.length > 0 && ( */}
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Parts</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {listFormattter.format(getParts())}
            </dd>
          </div>
          {/* )} */}

          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Class</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {classAxie || 'Any'}
            </dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Breed count</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {getBreedCount() || 'Any'}
            </dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Purity</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">{purity || 'Any'}</dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Health</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">{getHp() || 'Any'}</dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Speed</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {getSpeed() || 'Any'}
            </dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Skill</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {getSkill() || 'Any'}
            </dd>
          </div>
          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white">Morale</dt>
            <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
              {getMorale() || 'Any'}
            </dd>
          </div>

          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white flex items-center">Budget (ETH)</dt>
            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
              <Input
                {...getInputProps('budget', formik)}
                className="py-1"
                // label="Why?"
                placeholder="0.01"
              />
            </dd>
            <span className="text-xs text-gray-300 sm:col-span-3">
              Any axie listed with a price below or equal to the specified amount will be alerted
            </span>
          </div>

          <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt className="text-sm font-medium text-white flex items-center sm:col-span-2"></dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex justify-end">
              <Button
                type="submit"
                label="Submit"
                inverted
                size="sm"
                className="mt-1"
                loading={loading}
              />
            </dd>
          </div>
        </dl>
      </form>
    </div>
  );
}
