var testWebpackConfig = require('./webpack.config.test.js');
var buildCommon = require('./webpack.common.js');
var common = buildCommon();

// detect testing mode from environment
var testMode = process.env.TEST_MODE;

if (! ['run-once', 'debug', 'watch'].includes(testMode))
{
  testMode = 'run-once';
}

process.env.PHANTOMJS_BIN = 'node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs.exe';

/*
 * When testing with webpack and transpiled JS, we have to do some extra
 * things to get testing to work right. Because we can only include JS
 * tests in browser, we have to compile original tests as well.
 * That's handled here in karma.conf.js with the karma-webpack preprocessor.
 * Just like webpack will create JS bundle files for client code, when
 * we running TS tests it will compile and bundle them all to JS as well.
 */

module.exports = function(config) {

  var configOverride = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    // files to exclude
    exclude: [
      common.paths.nodeModules, // skip all node modules
      common.paths.buildOutput, // skip output
    ],

    // list of files/patterns to load in the browser, serve or watch. Order is important.
    // with webpack plugin enabled, each file acts as entry point for webpack configuration
    files: [
      // shim entry point, to build test environment and run all spec files
      { pattern: common.paths.testEntry, included: true, watched: false },
      // the actual test spec, only to be monitored for re-runs
      ////{ pattern: common.patterns.testSources, included: false, watched: true },
    ],

    // explicitly list all Karma plugins to be loaded
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-jasmine-html-reporter',
      'karma-coverage',
    ],

    // preprocess matching files before serving them to the browser
    // by running them through this plugins
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // added below
    },

    // report test results in those formats
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      //'dots',
      'progress',
      'mocha',
      'coverage',
    ],

    mochaReporter: {
      maxLogLines: 5,
    },

    coverageReporter: {
      dir: common.paths.coverage,
      reporters: [
        { type: 'text-summary' },  // log a tabled summary to console
        // Add JSON output to enable webpack-bundle-size-analyzer
        //{ type: 'json' },  // produce a JSON document
        { type: 'html' },  // produce a HTML document
      ],
    },

    // test framework to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
    ],

    // web server port
    port: 9876,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // if false, Karma will be listening on debug port in order to run the tests
    singleRun: true,

    // enable watching file and executing tests whenever any file changes
    autoWatch: false,

    // enable colors in the output (reporters and logs)
    colors: true,

    // logging level
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // webpack config
    webpack: testWebpackConfig,

    // don't spam the console with webpack info when running tests
    webpackServer: {
      noInfo: true,
    },

  };

  // Preprocess matching files before serving them to the browser

  // compile test files and generate maps
  configOverride.preprocessors[common.paths.testEntry] = [
    'webpack', // compile TS and ES6 files
    'sourcemap', // generate source maps
  ];

  // calculate coverage only on actual application files, excluding tests and libraries
  configOverride.preprocessors[common.patterns.appSources] = [
    'coverage',
  ];

  // differences when debugging while testing
  if (testMode == 'debug') {

    configOverride.singleRun = false;

    configOverride.browsers = [
      'Chrome',
    ];

    configOverride.reporters = [
      'kjhtml',
    ];

  }

  // differences when watching while testing
  if (testMode == 'watch') {

    configOverride.singleRun = false;

    configOverride.autoWatch = true;

    configOverride.reporters = configOverride.reporters.filter(reporter => reporter != 'coverage');

  }

  config.set(configOverride);
};
