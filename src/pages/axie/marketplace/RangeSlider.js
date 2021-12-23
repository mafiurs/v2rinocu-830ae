import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import _ from 'lodash';
import { useRouter } from 'next/router';
const { Range } = Slider;
import { canUseDOM, range } from '../../../utils/helpers';

export default function RangeSlider(props) {
  console.log('props: ', props);
  const { label, max, min, step = 1, queryString = '', customMarks, defaultValue } = props;

  const marks =
    customMarks ??
    [min]
      .concat(range(max).map((n) => n + step))
      .reduce((result, val) => ({ ...result, [val]: val }), {});

  const getValue = () => {
    let defVal = [];
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      for (var pair of params.entries()) {
        if (pair[0] === queryString) {
          defVal.push(Number(pair[1]));
        }
      }
    }
    return !_.isEmpty(defVal) ? defVal : defaultValue;
  };
  const [value, setValue] = useState([min, max]);

  const router = useRouter();
  function handleChange(value) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.delete(queryString);
    value.forEach((val) => {
      params.append(queryString, val);
    });
    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);

  return (
    <>
      {label && <legend className="text-xs text-gray-400 mt-1">{label}</legend>}
      <div className="text-xs mt-2 space-y-1 ml-2 mr-2 mb-8">
        {value && (
          <Range
            dots
            step={step}
            defaultValue={[min, max]}
            value={value}
            max={max}
            onChange={handleChange}
            marks={marks}
            trackStyle={[
              { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
              { backgroundColor: 'green', borderColor: '#3B82F6' }
            ]}
            handleStyle={[{ borderColor: '#3B82F6' }, { borderColor: '#3B82F6' }]}
            // dotStyle={{ borderColor: '#3B82F6' }}
          />
        )}
      </div>
    </>
  );
}