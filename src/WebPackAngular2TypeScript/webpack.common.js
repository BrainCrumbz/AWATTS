var path = require('path');

var ports = {
  // local dev server port
  default: 51254,
  // local hot reload dev server port
  reload: 3000,
};

var urls = {
  public: '/',
};

var projectRoot = path.resolve(__dirname);

var clientRoot = path.join(projectRoot, 'client');

var paths = {
  clientRoot: clientRoot,
  serverPaths: path.join(projectRoot, '(Controllers|Views)'),
  nodeModules: path.join(projectRoot, 'node_modules'),
  buildOutput: path.join(projectRoot, 'buildOutput'),
  typings: path.join(projectRoot, 'typings'),
  coverage: path.join(projectRoot, 'coverage'),
  
  mainEntry: path.join(clientRoot, 'bootstrap.ts'),
  vendorEntry: path.join(clientRoot, 'vendor.ts'),
  testEntry: path.join(clientRoot, 'karma-entry.js'),
  staticFiles: path.join(clientRoot, 'static'),
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
      paths.buildOutput, // skip output
      paths.serverPaths, // skip server
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
