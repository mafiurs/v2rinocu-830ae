var faunadb = require('faunadb');
var q = faunadb.query;

export const ableToPostAlert = ({ role, owner }) =>
  q.GT(
    q.Select(['data', 'maxAlerts'], q.Get(q.Match(q.Index('max_axie_alerts_by_user_type'), role))),
    q.Count(q.Match(q.Index('axie_listing_alerts_by_user'), owner))
  );

export const createAxieListingAlert = (payload) =>
  q.Create('axiesListingAlerts', {
    data: payload
  });
