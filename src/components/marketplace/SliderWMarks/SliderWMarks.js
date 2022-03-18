import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { canUseDOM, range, getRouteParams } from '../../../utils/helpers';

export default function RangeSlider(props) {
  const { label, max, min, step = 1, queryString = '', customMarks, defaultValue = 0 } = props;

  const marks =
    customMarks ??
    [min]
      .concat(range(max).map((n) => n + step))
      .reduce((result, val) => ({ ...result, [val]: val }), {});

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
    let currentUrl = new URL(window.location.href);
    let params = new URLSearchParams(currentUrl.search);
    params.set(queryString, value);
    const { url, as, options } = getRouteParams(params);
    router.push(url, as, options);
  }

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);
  return (
    <>
      {label && <legend className="text-xs text-gray-400 mt-1">{label}</legend>}

      {router.isReady && value && (
        <div className="text-xs mt-2 space-y-1 ml-2 mr-2 mb-6">
          <Slider
            min={min}
            max={max}
            marks={marks}
            included={false}
            defaultValue={getValue()}
            onAfterChange={handleChange}
            trackStyle={{ backgroundColor: '#3B82F6' }}
            handleStyle={{
              borderColor: '#3B82F6'
            }}
          />
        </div>
      )}
    </>
  );
}
