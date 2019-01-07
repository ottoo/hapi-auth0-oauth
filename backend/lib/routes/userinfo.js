'use strict';

const Wreck = require('wreck');
const { ACCESS_TOKEN_KEY } = require('../constants');

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
            Authorization: `Bearer ${request.state[ACCESS_TOKEN_KEY]}`
          }
        }
      );

      return payload;
    }
  }
};
