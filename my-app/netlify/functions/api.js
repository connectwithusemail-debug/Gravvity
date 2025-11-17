const serverless = require('serverless-http')
const app = require('../../server/app')

// Strip the Netlify Functions base path so Express sees routes starting at "/"
module.exports.handler = serverless(app, { basePath: '/.netlify/functions/api' })
