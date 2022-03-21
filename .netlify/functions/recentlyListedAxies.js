const { schedule } = require('@netlify/functions');
const fetch = require('node-fetch');
const _ = require('lodash');
const ethers = require('ethers');
var faunadb = require('faunadb');
const sendEmail = require('../utils/mailers/no.reply.gmail');
const alertTemplate = require('../utils/mailers/templates/axieListedAlert');

const formatEther = ethers.utils.formatEther;
var q = faunadb.query;

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
            genes
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
            stats {
              hp 
              morale
              skill
              speed
            }
            __typename
          }
          `
      })
    };
    let response = await fetch(url, options);
    response = await response.json();

    const listedAxies = response?.data?.axies?.results.map((axie) => ({
      ...axie,
      ethPrice: Number(formatEther(axie.auction.currentPrice))
    }));

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
      domain: 'db.us.fauna.com',
      port: 443,
      scheme: 'https'
    });

    const filteredListedAxies = q.Filter(
      listedAxies,
      q.Lambda(
        'axie',
        q.If(
          q.Exists(q.Match(q.Index('axie_alerts_sent_by_axie_id'), q.Select('id', q.Var('axie')))),
          false,
          true
        )
      )
    );

    const axieListingAlerts = q.Paginate(q.Documents(q.Collection('axiesListingAlerts')), {
      size: 100000
    });

    const filterAbleToSend = () =>
      q.Filter(
        axieListingAlerts,
        q.Lambda(
          'alert',
          q.And(
            q.Exists(q.Select(['data', 'owner'], q.Get(q.Var('alert')))),
            q.If(
              q.GT(
                q.Select(
                  ['data', 0],
                  q.Paginate(
                    q.Match(
                      q.Index('max_daily_alerts_quota_by_user_type'),
                      q.Select(
                        ['data', 'role'],
                        q.Get(q.Select(['data', 'owner'], q.Get(q.Var('alert'))))
                      )
                    )
                  )
                ),
                q.Select(
                  ['data', 0],
                  q.Count(
                    q.Paginate(
                      q.Match(
                        q.Index('alerts_sent_by_user'),
                        q.Select(['data', 'owner'], q.Get(q.Var('alert')))
                      )
                    )
                  )
                )
              ),
              true,
              false
            )
          )
        )
      );

    const filterBreedCount = (arr) =>
      q.Filter(
        arr,
        q.Lambda(
          'alert',
          q.And(
            q.GTE(
              q.Select('breedCount', q.Var('axie')),
              q.Select(
                0,
                q.Select(['data', 'criteria', 'breedCount'], q.Get(q.Var('alert')), [0, 7])
              )
            ),
            q.LTE(
              q.Select('breedCount', q.Var('axie')),
              q.Select(
                1,
                q.Select(['data', 'criteria', 'breedCount'], q.Get(q.Var('alert')), [0, 7])
              )
            )
          )
        )
      );
    const filterClass = (arr) =>
      q.Filter(
        arr,
        q.Lambda(
          'alert',
          q.If(
            q.IsEmpty(q.Select(['data', 'criteria', 'classes'], q.Get(q.Var('alert')), [])),
            true,
            q.Any(
              q.Map(
                q.Select(['data', 'criteria', 'classes'], q.Get(q.Var('alert'))),
                q.Lambda(
                  'className',
                  q.Equals(q.Select('class', q.Var('axie')), q.Var('className'))
                )
              )
            )
          )
        )
      );

    const filterStat = (arr, stat) =>
      q.Filter(
        arr,
        q.Lambda(
          'alert',
          q.And(
            q.GTE(
              q.Select(['stats', stat], q.Var('axie')),
              q.Select(0, q.Select(['data', 'criteria', stat], q.Get(q.Var('alert')), [27, 61]))
            ),
            q.LTE(
              q.Select(['stats', stat], q.Var('axie')),
              q.Select(1, q.Select(['data', 'criteria', stat], q.Get(q.Var('alert')), [27, 61]))
            )
          )
        )
      );
    const filterBudget = (arr) =>
      q.Filter(
        arr,
        q.Lambda(
          'alert',
          q.If(
            q.LTE(
              q.Select('ethPrice', q.Var('axie')),
              q.Select(['data', 'budget'], q.Get(q.Var('alert')))
            ),
            true,
            false
          )
        )
      );

    const filterParts = (arr) =>
      q.Filter(
        arr,
        q.Lambda(
          'alert',
          q.If(
            q.All(
              q.Map(
                q.Select(['data', 'criteria', 'parts'], q.Get(q.Var('alert')), []),
                q.Lambda(
                  'part',
                  q.If(
                    q.Any(
                      q.Map(
                        q.Select('parts', q.Var('axie')),
                        q.Lambda(
                          'axiePart',
                          q.Equals(q.Select('id', q.Var('axiePart')), q.Var('part'))
                        )
                      )
                    ),
                    true,
                    false
                  )
                )
              )
            ),
            true,
            false
          )
        )
      );

    const matchingAlerts = await client.query(
      q.Map(
        filteredListedAxies,
        q.Lambda(
          'axie',
          q.Map(
            // parts
            filterParts(
              // budget
              filterBudget(
                // class
                filterClass(
                  // morale
                  filterStat(
                    //skill
                    filterStat(
                      // hp
                      filterStat(
                        // speed
                        filterStat(
                          // breedCount
                          filterBreedCount(filterAbleToSend()),
                          'speed'
                        ),
                        'hp'
                      ),
                      'skill'
                    ),
                    'morale'
                  )
                )
              )
            ),
            // returns as object
            q.Lambda(['ref'], {
              alert: q.Select('data', q.Get(q.Select(['data', 'owner'], q.Get(q.Var('ref'))))),
              owner: q.Select(['data', 'owner'], q.Get(q.Var('ref'))),
              axie: q.Var('axie')
            })
          )
        )
      )
    );

    const alerts = matchingAlerts
      .map(({ data }) => data)
      .filter((arr) => arr.length > 0)
      .flat();

    if (Array.isArray(alerts) && alerts.length > 0) {
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET,
        domain: 'db.us.fauna.com',

        port: 443,
        scheme: 'https'
      });
      const promises = alerts.map(({ axie: { id, ethPrice }, alert: { email } }) => {
        const eth = Number(ethPrice).toFixed(3);
        return sendEmail({
          to: email,
          subject: `Axie #${id} has been listed for ${eth}ETH`,
          body: alertTemplate({ id, eth })
        });
      });
      await Promise.all([...promises]);
      const getAlertSentPayload = ({ axie, owner }) => {
        return {
          ...axie,
          owner
        };
      };
      await await client.query(
        q.Map(
          alerts.map((alert) => getAlertSentPayload(alert)),
          q.Lambda(
            'payload',
            q.Create('axieListingAlertsSent', {
              data: q.Var('payload')
            })
          )
        )
      );
    }
    return {
      statusCode: 200
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong. Try again later.')
    };
  }
};

module.exports.handler = schedule('* * * * *', handler);
