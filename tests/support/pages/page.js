import Driver from '../utils/driver.extension';
import { DEFAULT_TIMEOUT } from '../utils/constants';
const utilities = require('../utils/utilities');
export default class Page {

    constructor() {
        this.driver = Driver;
        this.utilities = utilities;
        this.defaultTimeout = DEFAULT_TIMEOUT;
    }

    async open(page) {
        await this.driver.visit(this.getUrlFor(page));
        return this;
    }

    awaitPageLoad() {
        this.driver.awaitNotExists(this.loader);
        return this;
    }

    getUrlFor(page) {
        let url = '';
        step(baseUrl + page);
        return url + page;
    }

    cleanSession() {
        this.driver.deleteAllCookies();
        this.driver.refresh();
    }
}
