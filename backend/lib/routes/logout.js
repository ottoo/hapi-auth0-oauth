'use strict';

module.exports = {
  method: 'GET',
  path: '/logout',
  options: {
    handler: (request, h) => {
      return h.redirect(
        `${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${
          process.env.AUTH0_CLIENT_ID
        }`
      );
    }
  }
};
