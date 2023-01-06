# cms-web-automation
# EDRT functional UI test

# !!!!! PLEASE READ BEFORE WRITING TESTS !!!!!!

### Style Guide
- We recomend using [Google Javascript StyleGuide](https://google.github.io/styleguide/jsguide.html)

### Summary
This directory contains the UI Tests, these tests are written in nodejs using [mocha](https://mochajs.org/) test framework, [webdriverio](http://webdriver.io/), and [Allure](https://www.npmjs.com/package/@wdio/allure-reporter) for reporting.

### Test approach 
We try to minimise the number of e2e tests that we have, as by nature these are slow, and flaky. Given the majority of EDRT frontend projects are static pages with limited functionality it is important to ***focus on core functional areas/user journeys only***.

### Code Guidelines
- Please familiarise yourself with the code structure and the existing tests. 
- Please follow the existing patterns. Re-use/DRY (don't repeat yourself) is key. 
- Code should be clean and kept to the same standard as production code, i.e. no lazy coding - make sure unused variables and methods are removed, code is correctly formatted, with no random newlines and whitespaces. Where possible node js style guidelines should be followed.
- We recomend using [Visual Studio Code](https://code.visualstudio.com/) and installing the eslintrc extension. ***Warnings must not be ignored.***

### Installation
You should have Node.js version 16 installed. If you don't have Node installed, we recommend installing NVM to assist managing multiple active Node.js versions.
    
Once node is installed, execute:   

    npm install

### How do I run the tests on my local machine?

    npm test -- --browser=chrome --baseUrl=https://dashboard.pantheon.io/

### How do I run the tests by giving login parameter

    npm test -- --browser=chrome --useremail=<email> --userpassword=<password>

### Test Environments 
The test environment that you wish to execute your trests on may vary, however you *must never* switch environments is specs. The baseUrl should be handled via the commandline.
    
### Launch Arguments
By default tests are executed using a Chrome browser. 

To switch the browser under test:
 
    npm test -- --browser=firefox 

To run tests in headless mode:

    npm test -- --headless

    npm test -- --browser=firefox --headless


To run in remote

    npm test -- --browser=chrome --remote

### Run Specific suite

    npm test -- --suite <suite-name> 

### Run Single feature, or test
During test development you may wish to execute a single test or spec. This should not be handled via the package.json. It should be done so via commandline. 

    npm test -- --mochaOpts.grep=@wip or npm test -- --spec=<spec name>

*Always* remove tags before raising a pull-request.         

### Generate Allure report 
    
    npm run report
