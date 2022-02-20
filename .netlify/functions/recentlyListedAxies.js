const { schedule } = require('@netlify/functions');

const handler = async (event, context, callback) => {
  try {
    const url = 'https://graphql-gateway.axieinfinity.com/graphql';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        operationName: 'GetAxieBriefList',
        variables: {
          from: 0,
          size: 100,
          sort: 'Latest',
          auctionType: 'Sale',
          criteria: {}
        },
        query: `
          query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
            axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {    
              results {
                ...AxieBrief
              }
            }
          }
        
          fragment AxieBrief on Axie {
            id
            name
            stage
            class
            breedCount
            image
            title
            battleInfo {
              banned
              __typename
            }
            auction {
              currentPrice
              currentPriceUSD
              __typename
            }
            parts {
              id
              name
              class
              type
              specialGenes
              __typename
            }
            __typename
          }
          `
      })
    };
    let response = await fetch(url, options);
    response = await response.json();
    console.log('response success!!');

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.axies)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong. Try again later.')
    };
  }
};

module.exports.handler = schedule('* * * * *', handler);
