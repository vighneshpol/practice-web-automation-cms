/**
 * Browser capability currently supporting Firefox, Chrome, and Emulated Devices ( Different browser size )
 */
 class Browser {
    constructor(browserArgs) {
        this.browser = browserArgs.browserName;
        this.isHeadless = browserArgs.isHeadless;
    }

    create() {
        switch (this.browser) {
            case 'chrome':
                return this.chrome(this.isHeadless);
            case 'firefox':
                return this.firefox(this.isHeadless);
            default:
                return this.emulatedDevice(this.browser, this.isHeadless);
        }
    }

    chrome() {
        const chromeArgs = [
            '--disable-gpu',
            '--disable-extensions',
            '--disable-infobars',
            '--disable-web-security',
            '--disable-dev-shm-usage',
            '--incognito',
        ];

        if (this.isHeadless) {
            chromeArgs.push('--headless', 'no-sandbox');
        }

        return {
            "browserName": 'chrome',
            'goog:chromeOptions': {
                args: chromeArgs,
                useAutomationExtension: false,
            },
            "maxInstances": process.env.CI_MAX_INSTANCES == undefined ? 10 : process.env.CI_MAX_INSTANCES,
        };
    }

    firefox() {
        const ffArgs = [];

        if (this.isHeadless) {
            ffArgs.push('--headless');
        }

        return {
            "browserName": 'firefox',
            "moz:firefoxOptions": {
                args: ffArgs,
            },
            "maxInstances": process.env.CI_MAX_INSTANCES == undefined ? 10 : process.env.CI_MAX_INSTANCES,
        };
    }

    emulatedDevice(device) {
        const chromeArgs = [
            '--disable-gpu',
            '--disable-extensions',
            '--disable-infobars',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--incognito',
        ];

        if (this.isHeadless) {
            chromeArgs.push('--headless', 'no-sandbox');
        }

        return {
            "browserName": 'chrome',
            "acceptInsecureCerts": true,
            'goog:chromeOptions': {
                mobileEmulation: { deviceName: device },
                args: chromeArgs,
                useAutomationExtension: false,
            },
            "maxInstances": process.env.CI_MAX_INSTANCES == undefined ? 10 : process.env.CI_MAX_INSTANCES,
        };
    }
}

module.exports = Browser;