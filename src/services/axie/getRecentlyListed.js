const { schedule } = require('@netlify/functions');
const getRecentlyListedAxies = async () => {
  const url = 'https://graphql-gateway.axieinfinity.com/graphql';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      operationName: 'GetRecentlyItemList',
      variables: {
        from: 0,
        size: 10,
        sort: 'Latest'
      },
      query: `
        query GetRecentlyItemList($from: Int, $size: Int, $sort: SortBy) {
          items(from: $from, size: $size, sort: $sort) {
            results {
              ...RecentlyItem
              __typename
            }
            __typename
          }
        }
        fragment RecentlyItem on LandItem {
          landType
          rarity
          name
          figureURL
          itemId
          itemId
          itemAlias
          auction {
            ...AxieAuction
            __typename
          }
          __typename
        }
        fragment AxieAuction on Auction {
          startingPrice
          endingPrice
          startingTimestamp
          endingTimestamp
          duration
          timeLeft
          currentPrice
          currentPriceUSD
          suggestedPrice
          seller
          listingIndex
          state
          __typename
        }
      `
    })
  };
  let response = await fetch(url, options, 3);
  response = await response.json();
  console.log('response: ', response);
  return response;
  // if (response.status === 500 || response?.errors) {
  //   const customError = new Error('Server error');
  //   throw customError;
  // }
  // axies = response?.data?.axies?.results;
  // return axies;
};

const handler = async function (event, context) {
  const recent = await getRecentlyListedAxies();

  return {
    statusCode: 200
  };
};

module.exports.handler = schedule('* * * * *', handler);
