// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      "karma-spec-reporter",
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      "report-config": {
        html: {
          subdir: "html",
        },
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0,
        },
        each: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0,
          overrides: {
            "baz/component/**/*.js": {
              statements: 98,
            },
          },
        },
      },
      verbose: true,
      instrumentation: {
        "default-excludes": false,
      },
    },

    specReporter: {
      maxLogLines: 10, // limit number of lines logged per test
      suppressErrorSummary: false, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
    },

    reporters: ["spec", "coverage-istanbul"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
  });
};
