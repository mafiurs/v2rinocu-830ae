import { useState } from 'react';
import { FilterIcon as FilterIconSolid } from '@heroicons/react/solid';
import { FilterIcon as FilterIconOutline } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FilterToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex items-center p-2 border-2 border-white rounded-full shadow-sm text-white hover:bg-gray-400 bg-indigo-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
      // className={classNames(
      //   selectedItem ? 'cursor-pointer absolute right-2 top-2.5' : 'hidden'
      // )}
    >
      <FilterIconSolid className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}
