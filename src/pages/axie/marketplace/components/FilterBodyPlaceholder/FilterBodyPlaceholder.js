import { classNames, getChunkColor } from '../../../../../utils/helpers';

const AnimatedSpinLoading = ({ size = 5 }) => {
  return (
    <svg
      class={`animate-spin h-${size} w-${size} text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default function FilterBodyPlaceholder({ totalAxies, loading, onClick }) {
  return (
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="block">Use the filters to narrow down</span>
        <span className="block">the search results</span>
        <span className="block mt-4 sm:text-2xl">Axies found:</span>
        <div
          class={classNames('flex items-center justify-center text-6xl mt-6')}
          style={{ color: getChunkColor(totalAxies) }}
        >
          {loading && <AnimatedSpinLoading size={8} />}
          {!loading && totalAxies}
        </div>
      </h2>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
