import { DEFAULT_TIMEOUT } from '../utils/constants';
const utilities = require('./utilities');

export default class Driver {
    /**
     * Navigate to site URL
     **/
    static async visit(url) {
        await browser.url(url);
    }

    /**
     * Clicks on the element. It takes two parameter
     * It takes a selector and time to wait for selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async click(selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsDisplayed(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).waitForClickable({ timeout: timeout });
        await (await selector).click();
    }

    /**
     * Scrolls to the element and then click on the element. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async scrollAndClick(selector, timeout = DEFAULT_TIMEOUT) {
        await this.scrollIntoView(await selector);
        await this.click(await selector, timeout);
    }

    /**
     * It returns the text of the element if present the element. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async textOf(selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsDisplayed(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        return await (await selector).getText();
    }

    /**
     * It returns the value of the attribute of the element. It takes two parameter
     * It takes a selector and attribute name to get the attribute value
     **/
    static async attributeValueOf(selector, attribute) {
        expect(await this.awaitIsDisplayed(await selector), `Element ${selector.selector} not found!`).to.be.true;
        return await (await selector).getAttribute(attribute);
    }

    /**
     * It returns the boolean verifies the selector has a particular attribute. It takes two parameter
     * It takes a selector and attribute name
    **/
    static async hasAttribute(selector, attribute) {
        expect(await this.awaitIsDisplayed(await selector), `Element ${selector.selector} not found!`).to.be.true;
        let result;
        try {
            const value = await (await selector).getAttribute(attribute);
            if (value !== false || value !== undefined) {
                result = true;
            }
        } catch (e) {
            result = false;
        }
        return result;
    }

    /**
     * Enter the value to the element. It takes 3 parameter
     * It takes an input the detail to be filled in selector, selector in which the details to be filled
     * and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async type(input, selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsEnabled(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).click();
        await (await selector).setValue(input);
    }

    /**
     * Removes the attribute of the element. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async removeAttribute(selector, attribute) {
        await browser.execute(function (selector, attribute) {
            return document.querySelector(selector).removeAttribute(attribute);
        }, await selector, attribute);
    }

    /**
     * Press the Tab button
     **/
    static async pressTab() {
        await browser.keys('Tab');
    }

    /** Press the Enter button
     **/
    static async pressEnter() {
        await browser.keys('Enter');
    }

    /**
     * Enter the value to the element then press tab. It takes 3 parameter
     * It takes an input the detail to be filled in selector, selector in which the details to be filled
     * and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async typeAndTabOff(input, selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsDisplayed(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).setValue(input);
        await browser.keys('Tab');
    }

    /**
     * Enter the value to the element then press Return. It takes 3 parameter
     * It takes an input the detail to be filled in selector, selector in which the details to be filled
     * and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async typeAndEnter(input, selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsDisplayed(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).setValue(input);
        return await this.pressEnter();
    }

    /**
     * Clear the value of text field and text area. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
    **/
    static async clearValue(selector, timeout = DEFAULT_TIMEOUT) {
        expect(await this.awaitIsDisplayed(await selector, timeout), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).clearValue();
    }

    /**
     * Verifies the selector is displayed and return boolean. It takes one parameter
     * It takes a selector
    **/
    static async isDisplayed(selector) {
        return await (await selector).isDisplayed();
    }

    /**
     * Verifies the selector is existing in the DOM and return boolean. It takes one parameter
     * It takes a selector
    **/
    static async isExisting(selector) {
        return await (await selector).isExisting();
    }

    /**
     * Verifies the selector is enable to intract with userand return boolean. It takes one parameter
     * It takes a selector
    **/
    static async isEnabled(selector) {
        return await (await selector).isEnabled();
    }

    /**
     * Verifies the selector can be clicked return boolean. It takes one parameter
     * It takes a selector
    **/
    static async isClickable(selector) {
        return await (await selector).isClickable();
    }

    /**
     * Verifies the selector is selected return boolean, takes one parameter, It takes a await (await selector).
     * checkbox or radio is currently selected.
     **/
    static async isSelected(selector) {
        return await (await selector).isSelected();
    }

