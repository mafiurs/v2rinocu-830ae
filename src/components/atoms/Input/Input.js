import { classNames } from '../../../utils/helpers';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

export default function Input({
  required = false,
  type = 'text',
  name = '',
  label = '',
  id = null,
  placeholder = '',
  defaultValue,
  error,
  value,
  handleChange,
  className
}) {
  return (
    <div className={classNames('w-full sm:max-w-xs', className)}>
      <label htmlFor={name} className="block tracking-wider text-xs font-medium ">
        {label} {required && '*'}
      </label>
      <div className="mt-1 relative  rounded-md shadow-sm mt-1 space-y-4 ">
        <input
          onChange={handleChange}
          type={type}
          name={name}
          id={id || name}
          className={classNames(
            'w-full p-2 focus:ring-white placeholder-gray-200 focus:border-white focus:ring-2 bg-gray-600 block pr-10  text-white focus:outline-none  sm:text-sm rounded-md',
            error && 'border-red-300 placeholder-red-400 focus:ring-red-500 focus:border-red-500'
          )}
          placeholder={placeholder}
          defaultValue={value}
          aria-invalid="true"
          aria-describedby={`${name}-error`}
        />
        {error && (
          <div
            className={classNames(
              'absolute -top-2 right-0 pr-3 flex items-center pointer-events-none'
            )}
          >
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
