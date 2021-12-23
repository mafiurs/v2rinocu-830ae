import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { canUseDOM, range } from '../../../utils/helpers';
import { getStatIcon, getStatColor } from '../../../utils/axie/helpers';

export default function RangeSlider(props) {
  const { label, max, min, step = 1, queryString = '', defaultValue = 0 } = props;

  const getValue = () => {
    let defVal = null;
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      defVal = params.get(queryString);
    }
    return !_.isEmpty(defVal) ? defVal : defaultValue;
  };
  const [value, setValue] = useState([min, max]);

  const router = useRouter();
  function handleChange(value) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set(queryString, value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);
  const icon = getStatIcon(queryString);
  const barColor = getStatColor(queryString);
  console.log('icon: ', icon);
  return (
    <>
      {/* {label && <legend className="text-xs text-gray-400 mt-1">{label}</legend>} */}
      <div className="text-xs mt-2  ml-2 mr-2 ">
        {getStatIcon(queryString)}
        {value && (
          <Slider
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            trackStyle={{ backgroundColor: barColor }}
            handleStyle={{
              borderColor: barColor
            }}
          />
        )}
        {value}
      </div>
    </>
  );
}
