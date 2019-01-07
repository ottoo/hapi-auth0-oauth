'use strict';

const Wreck = require('wreck');
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require('../constants');

/**
 * auth0 calls this callback route after a successful authentication. Here, the authorization code
 * is exchanged for an access and a refresh token.
 */
module.exports = {
  method: 'GET',
  path: '/callback',
  options: {
    auth: false,
    handler: async (request, h) => {
      const { payload } = await Wreck.post(
        `${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          json: true,
          headers: {
            'Content-Type': 'application/json'
          },
          payload: {
            grant_type: 'authorization_code',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            redirect_uri: process.env.AUTH0_CALLBACK_URL,
            code: request.query.code
          }
        }
      );

      h.state(ACCESS_TOKEN_KEY, payload.access_token);
      h.state(REFRESH_TOKEN_KEY, payload.refresh_token);

      return h.redirect(`${process.env.FRONTEND_URI}/post-login`);
    }
  }
};
