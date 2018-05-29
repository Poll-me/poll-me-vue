'use strict'
module.exports = {
  NODE_ENV: '"production"',
  FB_API_KEY: JSON.stringify(process.env.FB_API_KEY || 'AIzaSyAncYW-RYkegv0gq8_laAlUTe3vfBd6KEY'),
  FB_AUTH_DOMAIN: JSON.stringify(process.env.FB_AUTH_DOMAIN || 'poll-me-36f9a.firebaseapp.com'),
  FB_DB_URL: JSON.stringify(process.env.FB_DB_URL || 'https://poll-me-36f9a.firebaseio.com'),
  FB_PROJECT_ID: JSON.stringify(process.env.FB_PROJECT_ID || 'poll-me-36f9a'),
  FB_STORAGE_BUCKET: JSON.stringify(process.env.FB_STORAGE_BUCKET || 'poll-me-36f9a.appspot.com'),
  FB_MSG_SENDER_ID: JSON.stringify(process.env.FB_MSG_SENDER_ID || '772514369454')
}
