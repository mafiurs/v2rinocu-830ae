import axios from 'axios';
const COINGECKO_SIMPLE_PRICE_API = '/api/functions/coingeckoSimplePrice';

const getCoingeckoPrices = async (rawQuery, parsedIds) => {
  const formatNumber = (n, fixed = 2) => Number(n.toFixed(fixed));
  try {
    const response = await axios({
      url: `${COINGECKO_SIMPLE_PRICE_API}/?${rawQuery}`,
      method: 'GET'
    });
    const keys = response.data && Object.keys({ ...response.data });
    const tokens = keys?.map((tokenKey) => {
      const usd = formatNumber(response.data[tokenKey]?.usd, 4);
      let usdDayChange = formatNumber(response.data[tokenKey]?.usd_24h_change);
      const isPositive = usdDayChange >= 0 ? true : false;
      const classColor = isPositive ? 'text-green-500' : 'text-red-600';
      const variance = isPositive ? `+${usdDayChange}%` : `${usdDayChange}%`;
      return {
        usd,
        usdDayChange,
        id: parsedIds[tokenKey]?.toUpperCase(),
        classColor,
        variance
      };
    });
    return tokens;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getCoingeckoPrices;
