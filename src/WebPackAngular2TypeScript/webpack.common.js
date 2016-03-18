var path = require('path');

var ports = {
  default: 51254,
  reload: 3000,
};

var urls = {
  public: '/',
};

var clientRoot = path.resolve(__dirname, 'src', 'client');

var paths = {
  clientRoot: clientRoot,
  serverRoot: path.resolve(__dirname, 'src', 'server'),
  nodeModules: path.resolve(__dirname, 'node_modules'),
  dist: path.resolve(__dirname, 'dist'),
  typings: path.resolve(__dirname, 'typings'),
  staticFiles: path.join(clientRoot, 'static'),
  coverage: path.resolve(__dirname, 'coverage'),
  
  mainEntry: path.join(clientRoot, 'bootstrap.ts'),
  vendorEntry: path.join(clientRoot, 'vendor.ts'),
  testEntry: path.join(clientRoot, 'karma-entry.js'),
};

var files = {
  main: 'js/main-bundle.js',
  vendor: 'js/vendor-bundle.js',
  
  // allow for multiple entry points, hence multiple outputs
  bundle: 'js/[name]-bundle.js',
  sourceMap: 'js/[name]-bundle.js.map',
  chunk: 'js/[id]-chunk.js',
};

var patterns = {
  testSources: path.join(paths.clientRoot, '**/*.spec.ts'),
};

var preLoaders = {
  
  tslint: { 
    test: /\.ts$/, 
    loaders: ['tslint'], 
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
    ],
  },
  
}

var loaders = {
  
  // all files with a `.ts` extension will be handled by `ts-loader`
  typescript: { 
    test: /\.ts$/, 
    loaders: ['ts'],
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
       /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files 
    ],
  },

  typescriptTest: { 
    test: /\.ts$/, 
    loaders: ['ts'],
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
       /\.(e2e|async)\.ts$/, // skip end-to-end test and async TS files 
    ],
  },
  
  // support for requiring CSS as raw text
  css: { 
    test: /\.css$/, 
    // all css required in JS client files will be merged in those
    loaders: ['raw'],
    // add the style-loader and css-loader, which you can expand with less-loader etc.
    //loaders: ['style', 'css'],
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
    ],
  },
  
  // support for requiring HTML as raw text
  html: { 
    test: /\.html$/, 
    loaders: ['raw'], 
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
    ],
  },
  
};

var postLoaders = {
  
  // instrument only code that isn't test or third-party 
  // delay coverage until after tests are run, fixing transpiled source coverage error
  istanbul: {
    test: /\.(js|ts)$/,
    loaders: ['istanbul-instrumenter'],
    include: [
      paths.clientRoot,
    ], 
    exclude: [
      /\.(e2e|spec)\.ts$/, // skip all test files
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.dist, // skip output
      paths.serverRoot, // skip server
    ],
  },
  
};

var noParse = [
  /.+zone\.js\/dist\/.+/, 
  /.+angular2\/bundles\/.+/, 
  /angular2-polyfills\.js/,
];

// resolve files using only those extensions
var resolvedExtensions = ['', '.ts', '.js', '.css', '.html'];

function buildDefines() {
  var packageDef = require('./package.json');  
  
  return {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'VERSION': JSON.stringify(packageDef.version),
  };
}

var common = {
  urls: urls,
  ports: ports,
  paths: paths,
  files: files,
  patterns: patterns,
  preLoaders: preLoaders,
  loaders: loaders,
  postLoaders: postLoaders,
  noParse: noParse,
  resolvedExtensions: resolvedExtensions,
  buildDefines: buildDefines,
};

module.exports = common;
