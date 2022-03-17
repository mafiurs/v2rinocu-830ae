import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
var faunadb = require('faunadb');
const jwt = require('jsonwebtoken');
import { parseJWTMetadata } from '../../../../utils/helpers';
import { ableToPostAlert, createAxieListingAlert } from './helpers';
var q = faunadb.query;
export default withApiAuthRequired(async function postAxieAlert(req, res) {
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

    const owner = q.Call(q.Function('getUser'), { email, role });
    const getPayload = () => ({
      ...req.body,
      owner
    });

    const result = await client.query(
      q.If(ableToPostAlert({ role, owner }), createAxieListingAlert(getPayload()), {
        data: { error: 'Limit quota reached' }
      })
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
