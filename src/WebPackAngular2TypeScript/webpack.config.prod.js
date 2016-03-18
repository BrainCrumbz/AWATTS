var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var common = require('./webpack.common.js');

// ensure production environment
process.env.NODE_ENV = 'production';

var config = {

  // Source maps are completely regenerated for each chunk at each build
  devtool: 'source-map',
  
  debug: false,
  
  // Set base directory for resolving entry points
  context: common.paths.clientRoot,
  
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
      
      common.preLoaders.tslint, 
    
    ],

    loaders: [

      common.loaders.typescript,
      common.loaders.css,
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
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: common.files.vendor,
      minChunks: Infinity,
    }),
    
    // Minimize scripts
    new webpack.optimize.UglifyJsPlugin({
      // to debug production build, uncomment lines in [debug] section and comment lines in [prod] section
      
      // [prod]
      beautify: false,
      /* disable mangling because of a bug in angular2 beta.X
       * TODO enable mangling as soon as angular2 fixes that
      mangle: { 
        screw_ie8 : true, 
      },
      */
      mangle: false,
      compress: { 
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

    // Get the smallest module/chunk id length for often used modules/chunks
    new webpack.optimize.OccurenceOrderPlugin(true),
    
    // Do not duplicate modules in the output
    new webpack.optimize.DedupePlugin(),
    
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),
    
    // Copy static assets from their folder to common output folder
    new CopyWebpackPlugin([{ from: common.paths.staticFiles }]),
    
  ],
  
};

module.exports = config;
