# Volcano Motorsport Nuxt.js based Frontend with Storybook

> Based on DARWIN Studio Starter Kit: Nuxt.js

## Nuxt App Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000 (or other from .env)
$ npm run dev (or nuxt if Nuxt.js is installed globally)

# build for production and launch server
$ npm run build (or nuxt build)
$ npm run start (or nuxt start)

# generate static project
$ npm run generate
$ (serve with your favorite web-server)
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Storybook Build Setup

```bash
# install dependencies
$ npm install

# create (or copy from .env.example) and fill .env file with a relevant data
APP_HOST=localhost
APP_PORT=3003
APP_PROTOCOL=http
HEADLESS_CMS_ENDPOINT=http://localhost:3002
GOOGLE_MAP_API_KEY=your-very-own-api-key

-THEN-

# run storybook
$ npm run storybook

-OR-

# exporting storybook as a static app
$ npm run build-storybook

# try it with
$ http-server storybook-build (or other preffered server)
```

For detailed explanation on how things work, check out [Storybook docs](https://storybook.js.org/docs/basics/introduction).

## Netlify deploy notes

Build command: node ./create-env.js && npm run generate && node ./create-redirects.js  
Publish directory: dist  
Environment variables:  
APP_HOST: [your-netlify-domain.com]  
APP_PORT: 3000  
APP_PROTOCOL: https  
HEADLESS_CMS_ENDPOINT: [get-from-sanity-grapql-deploy-command]  
GOOGLE_MAP_API_KEY: [your-very-own-api-key]

Do not forget to create Netlify Deploy Webhook and [connect it to Sanity.io project](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify)
