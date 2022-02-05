export const fetchMonstaGenes = async (id) => {
  const response = await fetch(
    'https://d2wjyrmjxyar02.cloudfront.net/subgraphs/name/monsta/marketplace',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      referrer: 'https://marketplace.monstainfinite.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body:
        '{"query":"\\n        query MonstaQuery($tokenId:  BigInt!) {\\n          monstas(\\n            orderBy: token\\n            orderDirection: asc\\n            auctionStatus_in: [UserAuctionCreated]\\n            where: { token: $tokenId }\\n          ) {\\n            id\\n            token\\n            genes\\n            owner\\n            monstaEvents (\\n              orderBy: timestamp\\n              orderDirection: desc\\n              where: {\\n                type_in: [UserAuctionCreated]\\n              }\\n              first: 1\\n            ) {\\n              timestamp\\n              ... on AuctionCreate {\\n                startingPrice\\n                endingPrice\\n                duration\\n                seller\\n              }\\n            }\\n          }\\n        }\\n        ","variables":{"tokenId":' +
        id.toString() +
        '}}',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    }
  );
  const {
    data: { monstas }
  } = await response.json();
  return monstas;
};

export const fetchMonstaSvg = async (bin) => {
  const response = await fetch(
    'https://bos825f8o9.execute-api.ap-southeast-1.amazonaws.com/preview',
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      referrer: 'https://marketplace.monstainfinite.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify({ data: bin }),
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    }
  );

  return response.text();
};

export const fetchMonstaMarket = async ({ step = 0, cloneUsage = null }) => {
  const usage = typeof cloneUsage === 'number' ? cloneUsage : null;
  const getWhere = () => {
    let where = {
      auctionStatus_in: ['UserAuctionCreated']
    };
    return usage !== null ? { ...where, cloneUsage: usage } : where;
  };

  const response = await fetch(
    'https://d2wjyrmjxyar02.cloudfront.net/subgraphs/name/monsta/marketplace',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      referrer: 'https://marketplace.monstainfinite.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify({
        query: `
        query MarketplaceQuery($where: Monsta_filter!, $step: Int)  {
          monstas(
            orderBy: lastStartPrice
            orderDirection: asc
            where: $where
            first: 100
            skip: $step
          ) {
            id
            genes
            monstaEvents(
              orderBy: timestamp,
              orderDirection: desc,
              first: 1,
              where: { type_in: [UserAuctionCreated] },
            ){
              timestamp
               ... on AuctionCreate {
                startingPrice
                endingPrice
                duration
                seller
              }
            }
          }
        }`,
        variables: {
          where: getWhere(),
          step: step
        }
      }),
      method: 'POST',
      mode: 'cors',
      credentials: 'omit'
    }
  );
  const {
    data: { monstas }
  } = await response.json();
  return monstas;
};
