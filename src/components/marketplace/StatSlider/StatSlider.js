import React, { useEffect, useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { canUseDOM, range, getRouteParams } from '../../../utils/helpers';
import { getStatIcon, getStatColor } from '../../../utils/axie/helpers';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export default function RangeSlider(props) {
  const { label, max, min, step = 1, queryString = '', defaultValue = 0 } = props;

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
    let currentUrl = new URL(window.location.href);
    let params = new URLSearchParams(currentUrl.search);
    params.delete(queryString);
    value.forEach((val) => {
      params.append(queryString, val);
    });
    const { url, as, options } = getRouteParams(params);
    router.push(url, as, options);
  }

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);
  const barColor = getStatColor(queryString);
  return (
    <>
      {label && <legend className="text-xs text-gray-400 mt-1">{label}</legend>}
      <div className="text-xs mt-1.5 relative">
        <div className="absolute -top-1 left-0">{getStatIcon(queryString)}</div>
        <div className="ml-7 mr-2">
          {router.isReady && value && (
            <Range
              min={min}
              max={max}
              step={step}
              defaultValue={getValue()}
              onAfterChange={handleChange}
              trackStyle={{ backgroundColor: barColor }}
              handleStyle={[
                {
                  borderColor: barColor,
                  height: 12,
                  width: 12,
                  marginTop: -4
                },
                {
                  borderColor: barColor,
                  height: 12,
                  width: 12,
                  marginTop: -4
                }
              ]}
              trackStyle={[
                { backgroundColor: barColor, borderColor: barColor },
                { backgroundColor: barColor, borderColor: barColor }
              ]}
              handle={handle}
            />
          )}
          <div className="mr-0 text-xs text-gray-400 flex justify-between">
            {value.map((val) => (
              <span style={{ fontSize: '0.625rem' }}>{val}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
