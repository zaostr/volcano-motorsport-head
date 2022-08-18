const path = require('path')
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  })

  // For storybook-addon-vue-info package
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'vue-docgen-loader',
    enforce: 'post'
  })

  config.resolve.alias['@'] = path.dirname(path.resolve(__dirname))
  config.resolve.alias['~'] = path.dirname(path.resolve(__dirname))

  // "Module not found: Error: Can't resolve 'fs' .../dotenv/lib'" error fix for ApiService
  config.node = { fs: 'empty' }

  // Return the altered config
  return config
}
