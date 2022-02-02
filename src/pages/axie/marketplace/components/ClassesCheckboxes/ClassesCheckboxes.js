import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAxieIcon, axieClasses } from '../../../../../utils/axie/helpers';
import { setSearchParam, canUseDOM } from '../../../../../utils/helpers';

export default function ClassesCheckboxes(props) {
  const router = useRouter();
  const { name, queryString } = props;

  const defaultValue = null;
  const [value, setValue] = useState(defaultValue);
  const getValue = () => {
    let defVal = defaultValue;
    if (canUseDOM) {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      defVal = params.get(queryString);
    }
    return !_.isEmpty(defVal) ? defVal : defaultValue;
  };

  useEffect(() => {
    if (canUseDOM) {
      setValue(getValue());
    }
  }, [router.query]);
  const onClick = (e) => {
    const { url, as, options } = setSearchParam(name, e.target.value);
    router.push(url, as, options);
  };
  return (
    <fieldset className="">
      <div className="flex w-full flex-wrap">
        {axieClasses.map((classType) => (
          <div className="mb-1 w-2/4">
            <div className="flex items-center h-5">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                value={classType}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 border-gray-300 rounded"
                checked={value == classType}
                onClick={onClick}
              />
              <div className="ml-1.5 text-xs flex items-center">
                <span id="comments-description" className="">
                  {getAxieIcon(classType)}
                </span>
                <label htmlFor="comments" className="text-xs ml-1">
                  <span className="sr-only">{classType}</span>
                  {classType}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
