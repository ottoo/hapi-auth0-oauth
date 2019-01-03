'use strict';

const QueryString = require('query-string');

module.exports = {
  method: 'GET',
  path: '/login',
  options: {
    auth: false,
    handler: (request, h) => {
      const querystr = QueryString.stringify({
        audience: 'test-api',
        scope: 'offline_access openid profile email',
        response_type: 'code',
        client_id: process.env.AUTH0_CLIENT_ID,
        redirect_uri: process.env.AUTH0_CALLBACK_URL
      });
      const url = `${process.env.AUTH0_DOMAIN}/authorize?${querystr}`;
      return h.redirect(url);
    }
  }
};
