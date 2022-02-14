/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { classNames } from '../../../../utils/helpers';
export default function Alert({ title, description, type = 'success' }) {
  return (
    <div
      className={classNames(
        'rounded-md  p-2 sm:max-w-xs',
        type === 'success' && 'bg-green-50',
        type === 'error' && 'bg-red-50'
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' && (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          )}

          {type === 'error' && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
        </div>
        <div className="ml-3">
          <h3
            className={classNames(
              'text-sm font-medium',
              type === 'success' && 'text-green-800',
              type === 'error' && 'text-red-800'
            )}
          >
            {title}
          </h3>
          <div
            className={classNames(
              'mt-1 text-xs text-green-700',
              type === 'success' && 'text-green-700',
              type === 'error' && 'text-red-700'
            )}
          >
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
