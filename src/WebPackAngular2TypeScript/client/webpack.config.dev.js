var url = require('url');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var common = require('./webpack.common.js');

// ensure development environment
process.env.NODE_ENV = 'development';

// detect development mode from environment
var devMode = process.env.DEV_MODE;

if (['build', 'reload'].indexOf(devMode) < 0) {
  devMode = 'build';
}

var config = {

  // Makes sure errors in console map to the correct file and line number
  // Makes sure that breakpoints are hit, and variable values are shown
  // 'cheap-module-eval-source-map' is quicker, but breakpoints don't work
  devtool: 'source-map',

  // Switch loaders to debug mode
  debug: true,

  // Cache generated modules and chunks to improve performance in incremental builds
  cache: true,

  // Set base directory for resolving entry points
  context: common.paths.clientRoot,

  entry: {

    'vendor': common.paths.vendorEntry,

    // Client application main entry point
    'main': common.paths.mainEntry,

  },

  output: {

    // The output directory as absolute path (required), where build artifacts are saved
    path: common.paths.buildOutput,

    // A template for the name of each output file on disk, as a relative path
    filename: common.files.bundle,

    // A template for the name of each source-map file, as a relative path
    sourceMapFilename: common.files.sourceMap,

    // A template for the name of each intermediate chunk file, as a relative path
    chunkFilename: common.files.chunk,

    publicPath: common.urls.public,

    // Include comments with information about the modules
    pathinfo: true,

  },

  module: {

    preLoaders: [

      common.preLoaders.tslint,

    ],

    loaders: [

      common.loaders.typescript,
      common.loaders.componentCss,
      common.loaders.globalCss,
      common.loaders.html,

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  postcss: common.postcss,

  resolve: {

    extensions: common.resolvedExtensions,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      filename: common.files.bundle,
      minChunks: Infinity,
    }),

    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{
      from: common.paths.staticFiles,
    }]),

  ],

};

// differences when reloading in development
if (devMode == 'reload') {

  var protocol = 'http';
  var hostname = 'localhost';

  var defaultServerUrl = url.format({
    protocol: protocol,
    hostname: hostname,
    port: common.ports.default,
  });

  var reloadServerUrl = url.format({
    protocol: protocol,
    hostname: hostname,
    port: common.ports.reload,
  });

  config.entry['main'] = [

    // For automatic page refresh, inline mode
    'webpack-dev-server/client?' + reloadServerUrl,

    // For hot module replacement
    'webpack/hot/dev-server',

    // Client application main entry point
    common.paths.mainEntry,

  ];

  // webpack dev server configuration
  config.devServer = {

    port: common.ports.reload,

    publicPath: common.urls.public,

    contentBase: common.paths.localDevRoot,

    proxy: {
      // proxied to backend web server
      '/*' : defaultServerUrl,
    },

    // Enable Hot Module Replacement
    hot: true,

    inline: true,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    watchOptions: { aggregateTimeout: 300, poll: 1000 },

    // The rest is terminal configuration
    console: true,
    quiet: false,
    noInfo: true,
    stats: { colors: true },

  };

  config.plugins.push(

    // We have to manually add the Hot Replacement plugin when running from Node
    new webpack.HotModuleReplacementPlugin()

  );

};

module.exports = config;
