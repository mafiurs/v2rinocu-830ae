import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
var faunadb = require('faunadb');
var q = faunadb.query;
export default withApiAuthRequired(async function getUserAlerts(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    var client = new faunadb.Client({
      secret: accessToken,
      domain: 'db.us.fauna.com',
      port: 443,
      scheme: 'https'
    });
    const { id } = req.body;
    const result = await client.query(q.Delete(q.Ref(q.Collection('axiesListingAlerts'), id)));
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
