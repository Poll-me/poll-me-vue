'use strict'
module.exports = {
  NODE_ENV: '"production"',
  FB_API_KEY: JSON.stringify(process.env.FB_API_KEY),
  FB_AUTH_DOMAIN: JSON.stringify(process.env.FB_AUTH_DOMAIN),
  FB_DB_URL: JSON.stringify(process.env.FB_DB_URL),
  FB_PROJECT_ID: JSON.stringify(process.env.FB_PROJECT_ID),
  FB_STORAGE_BUCKET: JSON.stringify(process.env.FB_STORAGE_BUCKET),
  FB_MSG_SENDER_ID: JSON.stringify(process.env.FB_MSG_SENDER_ID)
}
