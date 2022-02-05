import _ from 'lodash';
const getAxieGenes = async (variables) => {
  let axies = [];
  try {
    const response = await (
      await fetch('https://graphql-gateway.axieinfinity.com/graphql', {
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
      })
    ).json();
    axies = response?.data?.axies?.results;
  } catch (err) {
    console.error(err);
  }
  return axies;
};

export default getAxieGenes;
