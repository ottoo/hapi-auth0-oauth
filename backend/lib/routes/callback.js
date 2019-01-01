'use strict';

const Wreck = require('wreck');

module.exports = {
  method: 'GET',
  path: '/callback',
  options: {
    auth: false,
    handler: async (request, h) => {
      const code = request.query.code;
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
            code,
            redirect_uri: 'http://localhost:3001/callback'
          }
        }
      );

      request.yar.set('auth', payload);

      return h.redirect(
        `http://localhost:3000/post-login?access_token=${
          payload.access_token
        }&expires_in=${payload.expires_in}`
      );
    }
  }
};
