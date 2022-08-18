// For Netlify build usage. Don't forget to add this Environment variables at your netlify project
const fs = require('fs')

fs.writeFileSync('./.env', `APP_HOST=${process.env.APP_HOST}\n`)
fs.writeFileSync('./.env', `APP_PORT=${process.env.APP_PORT}\n`)
fs.writeFileSync('./.env', `APP_PROTOCOL=${process.env.APP_PROTOCOL}\n`)
/* fs.writeFileSync(
  './.env',
  `HEADLESS_CMS_ENDPOINT=${process.env.HEADLESS_CMS_ENDPOINT}\n`
) */
fs.writeFileSync(
  './.env',
  `GOOGLE_MAP_API_KEY=${process.env.GOOGLE_MAP_API_KEY}\n`
)
