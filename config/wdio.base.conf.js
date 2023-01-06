/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const process = require('process');
const fs = require('fs-extra');
const chai = require('chai');
const constants = require('../tests/support/utils/constants');
const allure = require('@wdio/allure-reporter').default;
const commandlineArgs = require('minimist')(process.argv.slice(2));
const url = commandlineArgs.baseUrl == undefined ? 'https://dashboard.pantheon.io' : commandlineArgs.baseUrl;
const useremail = commandlineArgs.useremail;
const userpassword = commandlineArgs.userpassword;
const BrowserManager = require('../tests/support/utils/browser.manager');
const browserArgs = {
  browserName: commandlineArgs.browser == undefined ? 'chrome' : commandlineArgs.browser,
  isHeadless: commandlineArgs.headless,
};
const browserCaps = new BrowserManager(browserArgs).create();

// Checking whether node version 16 is present or not.
function nodeVersion() {
  const { execSync } = require('child_process');
  const getNodeVersion = execSync('node -v');
  const nodeVersion = parseInt(getNodeVersion.toString().replace(/^\D+/g, '').split('.')[0]);
  if (!(nodeVersion >= 16 && nodeVersion <= 18)) {
    console.error(`\n \n WARNING: You are using a non compatable node version ${getNodeVersion} \n Please use node version 16 \n \n`);
    process.exit(1);
  }
}
nodeVersion();

exports.config = {
  coloredLogs: true,
  baseUrl: url,
  useremail: useremail,
  userpassword: userpassword,
  capabilities: [browserCaps],
  specs: ['./tests/specs/**/*.spec.js'],
  suites: {
    pantheon: ['./tests/specs/clear/*.spec.js'],
  },
  // env: env,
  exclude: [],
  filesToWatch: [],
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: constants.DEFAULT_TIMEOUT,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: `report/${browserArgs.browserName}-results/`,
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
    ['junit', {
      outputDir: `junit-report/${browserArgs.browserName}-junit-results`,
      outputFileFormat: function () {
        return `junit-${browserArgs.browserName}-test-results.xml`;
      },
    }],
  ],
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:@babel/register'],
    timeout: 1300000,
  },

  onPrepare: async function () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    fs.removeSync('./report');
  },

  async beforeSession() {
    require('@babel/register');
  },

  onComplete: async function () {
    fs.removeSync('./.secrets/temp');
  },

  before: async function () {
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
    global.baseUrl = this.baseUrl;
    global.useremail = this.useremail;
    global.userpassword = this.userpassword;
    // global.env = this.env;
    global.responsive = browser.capabilities.mobileEmulationEnabled;
    global.addEnv = allure.addEnvironment;
    global.feature = allure.addFeature;
    global.testID = allure.addTestId;
    global.jiraID = allure.addIssue;
    global.bugID = allure.addIssue;
    global.step = allure.addStep;
    if (!global.responsive) {
      browser.setWindowPosition(0, 0);
      browser.setWindowSize(1920, 1080);
    }
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
};
