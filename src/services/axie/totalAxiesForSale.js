import pRetry from 'p-retry';

const getTotalAxiesForSale = async (variables) => {
  const url = 'https://graphql-gateway.axieinfinity.com/graphql';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      operationName: 'GetAxieBriefList',
      variables: {
        ...variables
      },
      query: `
      query 
      GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
        axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
          total
        }
      }`
    })
  };
  let response = await fetch(url, options);
  response = await response.json();
  if (response.status === 500 || response?.errors) {
    const customError = new Error('Server error');
    throw customError;
  }
  return response?.data?.axies;
};

export default async (variables) =>
  await pRetry(() => getTotalAxiesForSale(variables), {
    onFailedAttempt: (error) => {
      console.log(
        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );
    },
    retries: 5
  });
