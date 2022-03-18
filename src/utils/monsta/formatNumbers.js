// import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
// import { BIG_TEN } from './bigNumber';

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
// export const getDecimalAmount = (amount, decimals = 18) => {
//   return new BigNumber(amount).times(BIG_TEN.pow(decimals));
// };

// export const getBalanceAmount = (amount, decimals = 18) => {
//   return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
// };

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getFullDisplayBalance = (
  balance,
  decimals = 18,
  displayDecimals
) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals);
};

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  };
  return number.toLocaleString(undefined, options);
};

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  );
  return formatUnits(number.sub(remainder), decimals);
};

/**
 * Method to format the display of wei given an ethers.BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  // Remove decimal
  const [leftSide] = number.toString().split('.');
  return formatBigNumber(
    ethers.BigNumber.from(leftSide),
    displayDecimals,
    decimals
  );
};

/**
 * This function formats huge numbers into numbers with commas
 * so that they become more readible for users.
 * E.g. 1000 becomes 1,000
 * Utilizes toLocalString fn, and defaults to the locale en-US.
 * @param price Can be string or number, but typescript insists on string only.
 * @returns string in readible format
 */
export const formatToReadibleNumber = (hugeNumbers) => {
  return parseFloat(hugeNumbers).toLocaleString('en-US');
};

export default formatBigNumberToFixed;

export const getCurrentPrice = (auctionInfo) => {
  if (!auctionInfo) return 0;
  const { timestamp, duration, startingPrice, endingPrice } = auctionInfo;
  let currentPrice = 0;
  const now = new Date();
  const secondsSinceEpoch = Math.round(now.getTime() / 1000);
  const secondsPassed = secondsSinceEpoch - timestamp;
  const isPassedDuration = secondsPassed > parseInt(duration);
  const currentPriceChange = isPassedDuration
    ? formatBigNumberToFixed(endingPrice, 0, 8)
    : (formatBigNumberToFixed(startingPrice, 0, 8) -
        formatBigNumberToFixed(endingPrice, 0, 8)) *
      (secondsPassed / parseInt(duration));
  currentPrice = isPassedDuration
    ? parseFloat(formatBigNumberToFixed(endingPrice, 0, 8))
    : parseFloat(
        formatBigNumberToFixed(startingPrice, 0, 8) - currentPriceChange
      );
  return currentPrice;
};

export function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' xSTT';
}
