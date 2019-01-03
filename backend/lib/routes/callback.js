'use strict';

const Wreck = require('wreck');
const QueryString = require('query-string');

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

      request.yar.set('auth', payload);

      return h.redirect(
        `http://localhost:3000/post-login?${QueryString.stringify({
          access_token: payload.access_token,
          expires_in: payload.expires_in
        })}`
      );
    }
  }
};
