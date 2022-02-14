import { RefreshIcon } from '@heroicons/react/outline';
import { classNames, getChunkColor } from '../../../../../utils/helpers';
import Button from '../../../../../components/atoms/Button';
import AnimatedSpinLoading from '../../../../../components/atoms/AnimatedSpinLoading';

export default function FilterBodyPlaceholder({
  totalAxies = 0,
  loading,
  onClick,
  loadingAxies,
  onRetryClick,
  error
}) {
  const TOTAL_AXIES_ALLOWED = 25000;
  const MAX_AXIES_ALLOWED = 99999998;
  const getRetryButton = () => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          onRetryClick();
        }}
        className={classNames(
          'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white relative focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
          'bg-indigo-600 hover:bg-indigo-700'
        )}
      >
        <RefreshIcon className={`h-6 w-6 text-white`} />
        <span className="ml-2">Retry</span>
      </button>
    );
  };
  return (
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="block">Use the filters to narrow down</span>
        <span className="block">the search results</span>
        <span className="block mt-4 sm:text-xl text-gray-300">Axies found:</span>
        {error && <span className="block mt-4 sm:text-xl">{error}</span>}
        <div
          className={classNames('flex items-center justify-center text-6xl mt-2')}
          style={{ color: getChunkColor(totalAxies) }}
        >
          {loading && <AnimatedSpinLoading size={8} />}

          {!error && !loading && (totalAxies > MAX_AXIES_ALLOWED ? getRetryButton() : totalAxies)}
        </div>
      </h2>
      {!loading && totalAxies < MAX_AXIES_ALLOWED && (
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Button
              label="Start filtering"
              onClick={onClick}
              loading={loadingAxies}
              disabled={TOTAL_AXIES_ALLOWED <= totalAxies || totalAxies === 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}
