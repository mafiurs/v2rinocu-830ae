import React from 'react';
import Slider from 'rc-slider';
const { Range } = Slider;

import 'rc-slider/assets/index.css';
const style = { width: 400, margin: 50 };

export default function RangeSlider() {
  function log(value) {
    console.log(value); //eslint-disable-line
  }

  return (
    <>
      <legend className="text-xs text-gray-400 mt-1">Breed count</legend>
      <div className="text-xs mt-2 space-y-1 ml-2 mr-2 mb-8">
        <Range
          dots
          step={1}
          defaultValue={[0, 7]}
          max={7}
          onAfterChange={log}
          marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 }}
        />
      </div>
    </>
  );
}
