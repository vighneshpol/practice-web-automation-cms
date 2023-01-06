/**
 * Custom allure reporter, to support the BDD reporting on mocha
 * */

import allureReporter from '@wdio/allure-reporter';
module.exports = {
    precondition: async function (step, callback) {
        allureReporter.addStep(step);
        await callback();
    },
    given: async function (step, callback) {
        allureReporter.addStep(`Given ${step}`);
        await callback();
    },
    when: async function (step, callback) {
        allureReporter.addStep(`When ${step}`);
        await callback();
    },
    then: async function (step, callback) {
        allureReporter.addStep(`Then ${step}`);
        await callback();
    },
    and: async function (step, callback) {
        allureReporter.addStep(`And ${step}`);
        await callback();
    },
    but: async function (step, callback) {
        allureReporter.addStep(`But ${step}`);
        await callback();
    },
    failure: async function (step, callback) {
        allureReporter.addStep(step);
        await callback();
    },
};