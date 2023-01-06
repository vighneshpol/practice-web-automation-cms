const baseConfig = require('./wdio.base.conf.js').config;
const commandlineArgs = require('minimist')(process.argv.slice(2));
const debug = commandlineArgs['DEBUG'];
const PROXY = require('../tests/support/utils/constants');
const localConfig = Object.assign(baseConfig, {
    services: ['devtools', 'selenium-standalone'],
    seleniumInstallArgs: { proxy: PROXY },
    runner: 'local',
    maxInstances: 1,
    logLevel: 'info',
    outputDir: "./logs",
    execArgv: debug ? ['--inspect'] : [],
});

exports.config = localConfig;