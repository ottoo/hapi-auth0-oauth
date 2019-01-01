'use strict';

const Wreck = require('wreck');

module.exports = {
  method: 'GET',
  path: '/userinfo',
  options: {
    handler: async request => {
      const { payload } = await Wreck.get(
        `${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          json: true,
          headers: {
            Authorization: `Bearer ${request.headers.authorization}`
          }
        }
      );

      return payload;
    }
  }
};
