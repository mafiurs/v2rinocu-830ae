import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
var faunadb = require('faunadb');
const jwt = require('jsonwebtoken');
import { parseJWTMetadata } from '../../../../utils/helpers';
import { ableToPostAlert, createAxieListingAlert } from './helpers';
var q = faunadb.query;
export default withApiAuthRequired(async function getUserAlerts(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const parsedData = parseJWTMetadata(jwt.decode(accessToken));
    const email = parsedData.email;
    const role = parsedData.roles[0];
    var client = new faunadb.Client({
      secret: accessToken,
      domain: 'db.us.fauna.com',
      port: 443,
      scheme: 'https'
    });

    const getUser = () => q.Call(q.Function('getUser'), { email, role });

    const result = await client.query(
      q.Map(
        q.Select('data', q.Paginate(q.Match(q.Index('axie_listing_alerts_by_user'), getUser()))),
        q.Lambda('x', {
          data: q.Select('data', q.Get(q.Var('x'))),
          date: q.ToDate(q.Epoch(q.Select('ts', q.Get(q.Var('x'))), 'microseconds')),
          ref: q.Select('ref', q.Get(q.Var('x')))
        })
      )
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
