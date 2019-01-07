'use strict';

const Wreck = require('wreck');
const Boom = require('boom');
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require('../constants');

// Refresh token is stored in an encrypted httpOnly cookie, could also store it in redis or some
// other external store.
const getRefreshToken = request => {
  const refresh_token = request.state[REFRESH_TOKEN_KEY];

  if (!refresh_token) {
    throw Boom.unauthorized('Error. No refresh token found in a cookie.');
  }

  return refresh_token;
};

/**
 * Refreshes the access token for the user. Here you could also check, if the user is active or not
 * and grant refreshing the token based on that.
 */
module.exports = {
  method: 'POST',
  path: '/refresh-token',
  options: {
    auth: 'validate-only',
    handler: async (request, h) => {
      request.log('auth', 'Access token has expired, refreshing the token.');

      const res = await Wreck.request(
        'POST',
        `${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          payload: {
            grant_type: 'refresh_token',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            refresh_token: getRefreshToken(request)
          }
        }
      );

      const response = await Wreck.read(res, { json: true });

      h.state(ACCESS_TOKEN_KEY, response.access_token);

      request.log('auth', `Refreshed access token: ${response}`);

      return response;
    }
  }
};
