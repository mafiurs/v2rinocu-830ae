import React, { useEffect, useState } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { canUseDOM, setSearchParam } from '../../../utils/helpers';

export default function RangeSlider(props) {
  const { label, max, min, queryString = '', defaultValue } = props;

  const SliderWithTooltip = createSliderWithTooltip(Slider);

  const getValue = () => {
    let defVal = defaultValue;
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      defVal = params.get(queryString);
    }
    return !_.isEmpty(defVal) ? defVal : defaultValue;
  };

  const [value, setValue] = useState(defaultValue);

  const router = useRouter();

  function handleChange(value) {
    const { url, as, options } = setSearchParam(queryString, value);
    router.push(url, as, options);
  }

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);

  function percentFormatter(v) {
    return `${v} %`;
  }

  return (
    <>
      {label && (
        <legend className="text-xs text-gray-400 mt-1">
          {label} {'->'} {getValue()}%
        </legend>
      )}
      <div className="text-xs mt-2 space-y-1 ml-2 mr-2 mb-1">
        {value && (
          <SliderWithTooltip
            tipFormatter={percentFormatter}
            min={min}
            max={max}
            onAfterChange={handleChange}
            defaultValue={getValue()}
            trackStyle={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}
            handleStyle={({ borderColor: '#3B82F6' }, { borderColor: '#3B82F6' })}
          />
        )}
        <div className="mr-0 text-xs text-gray-400 flex justify-between">
          <span style={{ fontSize: '0.625rem' }}>{min}%</span>
          <span style={{ fontSize: '0.625rem' }}>{max}%</span>
        </div>
      </div>
    </>
  );
}
