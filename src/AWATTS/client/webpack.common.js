var path = require('path');
var autoprefixer = require('autoprefixer');

var ports = {
  // local dev server port
  default: 51254,
  // local hot reload dev server port
  reload: 3000,
};

var urls = {
  public: '/',
};

var clientRoot = path.resolve(__dirname);

var clientSrc = path.join(clientRoot, 'src');

var paths = {
  clientSrc: clientSrc,
  localDevRoot: 'buildOutput/',
  buildOutput: path.join(clientRoot, 'buildOutput'),
  nodeModules: path.join(clientRoot, 'node_modules'),
  typings: path.join(clientRoot, 'typings'),
  coverage: path.join(clientRoot, 'coverage'),

  mainEntry: path.join(clientSrc, 'main.browser.ts'),
  vendorEntry: path.join(clientSrc, 'vendor.ts'),
  testEntry: path.join(clientSrc, 'karma-entry.js'),
  staticFiles: path.join(clientSrc, 'static'),
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
  testSources: path.join(paths.clientSrc, '**/*.spec.ts'),
};

var preLoaders = {

  tslint: {
    test: /\.ts$/,
    loaders: ['tslint-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

  // Source map loader support for *.js files
  // Extracts SourceMaps for source files that are added as sourceMappingURL comment.
  javascriptTest: {
    test: /\.js$/,
    loaders: ['source-map-loader'],
    exclude: [
      // these packages have problems with their sourcemaps
      path.join(paths.nodeModules, '@angular'),
      path.join(paths.nodeModules, 'rxjs'),
    ]
  },

}

var loaders = {

  // all files with a `.ts` extension will be handled by `ts-loader`
  // chained to `angular2-template-loader` so to convert template/style URLs into inlined template/styles
  // Chaining requires 'useWebpackText' attribute for 'awesomeTypescriptLoaderOptions' in tsconfig.json
  typescript: {
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
      /\.(spec|e2e|async)\.ts$/, // skip all test and async TS files
    ],
  },

  typescriptTest: {
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
      /\.(e2e|async)\.ts$/, // skip end-to-end test and async TS files
    ],
  },

  // support for requiring component-scoped CSS as raw text
  // NOTE: this assumes that their filename ends in '.component.css'
  componentCss: {
    test: /\.component\.css$/,
    loaders: ['raw-loader', 'postcss-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

  // support for requiring component-scoped Sass as raw text
  // NOTE: this assumes that their filename ends in 'component.scss'
  componentSass: {
    test: [/component\.scss$/, /color-picker\.scss$/],
    loaders: ['raw-loader', 'postcss-loader', 'sass-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

  // support for requiring global, crosswide CSS as <style> tag
  // NOTE: this assumes that their filename don't contain `component`
  globalCss: {
    test: /^(?!.*component).*\.css$/,
    loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap'],
    include: [
      paths.clientSrc,
      paths.nodeModules, // allow to import CSS from third-party libraries
    ],
    exclude: [
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

  // support for requiring HTML as raw text
  html: {
    test: /\.html$/,
    loaders: ['raw-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

};

var postLoaders = {

  // instrument only code that isn't test or third-party
  // delay coverage until after tests are run, fixing transpiled source coverage error
  istanbul: {
    test: /\.(js|ts)$/,
    loaders: ['istanbul-instrumenter-loader'],
    include: [
      paths.clientSrc,
    ],
    exclude: [
      /\.(e2e|spec)\.ts$/, // skip all test files
      paths.nodeModules, // skip all node modules
      paths.typings, // skip all type definitions
      paths.buildOutput, // skip output
    ],
  },

};

var noParse = [
  /.+zone\.js\/dist\/.+/,
];

var postcss = [

  autoprefixer({
    browsers: ['last 2 versions'],
  }),

];

// resolve files using only those extensions
var resolvedExtensions = ['', '.ts', '.js'];

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
  postcss: postcss,
  resolvedExtensions: resolvedExtensions,
  buildDefines: buildDefines,
};

module.exports = common;
