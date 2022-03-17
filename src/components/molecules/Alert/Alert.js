import { useContext } from 'react';
import { CheckCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import { classNames } from '../../../utils/helpers';
import { AppContext } from '../../../context';

export default function Alert() {
  const {
    state: {
      alert: { title, type, open }
    },
    dispatch
  } = useContext(AppContext);
  const handleClose = () => {
    dispatch({ type: 'setAlert', payload: { title: '', type: '', open: false } });
  };

  return (
    <div
      className={classNames(
        open ? 'block' : 'hidden',
        'fixed left-1/2 -translate-x-1/2 bottom-4 min-w-80',
        'rounded-md  p-4 sm:max-w-xs',
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
        </div>
        <div className="ml-auto pl-12">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={classNames(
                'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                type === 'success' &&
                  'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600',
                type === 'error' &&
                  'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600'
              )}
              onClick={handleClose}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
