'use strict';

const JwksRsa = require('jwks-rsa');
const { ACCESS_TOKEN_KEY } = require('../constants');

/**
 * Handles checking access token validity and refreshes the
 * token if its expired.
 */
const register = async function(server) {
  // Register "hapi-auth-jwt2" here because this custom plugin depends on it.
  await server.register(require('hapi-auth-jwt2'), { once: true });

  const commonOptions = {
    cookieKey: ACCESS_TOKEN_KEY,
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
    }
  };

  /**
   * Default authentication strategy. Throws 401 unauthorized if token is not valid or is expired.
   */
  server.auth.strategy('default', 'jwt', {
    ...commonOptions,
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

  /**
   * Validate only strategy. This only validates, that the given token is valid, can be used to check
   * old token's validity when calling refresh-token endpoint for example.
   */
  server.auth.strategy('validate-only', 'jwt', {
    ...commonOptions,
    validate: () => {
      return { isValid: true };
    }
  });

  server.auth.default('default');
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
