// For Netlify build usage
const fs = require('fs')

fs.writeFileSync('./dist/_redirects', `/*    /200.html   200\n`)
