import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter';
import axiePartsJson from '../../../../../utils/axie/parts.json';
import {
  capitalize,
  appendPartToSearchParam,
  removePartFromSearchParam
} from '../../../../../utils/helpers';
import { getAxiePartIcon } from '../../../../../utils/axie/helpers';
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
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let value;
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
    return value;
  };

  const parts = Object.entries(axiePartsJson[part]).map((part) => ({
    value: part[1]?.partName,
    description: part[1]?.skillName,
    formValue: part[0],
    class: part[1]?.class
  }));

  const handleSelect = (selected) => {
    const formValue = selected?.formValue;
    if (formValue) {
      router.push(appendPartToSearchParam('part', formValue));
    }
  };
  const handleClearSelection = (selectedItem, clearSelection) => (e) => {
    e.preventDefault();
    const { formValue } = selectedItem;
    router.push(removePartFromSearchParam(formValue));
    clearSelection();
    inputRef.current.focus();
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
        return (
          <div className="max-w-xs py-1 relative">
            <label className="block text-xs font-medium text-gray-400" {...getLabelProps()}>
              {capitalize(part)}
            </label>
            <div
              style={{ display: 'inline-block' }}
              className="mt-1 max-w-xs w-full relative"
              {...getRootProps({}, { suppressRefError: true })}
            >
              <span className="absolute left-1 top-1">
                {getAxiePartIcon(part, selectedItem?.class)}
              </span>
              <input
                ref={inputRef}
                {...getInputProps()}
                className="w-full bg-gray-600 border border-gray-300 rounded-md shadow-sm pl-10 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <span
                className={classNames(
                  selectedItem ? 'cursor-pointer absolute right-2 top-3' : 'hidden'
                )}
                onClick={handleClearSelection(selectedItem, clearSelection)}
              >
                <XIcon className="h-5 w-5" />
              </span>
            </div>
            {isOpen && (
              <ul
                {...getMenuProps()}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
              >
                {isOpen
                  ? matchSorter(parts, inputValue, {
                      keys: ['value', 'description', 'formValue', 'class']
                    }).map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: getStyle(highlightedIndex, index, item, selectedItem)
                        })}
                      >
                        <span className="absolute left-1">
                          {getAxiePartIcon(part, item?.class)}
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
