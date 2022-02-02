const axios = require('axios');
require('dotenv').config();
const { COINGECKO_API_URL } = require('../utils/constants');
const Redis = require('ioredis');

const redis = new Redis(process.env.DB_CONNECTION_URL);

exports.handler = async (event, context, callback) => {
  try {
    const { rawQuery } = event;
    const cachedResult = await redis.get(rawQuery);
    if (cachedResult) {
      return {
        statusCode: 200,
        body: JSON.stringify(JSON.parse(cachedResult))
      };
    }
    const { data } = await axios.get(`${COINGECKO_API_URL}/simple/price?${rawQuery}`);
    redis.set(rawQuery, JSON.stringify({ ...data }), 'EX', 10);
    return {
      statusCode: 200,
      body: JSON.stringify({ ...data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong. Try again later.')
    };
  }
};
