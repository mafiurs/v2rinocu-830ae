import { utils } from 'ethers';
import _ from 'lodash';
const { formatEther } = utils;
import { monstaParts, getMonstaColor } from '../../../../../utils/monsta/helpers';
import { capitalize } from '../../../../../utils/helpers';

const MonstaCard = ({ id, price, stats, breedCount, pureness, ...rest }) => {
  const MONSTA_BASE_URL = 'https://marketplace.monstainfinite.com/monsta';
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  const paramCloneUsage = params.get('cloneUsage');
  const cloneUsage = paramCloneUsage ? paramCloneUsage : 0;
  const currentPrice = price > 1000000 ? price.toExponential(2) : price.toFixed(2);

  return (
    <a
      href={`${MONSTA_BASE_URL}/${id}`}
      target="_blank"
      className="sm:w-64 md:w-64 w-full m-1 cursor-pointer border border-gray-600 bg-gray-700 rounded transition hover:shadow hover:border-gray-6 hover:ring-2 ring-indigo-600"
    >
      <div className="p-2">
        <div className="flex justify-between">
          <div
            className="flex flex-row text-xs font-semibold"
            style={{
              fontSize: '0.7rem',
              lineHeight: '1rem',
              color: getMonstaColor(rest.class)
            }}
          >
            {rest.class}
            <small
              className="truncate ml-1 text-xs"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem'
              }}
            >
              #{id}
            </small>
          </div>

          <div className="truncate ml-2 text-xs">
            {' '}
            <span
              className="truncate text-gray-400 font-normal"
              style={{
                fontSize: '0.6rem',
                lineHeight: '1rem'
              }}
            >
              Pure parts #
            </span>{' '}
            {pureness}
          </div>
        </div>
        {/* <div className="py-1 flex justify-between">
          {Object.keys(stats).map((stat) => (
            <div className="flex">
              {getStatIcon(stat, '17')}
              <small
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.25rem'
                }}
              >
                {_.get(stats, stat)}
              </small>
            </div>
          ))}
        </div> */}
        <div className="p-1 rounded bg-gray-800">
          {monstaParts.map((part) => (
            <div className="flex justify-between">
              <span
                className="w-1/5 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem'
                }}
              >
                {capitalize(part)}
              </span>
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getMonstaColor(rest[part].d.class)
                }}
              >
                {rest[part].d.class}
              </span>
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getMonstaColor(rest[part].r1.class)
                }}
              >
                {rest[part].r1.class}
              </span>
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getMonstaColor(rest[part].r2.class)
                }}
              >
                {rest[part].r2.class}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap justify-between overflow-hidden items-baseline">
          <div>
            <span className="truncate text-md font-medium">{currentPrice}</span>
            <span
              className="truncate ml-1 text-gray-400 font-normal"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem'
              }}
            >
              xSTT
            </span>
          </div>
          <div>
            <span
              className="truncate text-gray-400 font-normal"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem'
              }}
            >
              C. Usage # <span className="truncate text-white font-medium">{cloneUsage}</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MonstaCard;
