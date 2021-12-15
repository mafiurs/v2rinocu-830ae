import { useRouter } from 'next/router';
import { getAxieIcon, axieClasses } from '../../../utils/axie';
import { setSearchParam } from '../../../utils/helpers';

export default function ClassesCheckboxes(props) {
  const router = useRouter();
  const { value, name } = props;
  const onClick = (e) => {
    router.push(setSearchParam(name, e.target.value));
  };
  return (
    <fieldset className="mt-2 space-y-1">
      <legend className="text-xs text-gray-400">Class</legend>
      <div className="flex w-full flex-wrap">
        {axieClasses.map((classType) => (
          <div class="mb-1 w-2/4">
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
