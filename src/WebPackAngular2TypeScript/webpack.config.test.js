var webpack = require('webpack');
var common = require('./webpack.common.js');

// ensure test environment
process.env.NODE_ENV = 'test';

var config = {

  devtool: 'inline-source-map',

  debug: false,

  // no need to specify entry points: this configuration is used to run webpack
  // by karma, that is responsible for submitting test files as entry points
  entry: {},

  // for same reason, no need to specify outputs, those are managed by karma as well
  output: {},

  stats: {
    colors: true,
    reasons: true,
  },

  // TODO consider applying some null loaders for CSS in test
  // (see https://angular.io/docs/ts/latest/guide/webpack.html)

  module: {

    preLoaders: [

      common.preLoaders.tslint,

    ],

    loaders: [

      common.loaders.typescriptTest,
      common.loaders.componentCss,
      common.loaders.globalCss,
      common.loaders.html,

    ],

    postLoaders: [

      common.postLoaders.istanbul,

    ],

    // speed up build by excluding some big libraries from parsing
    noParse: common.noParse,

  },

  postcss: common.postcss,

  resolve: {

    cache: false,

    extensions: common.resolvedExtensions,

  },

  plugins: [

    new webpack.DefinePlugin(common.buildDefines()),

  ],

};

module.exports = config;
