'use strict';

const JwksRsa = require('jwks-rsa');

/**
 * Handles checking access token validity and refreshes the
 * token if its expired.
 */
const register = async function(server) {
  // Register "hapi-auth-jwt2" here because this custom plugin depends on it.
  await server.register(require('hapi-auth-jwt2'), { once: true });

  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    key: JwksRsa.hapiJwt2KeyAsync({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_JWKS_URI
    }),
    verifyOptions: {
      ignoreExpiration: true,
      audience: 'test-api',
      issuer: `${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    },
    validate: (decoded, request, h) => {
      const exp = new Date(decoded.exp * 1000).getTime();
      const now = new Date().getTime();

      if (exp > now) {
        request.log(
          ['auth'],
          `token is valid exp: ${new Date(exp)}, now: ${new Date(now)}`
        );
        return { isValid: true };
      }

      return { isValid: false };
    }
  });

  server.auth.default('jwt');
};

module.exports = {
  plugins: [
    {
      plugin: {
        name: 'auth',
        register
      }
    }
  ]
};
