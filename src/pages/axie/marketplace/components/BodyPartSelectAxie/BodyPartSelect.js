import { useRef } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import axiePartsJson from '../../../../../utils/axie/parts.json';
import {
  capitalize,
  appendPartToSearchParam,
  removePartFromSearchParam,
  setSearchParam,
  deleteSearchParam,
  canUseDOM
} from '../../../../../utils/helpers';
import { getAxiePartIcon } from '../../../../../utils/axie/helpers';
import { XIcon } from '@heroicons/react/solid';
import { FilterIcon as FilterIconSolid } from '@heroicons/react/solid';

function getStyle(highlightedIndex, index, item, selectedItem) {
  const active = highlightedIndex === index;
  const selected = selectedItem === item;
  const baseStyles = {
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    paddingLeft: '4rem',
    paddingRight: '2.25rem',
    color: 'white',
    fontWeight: selected ? 'bold' : 'normal',
    position: 'relative',
    fontSize: '0.875rem',
    lineHeight: '1rem',
    width: '100%'
  };
  if (active) {
    return {
      ...baseStyles,
      backgroundColor: '#4F46E5',
      color: 'white'
    };
  }
  return {
    ...baseStyles,
    color: '#111827'
  };
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function BodyPartSelect(props) {
  const inputRef = useRef();
  const { part = '' } = props;
  const router = useRouter();

  const getDefaultValue = () => {
    let value;
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      if (params) {
        console.log('PARAMS: ', params);
        for (var pair of params.entries()) {
          const matchesCurrent = part === pair[1]?.split('-')[0];
          if (matchesCurrent) {
            const jsonPart = axiePartsJson[part][pair[1]];
            value = {
              value: jsonPart.partName,
              description: jsonPart.skillName,
              formValue: pair[1],
              class: jsonPart.class
            };
          } else {
            continue;
          }
        }
      }
    }
    return value;
  };
  const parts =
    part &&
    Object.entries(axiePartsJson[part]).map((part) => ({
      value: part[1]?.partName,
      description: part[1]?.skillName,
      formValue: part[0],
      class: part[1]?.class
    }));

  const handleSelect = async (selected) => {
    const formValue = selected?.formValue;
    if (formValue) {
      const { url, as, options } = appendPartToSearchParam('part', formValue);
      await router.push(url, as, options);
      const f = setSearchParam(`${part}_f`, true);
      await router.push(f.url, f.as, f.options);
    }
  };
  const handleClearSelection = (selectedItem, clearSelection) => async (e) => {
    e.preventDefault();
    const { formValue } = selectedItem;
    const { url, as, options } = removePartFromSearchParam(formValue);
    await router.push(url, as, options);
    const f = deleteSearchParam(`${part}_f`);
    await router.push(f.url, f.as, f.options);
    clearSelection();
    inputRef.current.focus();
  };

  const isFilterActive = () => {
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      return !!params.get(`${part}_f`);
    }
    return false;
  };
  const filterActive = isFilterActive();
  const handleEnforceFiltering = async (e) => {
    e.preventDefault();
    if (filterActive) {
      const { url, as, options } = deleteSearchParam(`${part}_f`);
      await router.push(url, as, options);
    } else {
      const { url, as, options } = setSearchParam(`${part}_f`, true);
      await router.push(url, as, options);
    }
  };

  return (
    <Downshift
      itemToString={(item) => (item ? item?.value : '')}
      onSelect={handleSelect}
      initialSelectedItem={getDefaultValue()}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection
      }) => {
        return (
          <div className="py-1 relative">
            <label className="block text-xs font-medium text-gray-400" {...getLabelProps()}>
              {capitalize(part)}
            </label>
            <div
              className="mt-1 w-full relative flex"
              {...getRootProps({}, { suppressRefError: true })}
            >
              <span className="absolute left-1 top-0.5">
                {getAxiePartIcon(part, selectedItem?.class)}
              </span>
              <input
                ref={inputRef}
                {...getInputProps()}
                className="w-full bg-gray-600 border border-gray-300 rounded-md shadow-sm pl-10 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs mr-2"
              />
              <span
                className={classNames(
                  selectedItem ? 'cursor-pointer absolute right-12 top-2.5' : 'hidden'
                )}
                onClick={handleClearSelection(selectedItem, clearSelection)}
              >
                <XIcon className="h-5 w-5" />
              </span>
              <button
                type="button"
                className={classNames(
                  'inline-flex items-center p-2 border-2 border-white rounded-md shadow-sm ',
                  selectedItem && filterActive
                    ? 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-600'
                    : selectedItem && !filterActive
                    ? 'cursor-pointer hover:border-gray-400 bg-white text-gray-400 border-gray-400 hover:text-gray-400 hover:bg-white active:bg-indigo-100'
                    : 'cursor-default bg-gray-400'
                )}
                onClick={handleEnforceFiltering}
              >
                <FilterIconSolid className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
            {isOpen && (
              <ul
                {...getMenuProps()}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
              >
                {isOpen && parts
                  ? matchSorter(parts, inputValue, {
                      keys: ['value', 'description', 'formValue', 'class']
                    }).map((item, index) => (
                      <li
                        key={index}
                        {...getItemProps({
                          key: item?.value,
                          index,
                          item,
                          style: getStyle(highlightedIndex, index, item, selectedItem)
                        })}
                      >
                        <span className="absolute left-1">
                          {getAxiePartIcon(part, item?.class)}
                        </span>
                        {item?.value}
                        <span className="text-xs block">{item?.description}</span>
                      </li>
                    ))
                  : null}
              </ul>
            )}
          </div>
        );
      }}
    </Downshift>
  );
}
