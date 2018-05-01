'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FB_API_KEY: '"AIzaSyAncYW-RYkegv0gq8_laAlUTe3vfBd6KEY"',
  FB_AUTH_DOMAIN: '"poll-me-36f9a.firebaseapp.com"',
  FB_DB_URL: '"https://poll-me-36f9a.firebaseio.com"',
  FB_PROJECT_ID: '"poll-me-36f9a"',
  FB_STORAGE_BUCKET: '"poll-me-36f9a.appspot.com"',
  FB_MSG_SENDER_ID: '"772514369454"'
})
