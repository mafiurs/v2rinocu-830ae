import { classNames } from '../../../utils/helpers';

const Button = (props) => {
  const { type, label, onClick, loading, disabled, inverted, size = 'md', className } = props;

  const getButtonProps = () => {
    const props = {};
    if (!disabled) {
      return {
        ...props,
        onClick: (e) => {
          if (!loading && !disabled && onClick) {
            e.preventDefault();
            onClick(e);
          }
        }
      };
    }
  };

  return (
    <button
      type={type}
      {...getButtonProps()}
      className={classNames(
        'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white relative focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-full sm:w-auto',
        !disabled && !inverted && 'bg-indigo-600 hover:bg-indigo-700',
        !disabled && inverted && 'text-indigo-600 bg-white hover:bg-gray-100',
        loading && 'cursor-default',
        disabled && 'bg-gray-400 cursor-default',
        size === 'sm' && 'px-2 py-2 text-sm',
        className
      )}
    >
      <span id="buttonLabel" className={classNames(loading && 'invisible')}>
        {label}
      </span>
      {loading && (
        <svg
          className={classNames(
            'animate-spin m-auto h-5 w-5 text-white absolute',
            inverted && 'text-gray-300'
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke={inverted ? '#D1D5DB' : 'currentColor'}
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill={inverted ? '#D1D5DB' : 'currentColor'}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default Button;
