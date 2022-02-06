import { useRef } from 'react';
import { useRouter } from 'next/router';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import monstaPartsJson from '../../../../../utils/monsta/parts.json';
import {
  capitalize,
  appendPartToSearchParam,
  setSearchParam,
  deleteSearchParam,
  canUseDOM
} from '../../../../../utils/helpers';
import { getMonstaPartIcon, getMonstaColor } from '../../../../../utils/monsta/helpers';
import { XIcon } from '@heroicons/react/solid';

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
      const paramPart = params.get(`${part}_d`);
      if (paramPart) {
        const jsonPart = monstaPartsJson[part][paramPart];
        value = {
          value: jsonPart.partName,
          description: jsonPart.skillName,
          formValue: paramPart,
          class: jsonPart.class
        };
      }
    }
    return value;
  };

  const parts =
    part &&
    Object.entries(monstaPartsJson[part]).map((part) => ({
      value: part[1]?.partName,
      description: part[1]?.skillName,
      formValue: part[0],
      class: part[1]?.class
    }));

  const handleSelect = async (selected) => {
    const formValue = selected?.formValue;
    if (formValue) {
      const { url, as, options } = appendPartToSearchParam(`${part}_d`, formValue);
      await router.push(url, as, options);
    }
  };
  const handleClearSelection = (selectedItem, clearSelection) => async (e) => {
    e.preventDefault();
    const { url, as, options } = deleteSearchParam(`${part}_d`);
    await router.push(url, as, options);
    const r1 = deleteSearchParam(`${part}_r1`);
    await router.push(r1.url, r1.as, r1.options);
    const r2 = deleteSearchParam(`${part}_r2`);
    await router.push(r2.url, r2.as, r2.options);
    clearSelection();
    inputRef.current.focus();
  };
  const isR1FilterActive = () => {
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      return !!params.get(`${part}_r1`);
    }
    return false;
  };
  const isR2FilterActive = () => {
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      return !!params.get(`${part}_r2`);
    }
    return false;
  };
  const r1FilterActive = isR1FilterActive();
  const r2FilterActive = isR2FilterActive();

  const handleEnforceR1Filtering = (selectedItem) => async (e) => {
    const { formValue } = selectedItem;
    e.preventDefault();
    if (r1FilterActive) {
      const { url, as, options } = deleteSearchParam(`${part}_r1`);
      await router.push(url, as, options);
    } else {
      const { url, as, options } = setSearchParam(`${part}_r1`, formValue);
      await router.push(url, as, options);
    }
  };
  const handleEnforceR2Filtering = (selectedItem) => async (e) => {
    const { formValue } = selectedItem;
    e.preventDefault();
    if (r2FilterActive) {
      const { url, as, options } = deleteSearchParam(`${part}_r2`);
      await router.push(url, as, options);
    } else {
      const { url, as, options } = setSearchParam(`${part}_r2`, formValue);
      await router.push(url, as, options);
    }
  };

  return (
    <Downshift
      itemToString={(item) => (item ? item.value : '')}
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
        clearItems,
        clearSelection,
        ...rest
      }) => {
        const monstaColor = getMonstaColor(selectedItem?.class);

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
                {getMonstaPartIcon(part, selectedItem?.class, monstaColor)}
              </span>
              <input
                ref={inputRef}
                {...getInputProps()}
                className="w-full bg-gray-600 border border-gray-300 rounded-md shadow-sm pl-10 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs mr-2"
              />
              <span
                className={classNames(
                  selectedItem ? 'cursor-pointer absolute right-24 top-2.5' : 'hidden'
                )}
                onClick={handleClearSelection(selectedItem, clearSelection)}
              >
                <XIcon className="h-5 w-5" />
              </span>
              <button
                type="button"
                className={classNames(
                  'ml-1 inline-flex items-center p-2 border-2 border-white rounded-md shadow-sm text-xs',
                  selectedItem && r1FilterActive
                    ? 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-600'
                    : selectedItem && !r1FilterActive
                    ? 'cursor-pointer hover:border-gray-400 bg-white text-gray-400 border-gray-400 hover:text-gray-400 hover:bg-white active:bg-indigo-100'
                    : 'cursor-default bg-gray-400'
                )}
                onClick={handleEnforceR1Filtering(selectedItem)}
              >
                R1
              </button>
              <button
                type="button"
                className={classNames(
                  'ml-1 inline-flex items-center p-2 border-2 border-white rounded-md shadow-sm text-xs',
                  selectedItem && r2FilterActive
                    ? 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-600'
                    : selectedItem && !r2FilterActive
                    ? 'cursor-pointer hover:border-gray-400 bg-white text-gray-400 border-gray-400 hover:text-gray-400 hover:bg-white active:bg-indigo-100'
                    : 'cursor-default bg-gray-400'
                )}
                onClick={handleEnforceR2Filtering(selectedItem)}
              >
                R2
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
                          key: item.value,
                          index,
                          item,
                          style: getStyle(highlightedIndex, index, item, selectedItem)
                        })}
                      >
                        <span className="absolute left-1">
                          {getMonstaPartIcon(part, item?.class, getMonstaColor(item?.class))}
                        </span>
                        {item.value}
                        <span className="text-xs block">{item.description}</span>
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
