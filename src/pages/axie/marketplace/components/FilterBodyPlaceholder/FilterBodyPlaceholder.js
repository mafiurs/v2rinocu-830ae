import { classNames, getChunkColor } from '../../../../../utils/helpers';
import Button from '../../../../../components/atoms/Button';
import AnimatedSpinLoading from '../../../../../components/atoms/AnimatedSpinLoading';

export default function FilterBodyPlaceholder({ totalAxies = 0, loading, onClick, loadingAxies }) {
  const TOTAL_AXIES_ALLOWED = 15000;
  const MAX_AXIES_ALLOWED = 99999998;
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

          {!loading &&
            (totalAxies > MAX_AXIES_ALLOWED ? (
              <p className="text-4xl">Couldn't fetch total</p>
            ) : (
              totalAxies
            ))}
        </div>
      </h2>
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
    </div>
  );
}
