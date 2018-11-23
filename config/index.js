'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/v1': {
        target: process.env.OSS ? 'http://wms.oss.youheng-inc.com' : 'http://36.48.176.5:9080',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': '/api/v1'
        }
      },
      '/api/datacenter/v1' :{
        target: 'http://36.48.176.5:9080',
        changeOrigin: true
        // ,
        // pathRewrite: {
        //   '^/api/datacenter/v1': '/index.php'
        // }
      },
      '/api/mock': {
        target: 'https://f623dedf-29b1-476a-8e22-8f5ba097b334.mock.pstmn.io/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mock': '/api/v1'
        }
      },
      '/api/mytask':{
        target: 'http://10.14.10.188:8089',
        changeOrigin: true
        // ,
        // pathRewrite: {
        //   '^/api/datacenter/v1': '/index.php'
        // }
      },
      '/api/dept':{
        target: 'http://10.14.10.188:8089',
        changeOrigin: true
       },
       '/api':{
            target: 'http://10.14.10.188:8089',
            changeOrigin: true
        }

    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 9080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for inbox.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,

    env: require('./prod.env'),
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    client:process.env.CLIENT
  }
}
