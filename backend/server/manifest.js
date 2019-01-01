'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: 'localhost',
    port: {
      $env: 'PORT',
      $coerce: 'number',
      $default: 3001
    },
    routes: {
      cors: {
        credentials: true
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: '../lib', // Main plugin
        options: {}
      },
      {
        plugin: 'good',
        options: {
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', request: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      },
      {
        plugin: 'yar',
        options: {
          name: 'oauth_state',
          cookieOptions: {
            password: 'test_passwordtest_passwordtest_password',
            isHttpOnly: true,
            isSecure: process.env.NODE_ENV === 'production',
            isSameSite: false
          }
        }
      },
      {
        plugin: 'schwifty',
        options: {
          $filter: 'NODE_ENV',
          $default: {},
          $base: {
            migrateOnStart: true,
            knex: {
              client: 'sqlite3',
              useNullAsDefault: true, // Suggested for sqlite3
              connection: {
                filename: ':memory:'
              }
            }
          },
          production: {
            migrateOnStart: false
          }
        }
      },
      {
        plugin: {
          $filter: { $env: 'NODE_ENV' },
          $default: 'hpal-debug',
          production: Toys.noop
        }
      }
    ]
  }
});
