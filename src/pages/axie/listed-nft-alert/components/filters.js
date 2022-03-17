import _ from 'lodash';
import ClassesCheckboxes from './ClassesCheckboxes';
import RangeSlider from '../../../../components/marketplace/RangeSlider';
import SliderWMarks from '../../../../components/marketplace/SliderWMarks';
import StatSlider from '../../../../components/marketplace/StatSlider';
import FilterDrawer from '../../../../components/marketplace/FilterDrawer';
import BodyPartSelect from './BodyPartSelectAxie';
import { axieParts } from '../../../../utils/axie/helpers';

const Filters = () => (
  <>
    <div className="flex space-x-5">
      <h2 className="text-base">Filters</h2>
      <button
        className="text-blue-600 text-sm"
        onClick={() => {
          window.location.replace(`${window.location.pathname}`);
        }}
      >
        Reset
      </button>
    </div>
    <FilterDrawer title="Parts" defaultOpen>
      {axieParts.map((part, idx) => (
        <BodyPartSelect key={idx} name={part} part={part} filterToggle={false} />
      ))}
    </FilterDrawer>
    <FilterDrawer title="Class">
      <ClassesCheckboxes name="class" queryString="class" />
    </FilterDrawer>

    <FilterDrawer title={`Breed Count & Purity`}>
      <RangeSlider
        min={0}
        max={7}
        step={1}
        queryString="breedCount"
        defaultValue={[0, 7]}
        label="Breed Count"
      />
      <SliderWMarks
        min={0}
        max={6}
        step={1}
        queryString="pureness"
        customMarks={{ 0: 'Any', 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }}
        defaultValue="0"
        label="Purity"
      />
    </FilterDrawer>
    <FilterDrawer title="Stats">
      <>
        <StatSlider
          min={27}
          max={61}
          step={1}
          queryString="hp"
          defaultValue={[27, 61]}
          label="Health"
        />
        <StatSlider
          min={27}
          max={61}
          step={1}
          queryString="speed"
          defaultValue={[27, 61]}
          label="Speed"
        />
        <StatSlider
          min={27}
          max={61}
          step={1}
          queryString="skill"
          defaultValue={[27, 61]}
          label="Skill"
        />
        <StatSlider
          min={27}
          max={61}
          step={1}
          queryString="morale"
          defaultValue={[27, 61]}
          label="Morale"
        />
      </>
    </FilterDrawer>
  </>
);

export default Filters;
