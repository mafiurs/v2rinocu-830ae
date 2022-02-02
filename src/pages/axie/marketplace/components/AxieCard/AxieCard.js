import { utils } from 'ethers';
import _ from 'lodash';
const { formatEther } = utils;
import { axieParts } from '../../../../../utils/axie/helpers';
import { getAxieIcon, getStatIcon, getAxieColors } from '../../../../../utils/axie/helpers';

const AxieCard = ({ id, genes: { _genes }, auction, stats, breedCount, pureness }) => {
  const AXIE_BASE_URL = 'https://marketplace.axieinfinity.com/axie';
  return (
    <a
      href={`${AXIE_BASE_URL}/${id}`}
      target="_blank"
      className="sm:w-64 md:w-52 w-full m-1 cursor-pointer border border-gray-600 bg-gray-700 rounded transition hover:shadow hover:border-gray-6 hover:ring-2 ring-indigo-600"
    >
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex flex-row">
            {getAxieIcon(_genes.cls, '16')}
            <small
              className="truncate ml-2 text-xs"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem'
              }}
            >
              #{id}
            </small>
          </div>

          <div className="truncate ml-2 text-xs">{pureness}%</div>
        </div>
        <div className="py-1 flex justify-between">
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
        </div>
        <div className="p-1 rounded bg-gray-800">
          {axieParts.map((part) => (
            <div className="flex justify-between">
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getAxieColors(_genes[part].d.cls).light
                }}
              >
                {_genes[part].d.name}
              </span>
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getAxieColors(_genes[part].r1.cls).light
                }}
              >
                {_genes[part].r1.name}
              </span>
              <span
                className="w-1/3 whitespace-nowrap truncate font-semibold"
                style={{
                  fontSize: '0.7rem',
                  lineHeight: '1.1rem',
                  color: getAxieColors(_genes[part].r2.cls).light
                }}
              >
                {_genes[part].r2.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap justify-between overflow-hidden items-baseline">
          <div>
            <span className="truncate text-md font-medium">
              Ξ {Number(formatEther(auction.currentPrice)).toFixed(3)}
            </span>
            <span
              className="truncate ml-1 text-gray-400 font-normal"
              style={{
                fontSize: '0.7rem',
                lineHeight: '1rem'
              }}
            >
              ${auction.currentPriceUSD}
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
              Breeds # <span className="truncate text-white font-medium">{breedCount}</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default AxieCard;
