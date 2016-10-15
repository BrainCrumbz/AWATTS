var url = require('url');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var buildCommon = require('./webpack.common.js');
var common = buildCommon();

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

  // Cache generated modules and chunks to improve performance in incremental builds
  cache: true,

  // Set base directory for resolving entry points
  context: common.paths.clientSrc,

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

      common.loaders.pre.tslint,

    ],

    loaders: [

      common.loaders.typescript,
      common.loaders.json,
      common.loaders.componentSass,
      common.loaders.componentCss,
      common.loaders.globalCss,
      common.loaders.html,

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  resolve: {

    extensions: common.resolvedExtensions,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    // Until loaders are updated, use the LoaderOptionsPlugin to pass custom properties to third-party loaders
    new webpack.LoaderOptionsPlugin({

      // (For UglifyJsPlugin) Put loaders into debug mode
      debug: true,

      options: {

        postcss: common.postcss,

      },
    }),

    // Provides context to Angular's use of System.import
    // See https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      common.patterns.angularContext,
      common.paths.clientSrc
    ),

    // Allow setting option in tsconfig, so that type checking happens in a separate process and webpack doesn't have to wait
    new ForkCheckerPlugin(),

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

    // webpack dev server will serve bundles from memory at this relative URL path
    publicPath: common.urls.public,

    // webpack dev server will serve files from this directory
    contentBase: common.paths.localDevRoot,

    proxy: {
      // proxied to backend web server
      '/' : {
        target: defaultServerUrl,
        secure: false,
        prependPath: false,
      },
    },

    // For automatic page refresh, enable the 'webpack-dev-server/client?...' entry
    inline: true,

    // Enable Hot Module Replacement
    hot: true,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    watchOptions: { aggregateTimeout: 300, poll: 1000 },

    // The rest is terminal configuration
    console: true,
    colors: true,
    progress: true,
    quiet: false,
    displayErrorDetails: true,
    displayCached: true,
    noInfo: true,
    stats: { colors: true },

  };

  config.plugins.push(

    // We have to manually add the Hot Replacement plugin when running from Node
    new webpack.HotModuleReplacementPlugin()

  );

};

module.exports = config;