    /**
     * It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
     * If multiple elements get queried by given
     * selector, it returns true if at least one element is (dis/en)abled.
     **/
    static async awaitIsEnabled(selector, timeout = DEFAULT_TIMEOUT) {
        try {
            await (await selector).waitForEnabled({ timeout: timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
     * Wait for an element for the provided amount of
     * milliseconds to be present within the DOM. Returns Boolean if the selector
     * matches at least one element that exists in the DOM, otherwise throws an
     * error.
     **/
    static async awaitExists(selector, timeout = DEFAULT_TIMEOUT) {
        try {
            await (await selector).waitForExist({ timeout: timeout, interval : 500 });
            return true;
        } catch (error) {
            return false;
        }
    }

    static async awaitNotExists(selector, timeout = DEFAULT_TIMEOUT, reverse = true) {
        try {
            await (await selector).waitForExist({ timeout: timeout, reverse: reverse , interval : 500});
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Element is displayed. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
     **/
    static async awaitIsDisplayed(selector, timeout = DEFAULT_TIMEOUT) {
        try {
            if (typeof selector === 'string') {
                const element = $(selector);
                await (await element).waitForDisplayed({ timeout: timeout, interval : 500 });
                return true;
            } else {
                await (await selector).waitForDisplayed({ timeout: timeout, interval : 500 });
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    static async awaitIsNotDisplayed(selector, timeout = DEFAULT_TIMEOUT, reverse = true) {
        try {
            if (typeof selector === 'string') {
                const element = $(selector);
                await (await element).waitForDisplayed({ timeout: timeout, reverse: reverse , interval : 500 });
                return true;
            } else {
                await (await selector).waitForDisplayed({ timeout: timeout, reverse: reverse , interval : 500 });
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    /**
     * list of element is displayed. It takes two parameter
     * It takes a selector and time to wait for selector
     * Default time out has been present there which is defined in the constants
     **/
    static async awaitElementsDisplayed(elements, timeout = DEFAULT_TIMEOUT) {
        await browser.waitUntil(() => {
            return elements.map((elem) => elem.isDisplayed()).length > 1;
        }, {timeout: timeout, interval : 500 });
    }

    /**
     * Verify the URL is containing particular string
     **/
    static async awaitUrlContaining(string, timeout = DEFAULT_TIMEOUT) {
        try {
            await browser.waitUntil(() => {
                return browser.getUrl().indexOf(string) > -1;
            }, { timeout: timeout, interval : 500 });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll into the element veiw and return boolean. It takes one parameter
     * It takes a selector
     **/
    static async scrollAndCheckDisplayed(selector, pause = 0) {
        if (await this.awaitIsDisplayed(await selector)) {
            await this.scrollIntoView(await selector);
            await this.pause(pause);
            return true;
        }
        return false;
    }

    /**
     * Scroll into view with view options into the element. It takes two parameter
     * It takes a selector and selector view options
     **/
    static async scrollIntoView(selector, scrollIntoViewOptions, pause = 0) {
        expect(await this.awaitIsDisplayed(await selector), `Element ${selector.selector} not found!`).to.be.true;
        await (await selector).scrollIntoView(scrollIntoViewOptions);
        await this.pause(pause); // for animation to complete;
    }

    /**
     * MoveTo with element. It takes one parameter
     * It takes a selector
     **/
    static async moveTo(selector) {
        await (await selector).moveTo();
    }

    /**
     * Selector of dropdown by index. It takes two parameter
     * It takes a input as index and selector
     **/
    static async selectByIndex(input, selector) {
        await (await selector).selectByIndex(input);
    }

    /**
     * Selector of dropdown by visible text. It takes two parameter
     * It takes a input as text and selector
     **/
    static async selectByVisibleText(selector, text) {
        await (await selector).selectByVisibleText(text);
    }

    /**
     * Selector of dropdown by value. It takes two parameter
     * It takes a input as text and selector
     **/
     static async selectByValue(selector, text) {
        // const attribute = 'value';
        await (await selector).selectByAttribute('value', text);
    }

    /**
     * Perform the javascript query click. It takes one parameter
     * It take input as locator
     **/
    static async executeClick(locator) {
        await browser.execute((locator) => {
            document.querySelector(locator).click();
        }, locator);
    }

    /**
     * remove the element from the DOM. It takes one parameter
     * It take input as locator
     **/
    static async removeElement(locator) {
        await browser.execute((locator) => {
            document.querySelector(locator).remove();
        }, locator);
    }

    /**
     * get the value of await (await selector). It takes one parameter
     * It takes a selector
     **/
    static async valueOf(selector) {
        expect(await this.awaitIsDisplayed(await selector), `Element ${selector.selector} not found!`).to.be.true;
        return await (await selector).getValue();
    }

    /**
     * It press the Down Arrow
     **/
    static async pressArrowDown() {
        await browser.keys('ArrowDown');
    }

    /**
     * It get the currentURL
     **/
    static async getCurrentUrl() {
        return await browser.getUrl();
    }

    /**
     * It switches to particular tab
     **/
    static async switchToTab(tabId) {
        const handle = await this.getWindowHandles();
        if (tabId == 0 || (tabId == 1 && handle.length > 1)) {
            await browser.switchToWindow(handle[tabId]);
        } else {
            throw new Error('no new tab found!');
        }
    }

    /**
     * closes the particular tab
     **/
    static async closeAparticularTabdditionalTabs() {
        const handle = await this.getWindowHandles();
        if (handle.length > 1) {
            await browser.switchToWindow(handle[0]);
            await browser.closeWindow();
            await browser.switchToWindow(handle[1]);
        }
    }

    /**
     * switch to window take input as window handle
     **/
    static async switchWindow(windowName) {
        await browser.switchWindow(windowName);
    }

    /**
     * returns all window handles
     **/
    static async getWindowHandles() {
        return await browser.getWindowHandles();
    }

    /**
     * close the browser window
     **/
    static async closeWindow() {
        await browser.closeWindow();
    }

    /**
     * get current page title
     **/
    static async getTitle() {
        return await browser.getTitle();
    }

    /**
     * get back to current page
     **/
    static async back() {
        await browser.back();
    }

    /**
     * Do back press
     **/
    static async pressBackSpace() {
        await browser.keys('Backspace');
    }

    /**
     * It sets the base url to browser options
     **/
    static setBaseUrl(url) {
        browser.options.baseUrl = utilities.getValueFromKey('baseUrls', url);
    }

    /**
     * It reloads session
     **/
    static async reloadSession() {
        await browser.reloadSession();
        if (!global.responsive) {
            await browser.setWindowPosition(0, 0);
            await browser.setWindowSize(1920, 1080);
        }
    }

    /**
     * Delete cookies and session data
     **/
    static async deleteCookiesAndSessionData() {
        await browser.deleteAllCookies();
        // await browser.clearLocalStorage();
    }

    /**
     * return the attributes of elements
     **/
    static async attributeValueOfmultiElements(selector, attribute) {
        return await (await selector).map(function (element) {
            return element.getAttribute(attribute);
        });
    }

    /**
     * Search for element with text inside selector
     **/
    static async searchElementAndClick(selector, text, timeout = DEFAULT_TIMEOUT) {
        for (let i = 0; i <= await (await selector).length; i++) {
            if (await this.textOf(await selector[i], timeout).includes(text)) {
                await this.click(await selector[i], timeout);
                break;
            }
        }
    }

    static async pause(milliseconds) {
        // do not use this function. There should be no reason to use pauses unless there as animations,
        // such as a drop down menu etc.
        await browser.pause(milliseconds);
    }

    /**
     * Get the base url set in browser options
     **/
    static async getBaseUrl() {
        return await browser.options.baseUrl;
    }

    /**
     * Get the screenshot of element
     **/
    static async screenshot() {
        return await browser.takeScreenshot();
    }

    /**
     * Get all cookies and session data
     **/
    static async getCookies(option='X-Pantheon-Session') {
       return await browser.getCookies(option);
    }

    /**
     * Set cookies and session data
     **/
     static async setTheCookies(cookie) {
        await browser.setCookies({name:'X-Pantheon-Session', value:cookie});
     }

     /**
     * Delete cookies
     **/
    static async deleteCookies(option='X-Pantheon-Session') {
        await browser.deleteCookies([option]);
        await this.pause(3000);
     }

    static async refreshPage(){
        await browser.refresh();
        await this.pause(2000);
    }
}
