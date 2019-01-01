'use strict';

module.exports = {
  method: 'GET',
  path: '/login',
  options: {
    auth: false,
    handler: (request, h) => {
      const url = `${
        process.env.AUTH0_DOMAIN
      }/authorize?audience=test-api&scope=offline_access%20openid%20profile%20email&response_type=code&client_id=${
        process.env.AUTH0_CLIENT_ID
      }&redirect_uri=http://localhost:3001/callback`;
      return h.redirect(url);
    }
  }
};
