const getTotalAxiesForSale = async (variables) => {
  let response = await (
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
        GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
          axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
            total
          }
        }`
      })
    })
  ).json();

  return response.data.axies;
};

export default getTotalAxiesForSale;
