const commandlineArgs = require('minimist')(process.argv.slice(2));
const baseConfig = require('./wdio.base.conf.js').config;
const wdioServices = ['selenium-standalone'];
const services = commandlineArgs.browser === 'chrome' ? wdioServices.push('devtools') : wdioServices;
const ciConfig = Object.assign(baseConfig, {
    logLevel: 'info',
    services: ['selenium-standalone', services],
    maxInstances: 2,
    runner: 'local',
    hostname: 'localhost',
    port: 4444,

});

exports.config = ciConfig;