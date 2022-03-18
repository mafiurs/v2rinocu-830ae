import _ from 'lodash';
import pRetry from 'p-retry';

const getAxieGenes = async (variables) => {
  let axies = [];
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
        GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String, $filterStuckAuctions: Boolean) {
          axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner, filterStuckAuctions: $filterStuckAuctions) {
            results {
              ...AxieBrief
            }
          }
        }
        fragment AxieBrief on Axie {
          id
          class
          genes
          breedCount
          battleInfo {
            banned
          }
          auction {
            currentPrice
            currentPriceUSD
          }
          stats {
            hp 
            morale
            skill
            speed
          }
        }
        `
    })
  };
  let response = await fetch(url, options, 3);
  response = await response.json();
  if (response.status === 500 || response?.errors) {
    const customError = new Error('Server error');
    throw customError;
  }
  axies = response?.data?.axies?.results;
  return axies;
};

export default async (variables) =>
  await pRetry(() => getAxieGenes(variables), {
    onFailedAttempt: (error) => {
      console.log(
        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );
    },
    retries: 5
  });
