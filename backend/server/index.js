'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');

exports.deployment = async start => {
  const manifest = Manifest.get('/');
  const server = await Glue.compose(
    manifest,
    { relativeTo: __dirname }
  );

  server.state('o_t', {
    ttl: 24 * 60 * 60 * 1000, // One day
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    path: '/',
    encoding: 'none'
  });

  server.state('o_r', {
    ttl: 24 * 60 * 60 * 1000, // One day
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    path: '/',
    encoding: 'none'
  });

  await server.initialize();

  if (!start) {
    return server;
  }

  await server.start();

  server.log('server', `Server started at ${server.info.uri}`);

  return server;
};

if (!module.parent) {
  exports.deployment(true);

  process.on('unhandledRejection', err => {
    throw err;
  });
}
