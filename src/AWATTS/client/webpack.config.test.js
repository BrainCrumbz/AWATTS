var webpack = require('webpack');
var buildCommon = require('./webpack.common.js');
var common = buildCommon();

// ensure test environment
process.env.NODE_ENV = 'test';

var config = {

  devtool: 'inline-source-map',

  // no need to specify entry points: this configuration is used to run webpack
  // by karma, that is responsible for submitting test files as entry points
  entry: {},

  // for same reason, no need to specify outputs, those are managed by karma as well
  output: {},

  stats: {
    colors: true,
    reasons: true,
  },

  cache: false,

  // TODO consider applying some null loaders for CSS in test
  // (see https://angular.io/docs/ts/latest/guide/webpack.html)

  module: {

    loaders: [

      // Pre-loaders
      common.loaders.pre.tslint,
      common.loaders.pre.javascriptTest,

      // Loaders
      common.loaders.typescriptTest,
      common.loaders.json,
      common.loaders.componentSass,
      common.loaders.componentCss,
      common.loaders.globalCss,
      common.loaders.html,

      // Post-loaders
      // TODO enable when it is not scrambling source maps
      //common.loaders.post.istanbul,

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  resolve: {

    cache: false,

    extensions: common.resolvedExtensions,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

    // Until loaders are updated, use the LoaderOptionsPlugin to pass custom properties to third-party loaders
    new webpack.LoaderOptionsPlugin({

      // (For UglifyJsPlugin) Put loaders into minimize mode
      debug: false,

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

  ],

};

module.exports = config;
