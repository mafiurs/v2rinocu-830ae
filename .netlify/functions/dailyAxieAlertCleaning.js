const { schedule } = require('@netlify/functions');
var faunadb = require('faunadb');

var q = faunadb.query;

const handler = async (event, context, callback) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https'
  });

  try {
    const res = await client.query(
      q.Map(
        q.Filter(
          q.Paginate(q.Match(q.Index('all_axie_listing_alerts_sent')), { size: 100000 }),
          q.Lambda(['ts', 'ref'], q.LTE(q.Var('ts'), q.ToMicros(q.TimeSubtract(q.Now(), 1, 'day'))))
        ),
        q.Lambda(['ts', 'ref'], q.Delete(q.Var('ref')))
      )
    );
    console.log('Succesfull daily axie alerts cleanup: ', res);

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

module.exports.handler = schedule('@daily', handler);
