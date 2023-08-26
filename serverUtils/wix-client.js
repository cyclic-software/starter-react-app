const { createClient, OAuthStrategy, ApiKeyStrategy } =require('@wix/api-client')
const { items, collections } = require('@wix/data');
const { dataItems } = require('@wix/data-items');
require('dotenv').config()


// clientId: process.env.WIX_OAUTH_CLIENT_ID,
const myWixClient = createClient({
    modules: { items, dataItems, collections },
    auth: ApiKeyStrategy({
      siteId: process.env.WIX_SITE_ID,
      apiKey: process.env.WIX_API_KEY
    })
  });

module.exports = { myWixClient }