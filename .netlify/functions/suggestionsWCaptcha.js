const axios = require('axios');

const Yup = require('yup');
require('dotenv').config();
const faunadb = require('faunadb');
var q = faunadb.query;

// body validation
const suggestionsBodyValidation = (body) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required')
      .typeError('Must be a valid name')
      .matches(/^[a-zA-Z ]*$/, 'Must be a valid name'),
    email: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required')
      .typeError('Must be a valid email')
      .email('Must be a valid email'),
    why: Yup.string().max(150, 'Must be less than 150 characters').required('Required')
  });
  return validationSchema
    .validate(body)
    .then((results) => results)
    .catch((error) => ({ errors: error.errors }));
};

exports.handler = async (event, context, callback) => {
  const { body } = event;
  const { name, email, why, captcha } = JSON.parse(body);
  const validationResult = await suggestionsBodyValidation({ name, email, why });
  if (validationResult?.errors) {
    return {
      statusCode: 400,
      body: JSON.stringify('Whatcha tryna do buddy?')
    };
  }
  const secretKey = process.env.CAPTCHA_SECRET_KEY;

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https'
  });

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  try {
    const { data } = await axios.post(url);
    if (data?.success) {
      const result = await client.query(
        q.Create('gamesSuggestionsResponses', {
          data: { name, email, why }
        })
      );
      if (result.data) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.data)
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify('Something went wrong. Try again later.')
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong. Try again later.')
    };
  }
};
