var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var buildCommon = require('./webpack.common.js');
var common = buildCommon({
  isAot: true,
});

// ensure production environment
process.env.NODE_ENV = 'production';

var config = {

  // Source maps are completely regenerated for each chunk at each build
  devtool: 'source-map',

  // Set base directory for resolving entry points
  context: common.paths.clientSrc,

  // Client application only, no dev server
  entry: {

    'vendor': common.paths.vendorEntry,

    'main': common.paths.mainEntry,

  },

  output: {

    path: common.paths.buildOutput,
    filename: common.files.bundle,
    sourceMapFilename: common.files.sourceMap,
    chunkFilename: common.files.chunk,

    publicPath: common.urls.public,

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

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor'],
      filename: common.files.bundle,
      minChunks: Infinity,
    }),

    // Minimize scripts
    new webpack.optimize.UglifyJsPlugin({
      // to debug production build, uncomment lines in [debug] section and comment lines in [prod] section

      // [prod]
      beautify: false,
      mangle: {
        screw_ie8 : true,
        keep_fnames: true,
      },
      /* To disable mangling for any reason, replace with:
      mangle: false,
      */
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_debugger: true,
        drop_console: true,
        dead_code: true,
      },
      comments: false,

      // [debug]
      /*
      beautify: true,
      mangle: false,
      compress: {
        warnings: true,
        screw_ie8: true,
        keep_fnames: true,
        drop_debugger: false,
        drop_console: false,
        dead_code: false,
        unused: false,
      },
      comments: true,
      */
    }),

    // Do not duplicate modules in the output
    // TODO enable again when this plugin is fixed. See https://github.com/webpack/webpack/issues/2644
    //new webpack.optimize.DedupePlugin(),

    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{ from: common.paths.staticFiles }]),

  ],

};

module.exports = config;
